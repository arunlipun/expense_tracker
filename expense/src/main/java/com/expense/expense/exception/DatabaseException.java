package com.expense.expense.exception;

public class DatabaseException extends RuntimeException{
    public DatabaseException(String message){
        super(message);
    }
}
