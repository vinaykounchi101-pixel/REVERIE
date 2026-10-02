package com.reverie.shipment.service;

import com.reverie.audit.service.AuditService;
import com.reverie.common.error.BusinessException;
import com.reverie.common.error.ErrorCode;
import com.reverie.common.error.ResourceNotFoundException;
import com.reverie.order.entity.Order;
import com.reverie.order.entity.OrderStatus;
import com.reverie.order.repository.OrderRepository;
import com.reverie.order.service.OrderService;
import com.reverie.shipment.dto.CreateShipmentRequest;
import com.reverie.shipment.dto.ShipmentDto;
import com.reverie.shipment.dto.UpdateShipmentStatusRequest;
import com.reverie.shipment.entity.Shipment;
import com.reverie.shipment.entity.ShipmentStatus;
import com.reverie.shipment.repository.ShipmentRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.UUID;

@Service
public class ShipmentService {

    private final ShipmentRepository shipmentRepository;
    private final OrderRepository orderRepository;
    private final OrderService orderService;
    private final AuditService auditService;

    public ShipmentService(
            ShipmentRepository shipmentRepository,
            OrderRepository orderRepository,
            OrderService orderService,
            AuditService auditService) {
        this.shipmentRepository = shipmentRepository;
        this.orderRepository = orderRepository;
        this.orderService = orderService;
        this.auditService = auditService;
    }

    @Transactional
    public ShipmentDto createShipment(CreateShipmentRequest request, UUID adminActorId) {
        Order order = orderRepository.findById(request.getOrderId())
                .orElseThrow(() -> new ResourceNotFoundException(ErrorCode.RESOURCE_NOT_FOUND, "Order not found"));

        if (order.getStatus() != OrderStatus.PROCESSING && order.getStatus() != OrderStatus.PAYMENT_AUTHORIZED) {
            throw new BusinessException(ErrorCode.ORDER_INVALID_STATE, "Order must be in PROCESSING status to create shipment. Current status: " + order.getStatus());
        }

        String awb = "REV-AWB-" + System.currentTimeMillis() + "-" + UUID.randomUUID().toString().substring(0, 4).toUpperCase();
        Instant estDelivery = request.getEstimatedDelivery() != null
                ? request.getEstimatedDelivery()
                : Instant.now().plus(3, ChronoUnit.DAYS);

        Shipment shipment = new Shipment(
                order,
                request.getProvider(),
                awb,
                ShipmentStatus.LABEL_CREATED,
                request.getMethod(),
                estDelivery
        );
        shipment = shipmentRepository.save(shipment);

        // Update order status to SHIPPED
        orderService.updateOrderStatus(order.getId(), OrderStatus.SHIPPED, "Insured high-value shipment dispatched via " + shipment.getProvider() + " (AWB: " + awb + ")");

        auditService.logAction("ADMIN", adminActorId, "SHIPMENT_CREATE", "SHIPMENT", shipment.getId(), "SUCCESS", "127.0.0.1", "AWB: " + awb);

        return ShipmentDto.fromEntity(shipment);
    }

    @Transactional
    public ShipmentDto updateShipmentStatus(UUID shipmentId, UpdateShipmentStatusRequest request, UUID adminActorId) {
        Shipment shipment = shipmentRepository.findById(shipmentId)
                .orElseThrow(() -> new ResourceNotFoundException(ErrorCode.RESOURCE_NOT_FOUND, "Shipment record not found"));

        shipment.setStatus(request.getStatus());
        shipment = shipmentRepository.save(shipment);

        Order order = shipment.getOrder();
        if (request.getStatus() == ShipmentStatus.DELIVERED) {
            orderService.updateOrderStatus(order.getId(), OrderStatus.DELIVERED, "Shipment marked DELIVERED (AWB: " + shipment.getAwb() + ")");
        }

        auditService.logAction("ADMIN", adminActorId, "SHIPMENT_UPDATE", "SHIPMENT", shipment.getId(), "SUCCESS", "127.0.0.1", "New status: " + request.getStatus());

        return ShipmentDto.fromEntity(shipment);
    }

    @Transactional(readOnly = true)
    public ShipmentDto getShipmentByOrder(UUID orderId, UUID userId) {
        Order order = orderRepository.findByIdAndUserId(orderId, userId)
                .orElseThrow(() -> new ResourceNotFoundException(ErrorCode.RESOURCE_NOT_FOUND, "Order not found"));

        Shipment shipment = shipmentRepository.findTopByOrderIdOrderByCreatedAtDesc(order.getId())
                .orElseThrow(() -> new ResourceNotFoundException(ErrorCode.RESOURCE_NOT_FOUND, "Shipment tracking not found for this order"));

        return ShipmentDto.fromEntity(shipment);
    }

    @Transactional(readOnly = true)
    public ShipmentDto getShipmentByAwb(String awb) {
        Shipment shipment = shipmentRepository.findByAwb(awb)
                .orElseThrow(() -> new ResourceNotFoundException(ErrorCode.RESOURCE_NOT_FOUND, "Shipment not found for AWB: " + awb));

        return ShipmentDto.fromEntity(shipment);
    }

    @Transactional(readOnly = true)
    public Page<ShipmentDto> getAllShipmentsAdmin(ShipmentStatus status, Pageable pageable) {
        if (status != null) {
            return shipmentRepository.findByStatus(status, pageable).map(ShipmentDto::fromEntity);
        }
        return shipmentRepository.findAll(pageable).map(ShipmentDto::fromEntity);
    }
}
