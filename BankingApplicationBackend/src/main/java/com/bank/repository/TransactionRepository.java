package com.bank.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.bank.entities.Transaction;

@Repository
public interface TransactionRepository extends JpaRepository<Transaction, Long> {
	
    List<Transaction> findByUserId(Long userId);


}
