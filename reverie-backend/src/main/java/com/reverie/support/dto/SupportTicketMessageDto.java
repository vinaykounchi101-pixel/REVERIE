package com.reverie.support.dto;

import com.reverie.support.entity.SupportTicketMessage;

import java.time.Instant;
import java.util.UUID;

public class SupportTicketMessageDto {

    private UUID id;
    private UUID ticketId;
    private UUID senderId;
    private String senderName;
    private String senderRole;
    private String message;
    private Boolean isInternalNote;
    private Instant createdAt;

    public SupportTicketMessageDto() {}

    public static SupportTicketMessageDto fromEntity(SupportTicketMessage msg) {
        SupportTicketMessageDto dto = new SupportTicketMessageDto();
        dto.setId(msg.getId());
        dto.setTicketId(msg.getTicket().getId());
        dto.setSenderId(msg.getSender() != null ? msg.getSender().getId() : null);
        dto.setSenderName(msg.getSenderName());
        dto.setSenderRole(msg.getSenderRole());
        dto.setMessage(msg.getMessage());
        dto.setIsInternalNote(msg.getIsInternalNote());
        dto.setCreatedAt(msg.getCreatedAt());
        return dto;
    }

    public UUID getId() { return id; }
    public void setId(UUID id) { this.id = id; }

    public UUID getTicketId() { return ticketId; }
    public void setTicketId(UUID ticketId) { this.ticketId = ticketId; }

    public UUID getSenderId() { return senderId; }
    public void setSenderId(UUID senderId) { this.senderId = senderId; }

    public String getSenderName() { return senderName; }
    public void setSenderName(String senderName) { this.senderName = senderName; }

    public String getSenderRole() { return senderRole; }
    public void setSenderRole(String senderRole) { this.senderRole = senderRole; }

    public String getMessage() { return message; }
    public void setMessage(String message) { this.message = message; }

    public Boolean getIsInternalNote() { return isInternalNote; }
    public void setIsInternalNote(Boolean internalNote) { isInternalNote = internalNote; }

    public Instant getCreatedAt() { return createdAt; }
    public void setCreatedAt(Instant createdAt) { this.createdAt = createdAt; }
}
