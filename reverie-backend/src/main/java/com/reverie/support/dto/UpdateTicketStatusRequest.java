package com.reverie.support.dto;

import com.reverie.support.entity.TicketPriority;
import com.reverie.support.entity.TicketStatus;
import jakarta.validation.constraints.NotNull;

import java.util.UUID;

public class UpdateTicketStatusRequest {

    @NotNull(message = "Ticket status is required")
    private TicketStatus status;

    private TicketPriority priority;
    private UUID assignedToId;
    private String resolutionNotes;

    public UpdateTicketStatusRequest() {}

    public UpdateTicketStatusRequest(TicketStatus status, TicketPriority priority, UUID assignedToId, String resolutionNotes) {
        this.status = status;
        this.priority = priority;
        this.assignedToId = assignedToId;
        this.resolutionNotes = resolutionNotes;
    }

    public TicketStatus getStatus() { return status; }
    public void setStatus(TicketStatus status) { this.status = status; }

    public TicketPriority getPriority() { return priority; }
    public void setPriority(TicketPriority priority) { this.priority = priority; }

    public UUID getAssignedToId() { return assignedToId; }
    public void setAssignedToId(UUID assignedToId) { this.assignedToId = assignedToId; }

    public String getResolutionNotes() { return resolutionNotes; }
    public void setResolutionNotes(String resolutionNotes) { this.resolutionNotes = resolutionNotes; }
}
