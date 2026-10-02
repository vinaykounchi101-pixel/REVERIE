package com.reverie.customer.dto;

import com.reverie.customer.entity.CustomerAddress;

import java.time.Instant;
import java.util.UUID;

public class CustomerAddressDto {

    private UUID id;
    private String fullName;
    private String phone;
    private String addressLine1;
    private String addressLine2;
    private String city;
    private String state;
    private String postalCode;
    private String country;
    private boolean isDefault;
    private Instant createdAt;

    public CustomerAddressDto() {}

    public static CustomerAddressDto fromEntity(CustomerAddress addr) {
        CustomerAddressDto dto = new CustomerAddressDto();
        dto.setId(addr.getId());
        dto.setFullName(addr.getFullName());
        dto.setPhone(addr.getPhone());
        dto.setAddressLine1(addr.getAddressLine1());
        dto.setAddressLine2(addr.getAddressLine2());
        dto.setCity(addr.getCity());
        dto.setState(addr.getState());
        dto.setPostalCode(addr.getPostalCode());
        dto.setCountry(addr.getCountry());
        dto.setDefault(addr.isDefault());
        dto.setCreatedAt(addr.getCreatedAt());
        return dto;
    }

    public UUID getId() { return id; }
    public void setId(UUID id) { this.id = id; }

    public String getFullName() { return fullName; }
    public void setFullName(String fullName) { this.fullName = fullName; }

    public String getPhone() { return phone; }
    public void setPhone(String phone) { this.phone = phone; }

    public String getAddressLine1() { return addressLine1; }
    public void setAddressLine1(String addressLine1) { this.addressLine1 = addressLine1; }

    public String getAddressLine2() { return addressLine2; }
    public void setAddressLine2(String addressLine2) { this.addressLine2 = addressLine2; }

    public String getCity() { return city; }
    public void setCity(String city) { this.city = city; }

    public String getState() { return state; }
    public void setState(String state) { this.state = state; }

    public String getPostalCode() { return postalCode; }
    public void setPostalCode(String postalCode) { this.postalCode = postalCode; }

    public String getCountry() { return country; }
    public void setCountry(String country) { this.country = country; }

    public boolean isDefault() { return isDefault; }
    public void setDefault(boolean aDefault) { isDefault = aDefault; }

    public Instant getCreatedAt() { return createdAt; }
    public void setCreatedAt(Instant createdAt) { this.createdAt = createdAt; }
}
