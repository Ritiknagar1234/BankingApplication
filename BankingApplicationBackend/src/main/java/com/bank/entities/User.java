package com.bank.entities;

import java.time.LocalDateTime;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class User {
	@Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;

    @Column(unique = true)
    private String cardNumber;

    private String pin; // Should be hashed in production
    
    private double balance = 0.0;
    private String email;
    private String phone;
    private String profilePicture; // URL or path to uploaded image
    private LocalDateTime createdAt;
    @Column
    private String otp;

    @Column
    private LocalDateTime otpGeneratedAt;
    @Column(nullable = false)
    private String status = "unverified"; // unverified or verified


}
