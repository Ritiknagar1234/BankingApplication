package com.bank.entities;

import java.time.LocalDateTime;
import com.fasterxml.jackson.annotation.JsonFormat;




import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;



@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
public class Transaction {
	 @Id
	    @GeneratedValue(strategy = GenerationType.IDENTITY)
	    private Long id;
	    
	    private Long userId;
	    private String type; // DEPOSIT, WITHDRAW, FAST_CASH
	    private double amount;
	    @JsonFormat(pattern = "yyyy-MM-dd'T'HH:mm:ss")
	    private LocalDateTime date;

	    // Constructor
	    public Transaction(Long userId, String type, double amount) {
	        this.userId = userId;
	        this.type = type;
	        this.amount = amount;
	        this.date = LocalDateTime.now();
	    }
}
