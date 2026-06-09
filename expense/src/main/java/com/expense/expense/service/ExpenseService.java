//package com.expense.expense.service;
//
//import com.expense.expense.dto.request.ExpenseCreateRequest;
//import com.expense.expense.dto.request.ExpenseUpdateRequest;
//import com.expense.expense.dto.response.ExpenseResponse;
//
//import java.time.LocalDateTime;
//import java.util.List;
//
//public interface ExpenseService {
//
//    ExpenseResponse createExpense(ExpenseCreateRequest request);
//
//    ExpenseResponse updateExpense(String id, ExpenseUpdateRequest request);
//
//    ExpenseResponse getExpenseById(String id);
//
//    List<ExpenseResponse> getAllExpenses();
//
//    void deleteExpense(String id);
//
//    List<ExpenseResponse> getExpensesByCategory(String category);
//
//    List<ExpenseResponse> getExpensesByDateRange(LocalDateTime startDate, LocalDateTime endDate);
//}




package com.expense.expense.service;

import com.expense.expense.dto.request.ExpenseCreateRequest;
import com.expense.expense.dto.request.ExpenseUpdateRequest;
import com.expense.expense.dto.response.AdminDashboardResponse;
import com.expense.expense.dto.response.ExpenseResponse;
import com.expense.expense.dto.response.UserDashboardResponse;

import java.util.List;

public interface ExpenseService {

    ExpenseResponse createExpense(String userId, ExpenseCreateRequest request);

    List<ExpenseResponse> getMyExpenses(String userId);

    ExpenseResponse getMyExpenseById(String userId, String expenseId);

    ExpenseResponse updateMyExpense(String userId, String expenseId, ExpenseUpdateRequest request);

    void deleteMyExpense(String userId, String expenseId);

    List<ExpenseResponse> getAllExpensesForAdmin();

    ExpenseResponse getAnyExpenseByIdForAdmin(String expenseId);

    void deleteAnyExpenseByAdmin(String expenseId);

    AdminDashboardResponse getAdminDashboard();
    List<ExpenseResponse> getMyIncome(String userId);

    UserDashboardResponse getUserDashboard(String userId);

    ExpenseResponse getMyIncomeById(String userId, String expenseId);
}