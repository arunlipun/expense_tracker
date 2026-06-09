package com.expense.expense.config;

import com.expense.expense.entity.User;
import com.expense.expense.enums.Role;
import com.expense.expense.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.time.LocalDateTime;
import java.util.Set;

@Slf4j
@Configuration
@RequiredArgsConstructor
public class DataInitializer {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    @Bean
    CommandLineRunner initAdmin() {
        return args -> {
            String adminEmail = "admin@expense.com";

            if (!userRepository.existsByEmail(adminEmail)) {
                User admin = User.builder()
                        .name("System Admin")
                        .email(adminEmail)
                        .password(passwordEncoder.encode("Admin@123"))
                        .roles(Set.of(Role.ROLE_ADMIN, Role.ROLE_USER))
                        .enabled(true)
                        .createdAt(LocalDateTime.now())
                        .updatedAt(LocalDateTime.now())
                        .build();

                userRepository.save(admin);
                log.info("Default admin created successfully");
            } else {
                log.info("Default admin already exists");
            }
        };
    }
}