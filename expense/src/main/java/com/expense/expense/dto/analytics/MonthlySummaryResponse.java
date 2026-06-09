package com.expense.expense.dto.analytics;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class MonthlySummaryResponse {
    private String month;
    private Double totalIncome;
    private Double totalExpense;
    private Double netBalance;
}