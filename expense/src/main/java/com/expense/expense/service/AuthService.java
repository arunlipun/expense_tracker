package com.expense.expense.service;

import com.expense.expense.dto.request.LoginRequest;
import com.expense.expense.dto.request.LogoutRequest;
import com.expense.expense.dto.request.RefreshTokenRequest;
import com.expense.expense.dto.request.RegisterRequest;
import com.expense.expense.dto.response.AuthResponse;
import com.expense.expense.dto.response.TokenRefreshResponse;

public interface AuthService {
    AuthResponse register(RegisterRequest registerRequest);
    AuthResponse login(LoginRequest loginRequest);
    TokenRefreshResponse refreshToken(RefreshTokenRequest request);
    void logout(LogoutRequest request);
}
