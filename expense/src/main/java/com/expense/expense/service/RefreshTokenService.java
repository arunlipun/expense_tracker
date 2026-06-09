package com.expense.expense.service;

import com.expense.expense.entity.RefreshToken;

public interface RefreshTokenService {
    RefreshToken createRefreshToken(String userId);
    RefreshToken verifyExpiration(String token);
    RefreshToken findByToken(String token);
    void deleteByUserId(String userId);
}
