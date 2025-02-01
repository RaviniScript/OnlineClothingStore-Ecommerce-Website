package com.ead2.coursework;

import org.junit.jupiter.api.Test;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;

public class PasswordEncoderTest {
    
    @Test
    public void generateEncodedPassword() {
        PasswordEncoder encoder = new BCryptPasswordEncoder();
        String rawPassword = "Fahma@123";
        String encodedPassword = encoder.encode(rawPassword);
        System.out.println("Encoded password: " + encodedPassword);
    }

    @Test
    public void testPasswordMatching() {
        PasswordEncoder encoder = new BCryptPasswordEncoder();
        String rawPassword = "Imandi@123";
        String storedHash = "$2a$10$tudkYvX3Vvaw3BbIQCfWpeUdHvNxR1pyZTglRbKD5OpT2i5WlEDka";
        
        boolean matches = encoder.matches(rawPassword, storedHash);
        System.out.println("Password matches: " + matches);
        
        // Generate a new hash for comparison
        String newHash = encoder.encode(rawPassword);
        System.out.println("New hash: " + newHash);
        System.out.println("New hash matches original password: " + encoder.matches(rawPassword, newHash));
    }
} 