package com.expense.expense.controller;

import com.expense.expense.dto.request.ExpenseCreateRequest;
import com.expense.expense.dto.response.ApiResponse;
import com.expense.expense.dto.response.ExpenseResponse;
import com.expense.expense.enums.TransactionType;
import com.expense.expense.security.CustomUserDetails;
import com.expense.expense.service.ExpenseService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/income")
@RequiredArgsConstructor
public class IncomeController {

    private final ExpenseService expenseService;

    @PostMapping
    public ResponseEntity<ApiResponse<ExpenseResponse>> createIncome(
            @AuthenticationPrincipal CustomUserDetails userDetails,
            @Valid @RequestBody ExpenseCreateRequest request
    ) {
        request.setType(TransactionType.INCOME);
        ExpenseResponse response = expenseService.createExpense(userDetails.getUserId(), request);
        return ResponseEntity.ok(ApiResponse.success("Income created successfully", response));
    }

    @GetMapping
    public ResponseEntity<ApiResponse<java.util.List<ExpenseResponse>>> getMyIncome(
            @AuthenticationPrincipal CustomUserDetails userDetails
    ) {
        java.util.List<ExpenseResponse> response = expenseService.getMyIncome(userDetails.getUserId());
        return ResponseEntity.ok(ApiResponse.success("Income fetched successfully", response));
    }

    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<ExpenseResponse>> getMyIncomeById(
            @AuthenticationPrincipal CustomUserDetails userDetails,
            @PathVariable String id
    ) {
        ExpenseResponse response = expenseService.getMyIncomeById(userDetails.getUserId(), id);
        return ResponseEntity.ok(ApiResponse.success("Income fetched successfully", response));
    }
}