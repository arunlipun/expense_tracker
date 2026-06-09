package com.expense.expense.dto.analytics;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class CategorySummaryResponse {
    private String category;
    private Double totalAmount;
    private Long totalTransactions;
}