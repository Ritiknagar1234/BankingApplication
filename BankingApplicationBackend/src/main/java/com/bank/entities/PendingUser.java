package com.bank.entities;

import java.time.LocalDateTime;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class PendingUser {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;

    @Column(unique = true)
    private String cardNumber;

    private String pin;
    private String email;
    private String phone;
    private double balance;
    private String otp;
    private LocalDateTime otpGeneratedAt;
}
