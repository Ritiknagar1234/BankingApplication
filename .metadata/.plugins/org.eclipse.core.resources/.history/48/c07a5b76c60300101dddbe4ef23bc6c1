package com.bank.service;

import java.time.Duration;
import java.time.LocalDateTime;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.bank.entities.PendingUser;
import com.bank.entities.User;
import com.bank.repository.PendingUserRepository;
import com.bank.repository.UserRepository;
import com.bank.util.OtpUtil;

@Service
public class OtpService {

    @Autowired
    private PendingUserRepository pendingUserRepository;

    @Autowired
    private EmailService emailService; // or SMS service

    public void generateAndSendOtp(PendingUser user) {
        String otp = OtpUtil.generateOtp();
        System.out.println("Resend otp :"+otp);
        user.setOtp(otp);
        user.setOtpGeneratedAt(LocalDateTime.now());
        pendingUserRepository.save(user);

        // Send OTP to email
        emailService.sendOtpEmail(user.getEmail(), otp);
    }

    public boolean verifyOtp(User user, String inputOtp) {
        if (user.getOtp() == null || user.getOtpGeneratedAt() == null) {
            return false;
        }

        // OTP expires in 5 minutes
        if (Duration.between(user.getOtpGeneratedAt(), LocalDateTime.now()).toMinutes() > 5) {
            return false;
        }

        return user.getOtp().equals(inputOtp);
    }
}
