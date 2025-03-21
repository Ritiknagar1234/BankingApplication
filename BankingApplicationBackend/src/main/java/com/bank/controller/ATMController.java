package com.bank.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;


import com.bank.payload.WithdrawRequest;
import com.bank.DTO.LoginDTO;
import com.bank.DTO.UserDTO;
import com.bank.entities.PendingUser;
import com.bank.entities.Transaction;
import com.bank.entities.User;
import com.bank.repository.PendingUserRepository;
import com.bank.repository.UserRepository;
import com.bank.service.ATMService;
import com.bank.service.OtpService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/api")
public class ATMController {

    @Autowired
    private ATMService atmService;

    @Autowired
    private UserRepository userRepo;
    @Autowired
    private OtpService otpService;
    @Autowired
    private PendingUserRepository pendingUserRepository;

    // ✅ Initiate registration - Send OTP
    @PostMapping("/register/initiate")
    public ResponseEntity<?> initiateRegistration(@RequestBody UserDTO dto) {
        try {
            User maskedUser = atmService.initiateRegistration(dto);

            Map<String, Object> response = new HashMap<>();
            response.put("cardNumber", maskedUser.getCardNumber());
            response.put("message", "OTP sent to your email. Please verify to complete registration.");
            System.out.println("Cardnumber in backend "+maskedUser.getCardNumber());

            return ResponseEntity.ok(response);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body(Map.of("error", "Registration initiation failed: " + e.getMessage()));
        }
    }



    // ✅ Verify OTP and register user
    @PostMapping("/register/verify")
    public ResponseEntity<?> verifyOtpAndRegister(@RequestParam String cardNumber, @RequestParam String otp) {
        try {
            System.out.println("In verify handler :" + "cardnumber :" + cardNumber + " otp :" + otp);
            String result = atmService.verifyOtpAndRegister(cardNumber, otp);
            return ResponseEntity.ok(Map.of("message", result));
        } catch (RuntimeException e) {
        	System.out.println("Exception in verify handler :"+e.getMessage());
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                .body(Map.of("error", e.getMessage()));
        }
    }


    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginDTO loginDTO) {
        System.out.println("Login attempt: Card Number - " + loginDTO.getCardNumber() + ", PIN - " + loginDTO.getPin());

        try {
            User user = atmService.login(loginDTO);
            Map<String, Object> response = new HashMap<>();
            response.put("user", user);
            return ResponseEntity.ok(response);
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid card number or PIN");
        }
    }

    @PostMapping("/deposit")
    public ResponseEntity<String> deposit(@RequestParam Long userId, @RequestParam double amount) {
        atmService.deposit(userId, amount);
        return ResponseEntity.ok("Amount Deposited Successfully");
    }

    @PostMapping("/withdraw")
    public ResponseEntity<String> withdraw(@RequestBody WithdrawRequest request) {
        atmService.withdraw(request.getUserId(), request.getAmount());
        return ResponseEntity.ok("Withdrawal Successful");
    }

    @PostMapping("/fast-cash")
    public ResponseEntity<String> fastCash(@RequestParam Long userId, @RequestParam double amount) {
        atmService.fastCash(userId, amount);
        return ResponseEntity.ok("Fast Cash Withdrawn");
    }

    @PutMapping("/change-pin")
    public ResponseEntity<String> changePin(@RequestParam Long userId, @RequestParam String newPin) {
        atmService.changePin(userId, newPin);
        return ResponseEntity.ok("PIN Changed Successfully");
    }

    @GetMapping("/balance/{userId}")
    public ResponseEntity<Double> getBalance(@PathVariable Long userId) {
        return ResponseEntity.ok(atmService.getBalance(userId));
    }

    @GetMapping("/analytics/{userId}")
    public ResponseEntity<Map<String, Object>> getAnalytics(@PathVariable Long userId) {
        return ResponseEntity.ok(atmService.getTransactionAnalytics(userId));
    }

    @GetMapping("/user/{id}")
    public ResponseEntity<User> getUser(@PathVariable Long id) {
        return ResponseEntity.ok(userRepo.findById(id).orElseThrow());
    }

    @PutMapping("/user/{id}")
    public ResponseEntity<User> updateUser(@PathVariable Long id, @RequestBody UserDTO dto) {
        User user = userRepo.findById(id).orElseThrow();
        user.setName(dto.name);
        user.setEmail(dto.email);
        user.setPhone(dto.phone);
        return ResponseEntity.ok(userRepo.save(user));
    }

    @GetMapping("/transactions/{userId}")
    public ResponseEntity<List<Transaction>> getFilteredTransactions(
            @PathVariable Long userId,
            @RequestParam(required = false) String type,
            @RequestParam(required = false) String date,
            @RequestParam(required = false) Double amount
    ) {
        List<Transaction> filtered = atmService.filterTransactions(userId, type, date, amount);
        return ResponseEntity.ok(filtered);
    }
    @PostMapping("/resend-otp")
    public ResponseEntity<?> resendOtp(@RequestParam String cardNumber) {
        return pendingUserRepository.findByCardNumber(cardNumber)
            .map(user -> {
                
                otpService.generateAndSendOtp(user);
                return ResponseEntity.ok("OTP resent successfully.");
            })
            .orElseGet(() -> ResponseEntity.status(HttpStatus.NOT_FOUND).body("User not found"));
    }

}
