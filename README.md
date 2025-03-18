# 🏦 ATM Banking Web Application

A secure full-stack ATM banking system that simulates core ATM functionalities like user registration with OTP verification, login with card number and PIN, account management, transaction history, and more.

---

## 🧩 Tech Stack

### 🚀 Backend
- **Java 17**
- **Spring Boot**
- **Spring Data JPA (Hibernate)**
- **MySQL**
- **JavaMailSender (OTP Email)**
- **Lombok**

### 🌐 Frontend
- **React JS (with Vite)**
- **Axios**
- **React Router**
- **Tailwind CSS**
- **Toastify for notifications**

---

## ✅ Features

### 🛠️ Backend
- Register user with **OTP email verification**
- Card number is auto-generated and unique
- Save unverified users in `pending_user` table
- OTP resend support
- User verification before creation
- Login using card number and PIN
- Secure password handling (PINs)
- Transaction APIs: deposit, withdraw, view balance
- Daily and monthly transaction summaries
- Basic analytics support (Chart.js ready)

### 💻 Frontend
- Register form with dynamic OTP verification
- Login form using card number & PIN
- Resend OTP if expired
- Dashboard to:
  - View balance
  - View transaction history
  - Perform deposits/withdrawals
  - Profile page with update support
  - Dark mode support
  - Charts and analytics

---

## 🧪 Database Schema

### `pending_user`
| Field          | Type         |
|----------------|--------------|
| id             | BIGINT (PK)  |
| name           | VARCHAR      |
| card_number    | VARCHAR (unique) |
| email          | VARCHAR      |
| phone          | VARCHAR      |
| pin            | VARCHAR      |
| balance        | DOUBLE       |
| otp            | VARCHAR      |
| otp_generated_at | TIMESTAMP |
| status         | VARCHAR (default: 'unverified') |

### `user`
| Field          | Type         |
|----------------|--------------|
| id             | BIGINT (PK)  |
| name           | VARCHAR      |
| card_number    | VARCHAR (unique) |
| email          | VARCHAR      |
| phone          | VARCHAR      |
| pin            | VARCHAR      |
| balance        | DOUBLE       |
| status         | VARCHAR (default: 'verified') |
| created_at     | TIMESTAMP    |

### `transaction`
| Field          | Type         |
|----------------|--------------|
| id             | BIGINT (PK)  |
| card_number    | VARCHAR      |
| amount         | DOUBLE       |
| type           | ENUM (DEPOSIT, WITHDRAW) |
| date           | TIMESTAMP    |

---

## ⚙️ Getting Started

### 📦 Backend Setup

```bash
cd backend

configure application.properties file like
# MySQL Configuration
spring.datasource.url=jdbc:mysql://localhost:3306/atm_db
spring.datasource.username=root
spring.datasource.password=yourpassword

# JPA
spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=true

# Mail Configuration
spring.mail.host=smtp.gmail.com
spring.mail.port=587
spring.mail.username=your-email@gmail.com
spring.mail.password=your-app-password
spring.mail.properties.mail.smtp.auth=true
spring.mail.properties.mail.smtp.starttls.enable=true

for running backend
./mvnw spring-boot:run
 and for frontend
cd frontend
npm install
npm run dev
