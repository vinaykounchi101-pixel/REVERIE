package com.reverie.customer.service;

import com.reverie.common.error.ErrorCode;
import com.reverie.common.error.ResourceNotFoundException;
import com.reverie.customer.dto.CreateAddressRequest;
import com.reverie.customer.dto.CustomerAddressDto;
import com.reverie.customer.entity.CustomerAddress;
import com.reverie.customer.repository.CustomerAddressRepository;
import com.reverie.user.entity.User;
import com.reverie.user.repository.UserRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
public class CustomerAddressService {

    private final CustomerAddressRepository addressRepository;
    private final UserRepository userRepository;

    public CustomerAddressService(CustomerAddressRepository addressRepository, UserRepository userRepository) {
        this.addressRepository = addressRepository;
        this.userRepository = userRepository;
    }

    @Transactional(readOnly = true)
    public List<CustomerAddressDto> getAddresses(UUID userId) {
        return addressRepository.findByUserId(userId).stream()
                .map(CustomerAddressDto::fromEntity)
                .collect(Collectors.toList());
    }

    @Transactional
    public CustomerAddressDto addAddress(UUID userId, CreateAddressRequest request) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException(ErrorCode.RESOURCE_NOT_FOUND, "User not found"));

        if (request.isDefault()) {
            addressRepository.findByUserIdAndIsDefaultTrue(userId).ifPresent(addr -> {
                addr.setDefault(false);
                addressRepository.save(addr);
            });
        }

        CustomerAddress address = new CustomerAddress(
                user,
                request.getFullName(),
                request.getPhone(),
                request.getAddressLine1(),
                request.getAddressLine2(),
                request.getCity(),
                request.getState(),
                request.getPostalCode(),
                request.getCountry(),
                request.isDefault()
        );
        address = addressRepository.save(address);

        return CustomerAddressDto.fromEntity(address);
    }

    @Transactional
    public CustomerAddressDto updateAddress(UUID addressId, UUID userId, CreateAddressRequest request) {
        CustomerAddress address = addressRepository.findByIdAndUserId(addressId, userId)
                .orElseThrow(() -> new ResourceNotFoundException(ErrorCode.RESOURCE_NOT_FOUND, "Address not found"));

        if (request.isDefault() && !address.isDefault()) {
            addressRepository.findByUserIdAndIsDefaultTrue(userId).ifPresent(addr -> {
                addr.setDefault(false);
                addressRepository.save(addr);
            });
        }

        address.setFullName(request.getFullName());
        address.setPhone(request.getPhone());
        address.setAddressLine1(request.getAddressLine1());
        address.setAddressLine2(request.getAddressLine2());
        address.setCity(request.getCity());
        address.setState(request.getState());
        address.setPostalCode(request.getPostalCode());
        address.setCountry(request.getCountry());
        address.setDefault(request.isDefault());

        address = addressRepository.save(address);
        return CustomerAddressDto.fromEntity(address);
    }

    @Transactional
    public void deleteAddress(UUID addressId, UUID userId) {
        CustomerAddress address = addressRepository.findByIdAndUserId(addressId, userId)
                .orElseThrow(() -> new ResourceNotFoundException(ErrorCode.RESOURCE_NOT_FOUND, "Address not found"));
        addressRepository.delete(address);
    }
}
