package com.reverie.returns.controller;

import com.reverie.auth.security.UserPrincipal;
import com.reverie.common.dto.ApiResponse;
import com.reverie.returns.dto.CreateReturnRequestDto;
import com.reverie.returns.dto.ProcessReturnDecisionDto;
import com.reverie.returns.dto.ReturnRequestDto;
import com.reverie.returns.entity.ReturnStatus;
import com.reverie.returns.service.ReturnService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/returns")
@Tag(name = "Returns & Inspections", description = "Endpoints for client return requests and admin horology inspection approvals")
public class ReturnController {

    private final ReturnService returnService;

    public ReturnController(ReturnService returnService) {
        this.returnService = returnService;
    }

    @PostMapping
    @Operation(summary = "Submit return request", description = "Submits return request within policy window for delivered luxury order")
    public ResponseEntity<ApiResponse<ReturnRequestDto>> requestReturn(
            @AuthenticationPrincipal UserPrincipal principal,
            @Valid @RequestBody CreateReturnRequestDto request) {
        ReturnRequestDto returnDto = returnService.requestReturn(principal.getId(), request);
        return ResponseEntity.ok(ApiResponse.success("Return request submitted", returnDto));
    }

    @GetMapping("/order/{orderId}")
    @Operation(summary = "Get returns for order", description = "Retrieves all return requests submitted for a given order")
    public ResponseEntity<ApiResponse<List<ReturnRequestDto>>> getReturnsForOrder(
            @AuthenticationPrincipal UserPrincipal principal,
            @PathVariable UUID orderId) {
        List<ReturnRequestDto> returns = returnService.getReturnsForOrder(orderId, principal.getId());
        return ResponseEntity.ok(ApiResponse.success(returns));
    }

    @PostMapping("/admin/{returnId}/decision")
    @PreAuthorize("hasAnyRole('ADMIN', 'SUPER_ADMIN', 'ORDER_MGR')")
    @Operation(summary = "Admin: Process inspection decision", description = "Approves or rejects return, triggers restocking and wallet refund")
    public ResponseEntity<ApiResponse<ReturnRequestDto>> processDecision(
            @AuthenticationPrincipal UserPrincipal principal,
            @PathVariable UUID returnId,
            @Valid @RequestBody ProcessReturnDecisionDto decision) {
        ReturnRequestDto result = returnService.processReturnDecision(returnId, decision, principal.getId());
        return ResponseEntity.ok(ApiResponse.success("Return decision processed", result));
    }

    @GetMapping("/admin/all")
    @PreAuthorize("hasAnyRole('ADMIN', 'SUPER_ADMIN', 'ORDER_MGR')")
    @Operation(summary = "Admin: List all return requests", description = "Retrieves all return requests with status filtering")
    public ResponseEntity<ApiResponse<Page<ReturnRequestDto>>> getAllReturns(
            @RequestParam(required = false) ReturnStatus status,
            @PageableDefault(size = 20) Pageable pageable) {
        Page<ReturnRequestDto> returns = returnService.getAllReturnsAdmin(status, pageable);
        return ResponseEntity.ok(ApiResponse.success(returns));
    }
}
