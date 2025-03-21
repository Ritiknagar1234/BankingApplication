package com.bank.serviceImpl;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Random;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.bank.DTO.LoginDTO;
import com.bank.DTO.UserDTO;
import com.bank.entities.PendingUser;
import com.bank.entities.Transaction;
import com.bank.entities.User;
import com.bank.repository.PendingUserRepository;
import com.bank.repository.TransactionRepository;
import com.bank.repository.UserRepository;
import com.bank.service.ATMService;
import com.bank.service.EmailService;
@Transactional
@Service
public class ATMServiceImpl implements ATMService {
    
    @Autowired
    private UserRepository userRepo;

    @Autowired
    private TransactionRepository transRepo;
    @Autowired
    private PendingUserRepository pendingUserRepo;
    @Autowired
  private  EmailService emailService;
    
    @Override
    public String verifyOtpAndRegister(String cardNumber, String otp) {
    	System.out.println("In verifyOtp and refistration impl :"+"CardNumber :"+cardNumber+" Otp :"+ otp);
        PendingUser pending = pendingUserRepo.findByCardNumber(cardNumber)
            .orElseThrow(() -> new RuntimeException("No pending registration found"));

        if (!pending.getOtp().equals(otp)) {
            throw new RuntimeException("Invalid OTP");
        }

        User user = new User();
        user.setName(pending.getName());
        user.setCardNumber(pending.getCardNumber());
        user.setPin(pending.getPin());
        user.setEmail(pending.getEmail());
        user.setPhone(pending.getPhone());
        user.setBalance(pending.getBalance());
        user.setCreatedAt(LocalDateTime.now());
        user.setStatus("verified");
        		System.out.println("User verified !!! OTP is correct");
        userRepo.save(user);
        pendingUserRepo.deleteByCardNumber(cardNumber);

        return "Registration successful. You may now log in.";
    }



    @Override
    public User initiateRegistration(UserDTO dto) {
        if (userRepo.findByCardNumber(dto.cardNumber).isPresent()
            || pendingUserRepo.findByCardNumber(dto.cardNumber).isPresent()) {
            throw new RuntimeException("Card number already exists or is pending verification.");
        }

        String otp = String.valueOf(100000 + new Random().nextInt(900000));
        String cardNumber = generateUniqueCardNumber();

        PendingUser pending = new PendingUser();
        pending.setName(dto.name);
        pending.setCardNumber(cardNumber);
        pending.setPin(dto.pin);
        pending.setEmail(dto.email);
        pending.setPhone(dto.phone);
        pending.setBalance(dto.balance);
        pending.setOtp(otp);
        pending.setOtpGeneratedAt(LocalDateTime.now());

        pendingUserRepo.save(pending);

        System.out.println("Generated OTP: " + otp);
        // Replace with email/SMS
        emailService.sendOtpEmail(dto.email, otp);


        // ✅ Return minimal info back to frontend
        User maskedUser = new User();
        maskedUser.setCardNumber(cardNumber);
        return maskedUser;
    }


    	
    @Override
    public User login(LoginDTO loginDTO) {
        User user = userRepo.findByCardNumber(loginDTO.getCardNumber())
                .orElseThrow(() -> new RuntimeException("Invalid card number or PIN"));

        if (!user.getPin().equals(loginDTO.getPin())) {
            throw new RuntimeException("Invalid card number or PIN");
        }

        if (!"verified".equalsIgnoreCase(user.getStatus())) {
            throw new RuntimeException("Account not verified. Please verify OTP.");
        }

        return user;
    }


    @Override
    public void deposit(Long userId, double amount) {
        User user = userRepo.findById(userId).orElseThrow();
        user.setBalance(user.getBalance() + amount);
        userRepo.save(user);
        transRepo.save(new Transaction(userId, "DEPOSIT", amount));
    }

    @Override
    public void withdraw(Long userId, double amount) {
        User user = userRepo.findById(userId).orElseThrow();
        if (user.getBalance() < amount) {
            throw new RuntimeException("Insufficient balance");
        }
        System.out.println("Trying to withdraw amount");
        user.setBalance(user.getBalance() - amount);
        userRepo.save(user);
        transRepo.save(new Transaction(userId, "WITHDRAW", amount));
    }

    @Override
    public void fastCash(Long userId, double amount) {
        withdraw(userId, amount);
    }

    @Override
    public void changePin(Long userId, String newPin) {
        User user = userRepo.findById(userId).orElseThrow();
        user.setPin(newPin); // Hash in production
        userRepo.save(user);
    }

    @Override
    public double getBalance(Long userId) {
        return userRepo.findById(userId).orElseThrow().getBalance();
    }

    @Override
    public List<Transaction> getStatement(Long userId) {
        return transRepo.findByUserId(userId);
    }
    private String generateUniqueCardNumber() {
        String cardNumber;
        Random random = new Random();

        do {
            // Generate a 10-digit random number starting with a fixed prefix (optional)
            cardNumber = String.valueOf(1000000000L + Math.abs(random.nextLong() % 9000000000L));
        } while (userRepo.findByCardNumber(cardNumber).isPresent());

        return cardNumber;
    }
    @Override
    public Map<String, Object> getTransactionAnalytics(Long userId) {
        List<Transaction> transactions = transRepo.findByUserId(userId);
        
        Map<String, Object> analytics = new HashMap<>();

        long depositCount = transactions.stream().filter(t -> t.getType().equals("DEPOSIT")).count();
        long withdrawCount = transactions.stream().filter(t -> t.getType().equals("WITHDRAW")).count();

        Map<String, Long> dateActivity = transactions.stream()
            .collect(Collectors.groupingBy(
                t -> t.getDate().toLocalDate().toString(),
                Collectors.counting()
            ));

        analytics.put("deposits", depositCount);
        analytics.put("withdrawals", withdrawCount);
        analytics.put("activityByDate", dateActivity);

        return analytics;
    }
    
    @Override
    public List<Transaction> filterTransactions(Long userId, String type, String date, Double amount) {
        List<Transaction> transactions = transRepo.findByUserId(userId);

        return transactions.stream()
            .filter(t -> (type == null || t.getType().equalsIgnoreCase(type)))
            .filter(t -> (amount == null || t.getAmount() == amount))
            .filter(t -> (date == null || t.getDate().toString().contains(date))) // adjust date format as needed
            .toList();
    }



}

