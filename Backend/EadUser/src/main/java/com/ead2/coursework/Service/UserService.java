package com.ead2.coursework.Service;

import com.ead2.coursework.Dto.UserDTO;
import com.ead2.coursework.Model.User;
import com.ead2.coursework.Repository.UserRepository;
import org.springframework.beans.BeanUtils;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import java.util.List;
import java.util.stream.Collectors;
import com.ead2.coursework.Dto.LoginDTO;
import com.ead2.coursework.Model.Role;

@Service
@RequiredArgsConstructor
public class UserService implements IUserService {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    @Override
    public UserDTO createUser(UserDTO userDTO) {
        if (userRepository.existsByUsername(userDTO.getUsername())) {
            throw new RuntimeException("Username already exists");
        }

        User user = new User();
        BeanUtils.copyProperties(userDTO, user);
        BCryptPasswordEncoder encoder = new BCryptPasswordEncoder(10);
        user.setPassword(encoder.encode(userDTO.getPassword()));
        User savedUser = userRepository.save(user);

        UserDTO responseDTO = new UserDTO();
        BeanUtils.copyProperties(savedUser, responseDTO);
        return responseDTO;
    }

    @Override
    public UserDTO updateUser(Long id, UserDTO userDTO) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("User not found"));

        BeanUtils.copyProperties(userDTO, user, "id", "password");
        User updatedUser = userRepository.save(user);

        UserDTO responseDTO = new UserDTO();
        BeanUtils.copyProperties(updatedUser, responseDTO);
        return responseDTO;
    }

    @Override
    public void deleteUser(Long id) {
        if (!userRepository.existsById(id)) {
            throw new EntityNotFoundException("User not found");
        }
        userRepository.deleteById(id);
    }

    @Override
    public UserDTO getUserById(Long id) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("User not found"));

        UserDTO userDTO = new UserDTO();
        BeanUtils.copyProperties(user, userDTO);
        return userDTO;
    }

    @Override
    public List<UserDTO> getAllUsers() {
        return userRepository.findAll().stream()
                .map(user -> {
                    UserDTO dto = new UserDTO();
                    BeanUtils.copyProperties(user, dto);
                    return dto;
                })
                .collect(Collectors.toList());
    }

    @Override
    public UserDTO login(LoginDTO loginDTO) {
        System.out.println("Login attempt for username: " + loginDTO.getUsername());
        
        User user = userRepository.findByUsername(loginDTO.getUsername())
                .orElseThrow(() -> {
                    System.out.println("User not found: " + loginDTO.getUsername());
                    return new RuntimeException("User not found");
                });

        System.out.println("Found user: " + user.getUsername());
        System.out.println("User active status: " + user.isActive());
        System.out.println("User role: " + user.getRole());

        // Check if user is active
        if (!user.isActive()) {
            throw new RuntimeException("Account is deactivated. Please contact administrator.");
        }

        // Check if user has ADMIN role (using equals for proper comparison)
        if (!Role.ADMIN.equals(user.getRole())) {
            System.out.println("Access denied for non-admin user: " + user.getUsername());
            throw new RuntimeException("Access denied. Only administrators can access this system.");
        }

        boolean passwordMatches = passwordEncoder.matches(loginDTO.getPassword(), user.getPassword());
        System.out.println("Password matches: " + passwordMatches);

        if (!passwordMatches) {
            throw new RuntimeException("Invalid credentials");
        }

        UserDTO userDTO = new UserDTO();
        BeanUtils.copyProperties(user, userDTO);
        userDTO.setPassword(null);
        return userDTO;
    }

    public String encodePassword(String rawPassword) {
        return passwordEncoder.encode(rawPassword);
    }
}