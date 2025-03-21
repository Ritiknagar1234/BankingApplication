package com.bank.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.bank.entities.User;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
	
    Optional<User> findByCardNumber(String cardNumber);
    
    User findByCardNumberAndPin(String cardNumber, String pin);



}
