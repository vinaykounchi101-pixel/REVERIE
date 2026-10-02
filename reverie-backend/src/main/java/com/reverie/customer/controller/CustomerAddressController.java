package com.reverie.customer.controller;

import com.reverie.auth.security.UserPrincipal;
import com.reverie.common.dto.ApiResponse;
import com.reverie.customer.dto.CreateAddressRequest;
import com.reverie.customer.dto.CustomerAddressDto;
import com.reverie.customer.service.CustomerAddressService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/customers/addresses")
@Tag(name = "Customer Address Book", description = "Endpoints for client address book management")
public class CustomerAddressController {

    private final CustomerAddressService addressService;

    public CustomerAddressController(CustomerAddressService addressService) {
        this.addressService = addressService;
    }

    @GetMapping
    @Operation(summary = "Get user addresses", description = "Retrieves all saved addresses for the authenticated user")
    public ResponseEntity<ApiResponse<List<CustomerAddressDto>>> getAddresses(
            @AuthenticationPrincipal UserPrincipal principal) {
        List<CustomerAddressDto> addresses = addressService.getAddresses(principal.getId());
        return ResponseEntity.ok(ApiResponse.success(addresses));
    }

    @PostMapping
    @Operation(summary = "Add address", description = "Saves a new shipping/billing address for the user")
    public ResponseEntity<ApiResponse<CustomerAddressDto>> addAddress(
            @AuthenticationPrincipal UserPrincipal principal,
            @Valid @RequestBody CreateAddressRequest request) {
        CustomerAddressDto address = addressService.addAddress(principal.getId(), request);
        return ResponseEntity.ok(ApiResponse.success("Address added successfully", address));
    }

    @PutMapping("/{addressId}")
    @Operation(summary = "Update address", description = "Updates an existing address in the user's address book")
    public ResponseEntity<ApiResponse<CustomerAddressDto>> updateAddress(
            @AuthenticationPrincipal UserPrincipal principal,
            @PathVariable UUID addressId,
            @Valid @RequestBody CreateAddressRequest request) {
        CustomerAddressDto address = addressService.updateAddress(addressId, principal.getId(), request);
        return ResponseEntity.ok(ApiResponse.success("Address updated successfully", address));
    }

    @DeleteMapping("/{addressId}")
    @Operation(summary = "Delete address", description = "Removes an address from the user's address book")
    public ResponseEntity<ApiResponse<Void>> deleteAddress(
            @AuthenticationPrincipal UserPrincipal principal,
            @PathVariable UUID addressId) {
        addressService.deleteAddress(addressId, principal.getId());
        return ResponseEntity.ok(ApiResponse.success("Address deleted successfully", null));
    }
}
