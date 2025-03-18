package com.bank.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.bank.entities.PendingUser;

public interface PendingUserRepository extends JpaRepository<PendingUser, Long> {
    Optional<PendingUser> findByCardNumber(String cardNumber);
    void deleteByCardNumber(String cardNumber);
}
