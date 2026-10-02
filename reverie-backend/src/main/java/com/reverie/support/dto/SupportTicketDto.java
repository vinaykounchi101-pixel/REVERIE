package com.reverie.support.dto;

import com.reverie.support.entity.SupportTicket;
import com.reverie.support.entity.TicketPriority;
import com.reverie.support.entity.TicketStatus;

import java.time.Instant;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

public class SupportTicketDto {

    private UUID id;
    private String ticketNumber;
    private UUID userId;
    private UUID orderId;
    private String clientName;
    private String clientEmail;
    private String subject;
    private String category;
    private TicketStatus status;
    private TicketPriority priority;
    private UUID assignedToId;
    private String assignedToName;
    private String resolutionNotes;
    private List<SupportTicketMessageDto> messages;
    private Instant createdAt;
    private Instant updatedAt;

    public SupportTicketDto() {}

    public static SupportTicketDto fromEntity(SupportTicket ticket) {
        SupportTicketDto dto = new SupportTicketDto();
        dto.setId(ticket.getId());
        dto.setTicketNumber(ticket.getTicketNumber());
        dto.setUserId(ticket.getUser() != null ? ticket.getUser().getId() : null);
        dto.setOrderId(ticket.getOrder() != null ? ticket.getOrder().getId() : null);
        dto.setClientName(ticket.getClientName());
        dto.setClientEmail(ticket.getClientEmail());
        dto.setSubject(ticket.getSubject());
        dto.setCategory(ticket.getCategory());
        dto.setStatus(ticket.getStatus());
        dto.setPriority(ticket.getPriority());
        dto.setAssignedToId(ticket.getAssignedTo() != null ? ticket.getAssignedTo().getId() : null);
        dto.setAssignedToName(ticket.getAssignedTo() != null ? ticket.getAssignedTo().getFirstName() + " " + ticket.getAssignedTo().getLastName() : null);
        dto.setResolutionNotes(ticket.getResolutionNotes());
        if (ticket.getMessages() != null) {
            dto.setMessages(ticket.getMessages().stream().map(SupportTicketMessageDto::fromEntity).collect(Collectors.toList()));
        }
        dto.setCreatedAt(ticket.getCreatedAt());
        dto.setUpdatedAt(ticket.getUpdatedAt());
        return dto;
    }

    public UUID getId() { return id; }
    public void setId(UUID id) { this.id = id; }

    public String getTicketNumber() { return ticketNumber; }
    public void setTicketNumber(String ticketNumber) { this.ticketNumber = ticketNumber; }

    public UUID getUserId() { return userId; }
    public void setUserId(UUID userId) { this.userId = userId; }

    public UUID getOrderId() { return orderId; }
    public void setOrderId(UUID orderId) { this.orderId = orderId; }

    public String getClientName() { return clientName; }
    public void setClientName(String clientName) { this.clientName = clientName; }

    public String getClientEmail() { return clientEmail; }
    public void setClientEmail(String clientEmail) { this.clientEmail = clientEmail; }

    public String getSubject() { return subject; }
    public void setSubject(String subject) { this.subject = subject; }

    public String getCategory() { return category; }
    public void setCategory(String category) { this.category = category; }

    public TicketStatus getStatus() { return status; }
    public void setStatus(TicketStatus status) { this.status = status; }

    public TicketPriority getPriority() { return priority; }
    public void setPriority(TicketPriority priority) { this.priority = priority; }

    public UUID getAssignedToId() { return assignedToId; }
    public void setAssignedToId(UUID assignedToId) { this.assignedToId = assignedToId; }

    public String getAssignedToName() { return assignedToName; }
    public void setAssignedToName(String assignedToName) { this.assignedToName = assignedToName; }

    public String getResolutionNotes() { return resolutionNotes; }
    public void setResolutionNotes(String resolutionNotes) { this.resolutionNotes = resolutionNotes; }

    public List<SupportTicketMessageDto> getMessages() { return messages; }
    public void setMessages(List<SupportTicketMessageDto> messages) { this.messages = messages; }

    public Instant getCreatedAt() { return createdAt; }
    public void setCreatedAt(Instant createdAt) { this.createdAt = createdAt; }

    public Instant getUpdatedAt() { return updatedAt; }
    public void setUpdatedAt(Instant updatedAt) { this.updatedAt = updatedAt; }
}
