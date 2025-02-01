package com.ead2.coursework.Dto;

import com.ead2.coursework.Model.Role;

public class UserDTO {
    private Long id;
    private String username;
    private String password;
    private String email;
    private String fullName;
    private Role role;
    private boolean active;

    // Getters
    public Long getId() { return id; }
    public String getUsername() { return username; }
    public String getPassword() { return password; }
    public String getEmail() { return email; }
    public String getFullName() { return fullName; }
    public Role getRole() { return role; }
    public boolean isActive() { return active; }

    // Setters
    public void setId(Long id) { this.id = id; }
    public void setUsername(String username) { this.username = username; }
    public void setPassword(String password) { this.password = password; }
    public void setEmail(String email) { this.email = email; }
    public void setFullName(String fullName) { this.fullName = fullName; }
    public void setRole(Role role) { this.role = role; }
    public void setActive(boolean active) { this.active = active; }
}