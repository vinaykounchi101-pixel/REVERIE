package com.reverie.user.dto;

import com.reverie.user.entity.Role;
import com.reverie.user.entity.User;

import java.time.Instant;
import java.util.UUID;

public class UserDto {

    private UUID id;
    private String email;
    private String firstName;
    private String lastName;
    private String phone;
    private Role role;
    private boolean isVerified;
    private Instant createdAt;

    public UserDto() {}

    public UserDto(UUID id, String email, String firstName, String lastName, String phone, Role role, boolean isVerified, Instant createdAt) {
        this.id = id;
        this.email = email;
        this.firstName = firstName;
        this.lastName = lastName;
        this.phone = phone;
        this.role = role;
        this.isVerified = isVerified;
        this.createdAt = createdAt;
    }

    public static UserDto fromEntity(User user) {
        return new UserDto(
                user.getId(),
                user.getEmail(),
                user.getFirstName(),
                user.getLastName(),
                user.getPhone(),
                user.getRole(),
                user.isVerified(),
                user.getCreatedAt()
        );
    }

    public UUID getId() { return id; }
    public void setId(UUID id) { this.id = id; }

    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }

    public String getFirstName() { return firstName; }
    public void setFirstName(String firstName) { this.firstName = firstName; }

    public String getLastName() { return lastName; }
    public void setLastName(String lastName) { this.lastName = lastName; }

    public String getPhone() { return phone; }
    public void setPhone(String phone) { this.phone = phone; }

    public Role getRole() { return role; }
    public void setRole(Role role) { this.role = role; }

    public boolean isVerified() { return isVerified; }
    public void setVerified(boolean verified) { isVerified = verified; }

    public Instant getCreatedAt() { return createdAt; }
    public void setCreatedAt(Instant createdAt) { this.createdAt = createdAt; }
}
