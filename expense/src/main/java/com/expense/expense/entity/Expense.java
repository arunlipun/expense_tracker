package com.expense.expense.entity;

import com.expense.expense.enums.TransactionType;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;

import java.time.LocalDateTime;

@Document(collection = "expense_tracker")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Expense {

    @Id
    private String id;

    private String userId;

    @Field("title")
    private String title;

    @Field("amount")
    private Double amount;

    @Field("category")
    private String category;

    @Field("description")
    private String description;

    @Field("date")
    private LocalDateTime date;

    @Field("type")
    private TransactionType type;

    @Field("created_at")
    private LocalDateTime createdAt;

    @Field("updated_at")
    private LocalDateTime updatedAt;

    @Builder.Default
    @Field("deleted")
    private boolean deleted = false;

    @Field("deleted_at")
    private LocalDateTime deletedAt;
}