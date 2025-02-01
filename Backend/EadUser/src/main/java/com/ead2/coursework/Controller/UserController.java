package com.ead2.coursework.Controller;

import com.ead2.coursework.Dto.UserDTO;
import com.ead2.coursework.Dto.LoginDTO;
import com.ead2.coursework.Service.UserService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Collections;
import java.util.List;

@RestController
@RequestMapping("/api")
@Tag(name = "Clothing Shop", description = "Clothing Shop APIs")
public class UserController {
    @Autowired
    private UserService userService;

    @PostMapping("/auth/login")
    @Operation(summary = "Login user")
    public ResponseEntity<?> login(@RequestBody LoginDTO loginDTO) {
        try {
            System.out.println("Login request received for username: " + loginDTO.getUsername());
            UserDTO userDTO = userService.login(loginDTO);
            System.out.println("Login successful for user: " + loginDTO.getUsername());
            return ResponseEntity.ok(userDTO);
        } catch (RuntimeException e) {
            System.out.println("Login failed: " + e.getMessage());
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                .body(Collections.singletonMap("error", e.getMessage()));
        }
    }

    @PostMapping("/users")
    @Operation(summary = "Create new user")
    public ResponseEntity<UserDTO> createUser(@RequestBody UserDTO userDTO) {
        return ResponseEntity.ok(userService.createUser(userDTO));
    }

    @PutMapping("/users/{id}")
    @Operation(summary = "Update existing user")
    public ResponseEntity<UserDTO> updateUser(@PathVariable Long id, @RequestBody UserDTO userDTO) {
        return ResponseEntity.ok(userService.updateUser(id, userDTO));
    }

    @DeleteMapping("/users/{id}")
    @Operation(summary = "Delete user")
    public ResponseEntity<Void> deleteUser(@PathVariable Long id) {
        userService.deleteUser(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/users/{id}")
    @Operation(summary = "Get user by ID")
    public ResponseEntity<UserDTO> getUser(@PathVariable Long id) {
        return ResponseEntity.ok(userService.getUserById(id));
    }

    @GetMapping("/users")
    @Operation(summary = "Get all users")
    public ResponseEntity<List<UserDTO>> getAllUsers() {
        return ResponseEntity.ok(userService.getAllUsers());
    }
}