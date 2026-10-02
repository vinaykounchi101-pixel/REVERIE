package com.reverie.support.service;

import com.reverie.support.dto.*;
import com.reverie.support.entity.TicketPriority;
import com.reverie.support.entity.TicketStatus;
import com.reverie.testutil.TestDataCleaner;
import com.reverie.user.entity.Role;
import com.reverie.user.entity.User;
import com.reverie.user.repository.UserRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.test.context.ActiveProfiles;

import java.util.List;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
@ActiveProfiles("test")
public class SupportTicketIntegrationTest {

    @Autowired
    private SupportTicketService ticketService;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private TestDataCleaner testDataCleaner;

    private User client;
    private User agent;

    @BeforeEach
    void setUp() {
        testDataCleaner.cleanAll();

        client = new User();
        client.setEmail("collector.bernard@reverie.app");
        client.setPasswordHash("hashed_pass");
        client.setFirstName("Bernard");
        client.setLastName("Arnault");
        client.setRole(Role.CUSTOMER);
        client.setVerified(true);
        client = userRepository.save(client);

        agent = new User();
        agent.setEmail("specialist.geneva@reverie.app");
        agent.setPasswordHash("hashed_pass");
        agent.setFirstName("Geneva");
        agent.setLastName("Concierge");
        agent.setRole(Role.SUPPORT_AGENT);
        agent.setVerified(true);
        agent = userRepository.save(agent);
    }

    @Test
    void testSupportTicketLifecycle_CreateMessageThreadAndResolve() {
        // 1. Client creates support ticket
        CreateTicketRequest createReq = new CreateTicketRequest(
                null,
                "Bernard Arnault",
                "collector.bernard@reverie.app",
                "Certificate of Authenticity Inquiry",
                "AUTHENTICITY",
                TicketPriority.HIGH,
                "Requesting digital archival extract from the Geneva manufacture archives for my Grand Complication."
        );

        SupportTicketDto ticket = ticketService.createTicket(client.getId(), createReq);
        assertNotNull(ticket.getId());
        assertTrue(ticket.getTicketNumber().startsWith("TICK-"));
        assertEquals(TicketStatus.OPEN, ticket.getStatus());
        assertEquals(TicketPriority.HIGH, ticket.getPriority());
        assertEquals(1, ticket.getMessages().size());

        // 2. Support specialist responds and sets internal note
        AddTicketMessageRequest agentReply = new AddTicketMessageRequest(
                "Archival extract request received. Contacting Swiss registry.",
                false
        );
        SupportTicketMessageDto replyMsg = ticketService.addMessage(ticket.getId(), agent.getId(), agentReply, true);
        assertNotNull(replyMsg.getId());
        assertEquals("SUPPORT_AGENT", replyMsg.getSenderRole());
        assertFalse(replyMsg.getIsInternalNote());

        AddTicketMessageRequest internalNote = new AddTicketMessageRequest(
                "Geneva vault reference #CH-889-VAULT confirmed.",
                true
        );
        SupportTicketMessageDto noteMsg = ticketService.addMessage(ticket.getId(), agent.getId(), internalNote, true);
        assertTrue(noteMsg.getIsInternalNote());

        // 3. Update ticket status to RESOLVED with notes
        UpdateTicketStatusRequest updateReq = new UpdateTicketStatusRequest(
                TicketStatus.RESOLVED,
                TicketPriority.HIGH,
                agent.getId(),
                "Digital archival extract delivered to client secure portal."
        );
        SupportTicketDto resolved = ticketService.updateTicketStatus(ticket.getId(), updateReq, agent.getId());
        assertEquals(TicketStatus.RESOLVED, resolved.getStatus());
        assertEquals(agent.getId(), resolved.getAssignedToId());
        assertEquals("Digital archival extract delivered to client secure portal.", resolved.getResolutionNotes());

        // 4. Admin query
        Page<SupportTicketDto> openTickets = ticketService.getAllTicketsAdmin(TicketStatus.OPEN, PageRequest.of(0, 10));
        assertEquals(0, openTickets.getTotalElements());

        Page<SupportTicketDto> resolvedTickets = ticketService.getAllTicketsAdmin(TicketStatus.RESOLVED, PageRequest.of(0, 10));
        assertEquals(1, resolvedTickets.getTotalElements());
    }
}
