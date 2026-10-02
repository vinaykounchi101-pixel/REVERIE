package com.reverie.order.service;

import com.reverie.common.error.BusinessException;
import com.reverie.common.error.ErrorCode;
import com.reverie.common.error.ResourceNotFoundException;
import com.reverie.order.dto.OrderDto;
import com.reverie.order.dto.OrderItemDto;
import com.reverie.order.dto.OrderStatusHistoryDto;
import com.reverie.order.entity.Order;
import com.reverie.order.entity.OrderStatus;
import com.reverie.order.entity.OrderStatusHistory;
import com.reverie.order.repository.OrderItemRepository;
import com.reverie.order.repository.OrderRepository;
import com.reverie.order.repository.OrderStatusHistoryRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
public class OrderService {

    private final OrderRepository orderRepository;
    private final OrderItemRepository orderItemRepository;
    private final OrderStatusHistoryRepository statusHistoryRepository;

    public OrderService(
            OrderRepository orderRepository,
            OrderItemRepository orderItemRepository,
            OrderStatusHistoryRepository statusHistoryRepository) {
        this.orderRepository = orderRepository;
        this.orderItemRepository = orderItemRepository;
        this.statusHistoryRepository = statusHistoryRepository;
    }

    @Transactional(readOnly = true)
    public OrderDto getOrderById(UUID orderId, UUID userId) {
        Order order = orderRepository.findByIdAndUserId(orderId, userId)
                .orElseThrow(() -> new ResourceNotFoundException(ErrorCode.RESOURCE_NOT_FOUND, "Order not found"));
        return buildOrderDto(order);
    }

    @Transactional(readOnly = true)
    public OrderDto getOrderByNumber(String orderNumber, UUID userId) {
        Order order = orderRepository.findByOrderNumberAndUserId(orderNumber, userId)
                .orElseThrow(() -> new ResourceNotFoundException(ErrorCode.RESOURCE_NOT_FOUND, "Order not found"));
        return buildOrderDto(order);
    }

    @Transactional(readOnly = true)
    public Page<OrderDto> getUserOrders(UUID userId, Pageable pageable) {
        return orderRepository.findByUserId(userId, pageable)
                .map(this::buildOrderDto);
    }

    @Transactional(readOnly = true)
    public Page<OrderDto> getAllOrdersAdmin(Pageable pageable, OrderStatus status) {
        if (status != null) {
            return orderRepository.findByStatus(status, pageable).map(this::buildOrderDto);
        }
        return orderRepository.findAll(pageable).map(this::buildOrderDto);
    }

    @Transactional
    public OrderDto updateOrderStatus(UUID orderId, OrderStatus newStatus, String note) {
        Order order = orderRepository.findById(orderId)
                .orElseThrow(() -> new ResourceNotFoundException(ErrorCode.RESOURCE_NOT_FOUND, "Order not found"));

        OrderStatus currentStatus = order.getStatus();
        if (currentStatus == newStatus) {
            return buildOrderDto(order);
        }

        order.setStatus(newStatus);
        order = orderRepository.save(order);

        OrderStatusHistory history = new OrderStatusHistory(
                order,
                currentStatus.name(),
                newStatus.name(),
                note != null ? note : "Status transitioned to " + newStatus.name()
        );
        statusHistoryRepository.save(history);

        return buildOrderDto(order);
    }

    public OrderDto buildOrderDto(Order order) {
        List<OrderItemDto> itemDtos = orderItemRepository.findByOrderId(order.getId()).stream()
                .map(OrderItemDto::fromEntity)
                .collect(Collectors.toList());

        List<OrderStatusHistoryDto> historyDtos = statusHistoryRepository.findByOrderIdOrderByCreatedAtAsc(order.getId()).stream()
                .map(OrderStatusHistoryDto::fromEntity)
                .collect(Collectors.toList());

        return OrderDto.fromEntity(order, itemDtos, historyDtos);
    }
}
