package com.expense.expense.dto.response;

import com.expense.expense.dto.analytics.CategorySummaryResponse;
import com.expense.expense.dto.analytics.MonthlySummaryResponse;
import com.expense.expense.dto.analytics.RecentTransactionResponse;
import com.expense.expense.dto.analytics.UserSummaryResponse;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class AdminDashboardResponse {

    private Double totalIncome;
    private Double totalExpense;
    private Double balance;
    private Long totalRecords;
    private Long totalIncomeRecords;
    private Long totalExpenseRecords;

    private List<RecentTransactionResponse> recentTransactions;
    private List<CategorySummaryResponse> categoryWiseExpenses;
    private List<MonthlySummaryResponse> monthlyTrend;
    private List<UserSummaryResponse> userWiseSummary;
}