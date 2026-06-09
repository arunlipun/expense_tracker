package com.expense.expense.entity;



import com.expense.expense.enums.Role;
import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.Set;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Document(collection = "users")
public class User {

    @Id
    private String id;

    private String name;
    private String email;
    private String password;

    @Builder.Default
    private Set<Role> roles = new HashSet<>();

    @Builder.Default
    private Boolean enabled = true;

    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}