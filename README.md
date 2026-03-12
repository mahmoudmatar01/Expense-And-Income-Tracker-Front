# Expense Income Tracker – Frontend

## Overview

**Expense Income Tracker** is a modern financial management web application designed to help families track their income and expenses while teaching children responsible money management.

The system supports **three types of users**:

- **Parent** – manages wallets, budgets, categories, and children accounts.
- **Child** – records expenses and learns spending habits.
- **Admin** – monitors the platform and manages users.

This repository contains the **Angular frontend application** that communicates with a **Spring Boot REST API backend**.

---

## Tech Stack

### Frontend
- Angular
- TypeScript
- HTML
- CSS / SCSS

### Architecture
- Component-based architecture
- Feature-based modules
- Service-based API communication
- Reactive programming using RxJS

### Authentication
- JWT Authentication
- Refresh Token mechanism

### Backend
- Spring Boot REST API

---

# Application Features

## Authentication

- Parent Registration
- Secure Login
- JWT Authentication
- Refresh Token Support
- Logout

---

# Parent Dashboard

The Parent Dashboard allows parents to manage family financial activities.

### Features

- Wallet Management
- Categories Management
- Budgets Management
- Children Accounts Management
- Transactions Management
- Financial Insights
- Profile Management

### Capabilities

Parents can:

- Create and manage multiple wallets
- Add and manage expense categories
- Create budgets for spending control
- Create accounts for their children
- Monitor children's financial activity
- Track income and expense transactions

---

# Child Dashboard

The Child Dashboard is designed to help children track their spending habits.

### Features

- View Wallet Balance
- Create Expense Transactions
- View Recent Transactions
- Spending by Category chart

### Restrictions

- Children can only create **expense transactions**
- Transaction type is fixed to **EXPENSE**
- Children cannot modify transaction type

---

# Admin Dashboard

The Admin Dashboard is responsible for managing the entire system.

### Features

- View all system users
- Monitor transactions
- Manage user status
- View analytics
- Manage suspended accounts

---

# Project Structure

Example Angular structure:

```
src/
 ├── app/
 │   ├── core/
 │   │   ├── guards/
 │   │   ├── interceptors/
 │   │   └── services/
 │   │
 │   ├── shared/
 │   │   ├── components/
 │   │   └── models/
 │   │
 │   ├── features/
 │   │   ├── auth/
 │   │   ├── parent/
 │   │   ├── child/
 │   │   └── admin/
 │   │
 │   └── app-routing.module.ts
```

---

# Backend API

The frontend communicates with the backend via REST APIs.

### Base URL

```
https://expenseincometracker-production.up.railway.app
```

### API Groups

- Authentication APIs
- Parent APIs
- Child APIs
- Admin APIs

Authentication is handled using **JWT Bearer Tokens**.

---

# Installation

## Clone the Repository

```bash
git clone https://github.com/your-username/expense-income-tracker-frontend.git
```

## Navigate to the Project

```bash
cd expense-income-tracker-frontend
```

## Install Dependencies

```bash
npm install
```

## Run the Development Server

```bash
ng serve
```

Application will be available at:

```
http://localhost:4200
```

---

# Environment Configuration

Environment variables are located inside:

```
src/environments/
```

Example configuration:

```ts
export const environment = {
  production: false,
  apiUrl: "https://expenseincometracker-production.up.railway.app"
};
```

---

# Authentication Flow

1. User logs in using email and password
2. Backend returns:
   - Access Token
   - Refresh Token
3. Access Token is used for authenticated requests
4. When the token expires, the refresh token generates a new one

---

# UI Features

The application includes:

- Responsive dashboard layout
- Role-based routing
- Loading states
- Error handling
- Form validation
- Empty state components

---

# Future Improvements

Planned improvements include:

- Mobile responsive enhancements
- Advanced financial analytics
- Notification system
- Dark mode support
- Export reports (PDF / CSV)

---

# Contributors

Developed by:

**Mahmoud Mohamed Matar**

Software Engineer  
Backend Developer (Java / Spring Boot)

---

# License

This project is licensed under the MIT License.
