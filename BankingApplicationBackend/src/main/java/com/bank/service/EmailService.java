package com.bank.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
public class EmailService {

    @Autowired
    private JavaMailSender mailSender;

    public void sendOtpEmail(String to, String otp) {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(to);
        message.setSubject("Your OTP for ATM Login");
        message.setText("Your OTP is: " + otp + "\n\nThis OTP will expire in 5 minutes.");
        System.out.println(message.getSubject()+" "+message.getText());
        mailSender.send(message);
    }
}
