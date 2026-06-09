package com.expense.expense.mapper;

import com.expense.expense.dto.request.ExpenseCreateRequest;
import com.expense.expense.dto.request.ExpenseUpdateRequest;
import com.expense.expense.dto.response.ExpenseResponse;
import com.expense.expense.entity.Expense;
import org.springframework.stereotype.Component;

@Component
public class ExpenseMapper {

    public Expense toEntity(ExpenseCreateRequest request) {
        if (request == null) {
            return null;
        }

        Expense expense = new Expense();
        expense.setTitle(request.getTitle());
        expense.setAmount(request.getAmount());
        expense.setCategory(request.getCategory());
        expense.setDescription(request.getDescription());
        expense.setDate(request.getDate());
        expense.setType(request.getType());
        return expense;
    }

    public void updateEntityFromRequest(ExpenseUpdateRequest request, Expense expense) {
        if (request == null || expense == null) {
            return;
        }

        expense.setTitle(request.getTitle());
        expense.setAmount(request.getAmount());
        expense.setCategory(request.getCategory());
        expense.setDescription(request.getDescription());
        expense.setDate(request.getDate());
        expense.setType(request.getType());
    }

    public ExpenseResponse toResponse(Expense expense) {
        if (expense == null) {
            return null;
        }

        ExpenseResponse response = new ExpenseResponse();
        response.setId(expense.getId());
        response.setTitle(expense.getTitle());
        response.setAmount(expense.getAmount());
        response.setCategory(expense.getCategory());
        response.setDescription(expense.getDescription());
        response.setDate(expense.getDate());
        response.setType(expense.getType());
        return response;
    }
}