package com.bank.service;

import java.util.List;
import java.util.Map;

import com.bank.DTO.LoginDTO;
import com.bank.DTO.UserDTO;
import com.bank.entities.Transaction;
import com.bank.entities.User;


public interface ATMService {
	  
	    User login(LoginDTO loginDTO);
	    void deposit(Long userId, double amount);
	    void withdraw(Long userId, double amount);
	    void fastCash(Long userId, double amount);
	    void changePin(Long userId, String newPin);
	    double getBalance(Long userId);
	    List<Transaction> getStatement(Long userId);
	    Map<String, Object> getTransactionAnalytics(Long userId);
	    List<Transaction> filterTransactions(Long userId, String type, String date, Double amount);
	    User initiateRegistration(UserDTO userDTO); // sends OTP and saves to PendingUser
	    String verifyOtpAndRegister(String cardNumber, String otp);



	
}
