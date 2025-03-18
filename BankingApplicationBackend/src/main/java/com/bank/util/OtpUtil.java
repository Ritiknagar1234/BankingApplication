package com.bank.util;

import java.util.Random;

public class OtpUtil {
	 public static String generateOtp() {
	        return String.format("%06d", new Random().nextInt(999999));
	    }
}
