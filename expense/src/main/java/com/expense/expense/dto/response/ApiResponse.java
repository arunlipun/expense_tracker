package com.expense.expense.dto.response;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ApiResponse<T> {

    private boolean success;
    private int status;
    private String message;
    private T data;
    private LocalDateTime timestamp;

    public static <T> ApiResponse<T> success(String message, T data) {
        return new ApiResponse<>(
                true,
                200,
                message,
                data,
                LocalDateTime.now()
        );
    }

    public static <T> ApiResponse<T> success(int status, String message, T data) {
        return new ApiResponse<>(
                true,
                status,
                message,
                data,
                LocalDateTime.now()
        );
    }

    public static <T> ApiResponse<T> error(String message, T data) {
        return new ApiResponse<>(
                false,
                400,
                message,
                data,
                LocalDateTime.now()
        );
    }
}