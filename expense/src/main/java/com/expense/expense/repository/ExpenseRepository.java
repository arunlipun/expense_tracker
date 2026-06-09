//package com.expense.expense.repository;
//
//
//
//import com.expense.expense.entity.Expense;
//import com.expense.expense.enums.TransactionType;
//import org.springframework.data.mongodb.repository.MongoRepository;
//import org.springframework.stereotype.Repository;
//
//import java.time.LocalDateTime;
//import java.util.List;
//import java.util.Optional;
//
//@Repository
//public interface ExpenseRepository extends MongoRepository<Expense, String> {
//
//    List<Expense> findByCategoryIgnoreCase(String category);
//
//    List<Expense> findByType(TransactionType type);
//
//    List<Expense> findByDateBetween(LocalDateTime startDate, LocalDateTime endDate);
//
//    List<Expense> findByCategoryIgnoreCaseAndDateBetween(
//            String category,
//            LocalDateTime startDate,
//            LocalDateTime endDate
//    );
//
//    List<Expense> findByTypeAndDateBetween(
//            TransactionType type,
//            LocalDateTime startDate,
//            LocalDateTime endDate
//    );
//
//    List<Expense> findAllByOrderByDateDesc();
//
//    List<Expense> findByCategoryIgnoreCaseOrderByDateDesc(String category);
//
//    List<Expense> findByTypeOrderByDateDesc(TransactionType type);
//
//
//
//    Optional<Expense> findByIdAndDeletedFalse(String id);
//
//    List<Expense> findAllByDeletedFalse();
//
//    List<Expense> findByCategoryIgnoreCaseAndDeletedFalse(String category);
//
//    List<Expense> findByDateBetweenAndDeletedFalse(LocalDateTime startDate, LocalDateTime endDate);
//}



package com.expense.expense.repository;

import com.expense.expense.entity.Expense;
import com.expense.expense.enums.TransactionType;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

public interface ExpenseRepository extends MongoRepository<Expense, String> {

    List<Expense> findByUserIdAndDeletedFalse(String userId);

    Optional<Expense> findByIdAndDeletedFalse(String id);

    Optional<Expense> findByIdAndUserIdAndDeletedFalse(String id, String userId);

    List<Expense> findByUserIdAndDateBetweenAndDeletedFalse(String userId, LocalDateTime start, LocalDateTime end);

    List<Expense> findByDateBetweenAndDeletedFalse(LocalDateTime start, LocalDateTime end);

    List<Expense> findByTypeAndDeletedFalse(TransactionType type);

    List<Expense> findByUserIdAndTypeAndDeletedFalse(String userId, TransactionType type);

    List<Expense> findByDeletedFalse();
    List<Expense> findTop10ByDeletedFalseOrderByDateDesc();


}