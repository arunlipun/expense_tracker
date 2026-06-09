package com.expense.expense.service;

import com.expense.expense.dto.response.AdminDashboardResponse;
import com.expense.expense.enums.ReportType;

public interface AdminDashboardService {
    AdminDashboardResponse getDashboard();
    byte[] downloadReport(ReportType reportType);
}