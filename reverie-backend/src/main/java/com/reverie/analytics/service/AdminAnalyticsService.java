package com.reverie.analytics.service;

import com.reverie.analytics.dto.DashboardSummaryDto;
import com.reverie.analytics.dto.InventoryHealthDto;
import com.reverie.analytics.dto.SalesOverviewDto;
import com.reverie.inventory.entity.Inventory;
import com.reverie.inventory.repository.InventoryRepository;
import com.reverie.order.entity.Order;
import com.reverie.order.entity.OrderStatus;
import com.reverie.order.repository.OrderRepository;
import com.reverie.support.entity.TicketStatus;
import com.reverie.support.repository.SupportTicketRepository;
import com.reverie.user.entity.Role;
import com.reverie.user.repository.UserRepository;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class AdminAnalyticsService {

    private final OrderRepository orderRepository;
    private final InventoryRepository inventoryRepository;
    private final UserRepository userRepository;
    private final SupportTicketRepository ticketRepository;

    public AdminAnalyticsService(
            OrderRepository orderRepository,
            InventoryRepository inventoryRepository,
            UserRepository userRepository,
            SupportTicketRepository ticketRepository) {
        this.orderRepository = orderRepository;
        this.inventoryRepository = inventoryRepository;
        this.userRepository = userRepository;
        this.ticketRepository = ticketRepository;
    }

    @Transactional(readOnly = true)
    public SalesOverviewDto getSalesOverview() {
        List<Order> orders = orderRepository.findAll();

        long totalGmvPaise = 0L;
        long totalNetRevenuePaise = 0L;
        long totalTaxPaise = 0L;
        long totalOrders = orders.size();
        long completedOrders = 0L;
        long cancelledOrders = 0L;

        for (Order order : orders) {
            totalGmvPaise += order.getTotalPaise();
            totalTaxPaise += order.getTaxPaise();

            if (order.getStatus() == OrderStatus.PAYMENT_AUTHORIZED ||
                order.getStatus() == OrderStatus.PROCESSING ||
                order.getStatus() == OrderStatus.SHIPPED ||
                order.getStatus() == OrderStatus.DELIVERED) {
                completedOrders++;
                totalNetRevenuePaise += order.getSubtotalPaise();
            } else if (order.getStatus() == OrderStatus.CANCELLED || order.getStatus() == OrderStatus.REFUNDED) {
                cancelledOrders++;
            }
        }

        long aovPaise = completedOrders > 0 ? (totalNetRevenuePaise / completedOrders) : 0L;

        return new SalesOverviewDto(
                totalGmvPaise,
                totalNetRevenuePaise,
                totalTaxPaise,
                totalOrders,
                completedOrders,
                cancelledOrders,
                aovPaise
        );
    }

    @Transactional(readOnly = true)
    public InventoryHealthDto getInventoryHealth() {
        List<Inventory> inventories = inventoryRepository.findAll();

        long totalVariants = inventories.size();
        long inStockUnits = 0L;
        long reservedUnits = 0L;
        long soldUnits = 0L;
        long lowStockCount = 0L;
        long outOfStockCount = 0L;

        for (Inventory inv : inventories) {
            inStockUnits += inv.getAvailable();
            reservedUnits += inv.getReserved();
            soldUnits += inv.getSold();

            if (inv.getAvailable() == 0) {
                outOfStockCount++;
            } else if (inv.isLowStock()) {
                lowStockCount++;
            }
        }

        return new InventoryHealthDto(
                totalVariants,
                inStockUnits,
                reservedUnits,
                soldUnits,
                lowStockCount,
                outOfStockCount
        );
    }

    @Transactional(readOnly = true)
    public DashboardSummaryDto getDashboardSummary() {
        SalesOverviewDto sales = getSalesOverview();
        InventoryHealthDto inventory = getInventoryHealth();
        long customerCount = userRepository.countByRole(Role.CUSTOMER);
        long openTicketsCount = ticketRepository.findByStatus(TicketStatus.OPEN, Pageable.unpaged()).getTotalElements()
                + ticketRepository.findByStatus(TicketStatus.IN_PROGRESS, Pageable.unpaged()).getTotalElements();

        return new DashboardSummaryDto(sales, inventory, customerCount, openTicketsCount);
    }
}
