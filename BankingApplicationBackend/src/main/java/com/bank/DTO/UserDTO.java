package com.bank.DTO;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@ToString
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class UserDTO {
	 public String name;
	    public String cardNumber;
	    public String pin;
	    public String email;
	    public String phone;
	    public double balance;
}
