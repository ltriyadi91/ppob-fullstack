# PPOB eCommerce Application

A full-stack Payment Point Online Bank (PPOB) eCommerce application built with Next.js and Spring Boot.

## Project Structure

```
├── apps
│   ├── backend/                 # Spring Boot backend application
│   │   ├── src/main/java
│   │   │   └── com/ggrmtest/ppob
│   │   │       ├── common/      # Common utilities, DTOs, constants
│   │   │       ├── configs/     # Application configurations
│   │   │       ├── domain/      # Business logic and controllers
│   │   │       └── infrastructure/  # Database and external services
│   │   └── src/main/resources   # Application properties and DB migrations
│   │
│   └── frontend/                # Next.js frontend application
│       ├── app/                 # Next.js app directory
│       │   ├── components/      # Reusable UI components
│       │   ├── login/           # Authentication pages
│       │   ├── register/        # Registration pages
│       │   ├── dashboard/       # Dashboard pages
│       │   ├── profile/         # Profile pages
│       │   └── api/             # API routes
│       └── public/              # Static assets
```

## Prerequisites

- Node.js (v15.2.4 or higher)
- Java Development Kit (JDK) 17 or higher
- Maven
- PostgreSQL database

## Getting Started

### Backend Setup

1. Navigate to the backend directory:
   ```bash
   cd apps/backend
   ```

2. Install dependencies and build:
   ```bash
   mvn clean install
   ```

3. Run the application:
   ```bash
   mvn spring-boot:run
   ```

The backend server will start on `http://localhost:8080`

### Frontend Setup

1. Navigate to the frontend directory:
   ```bash
   cd apps/frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Run the development server:
   ```bash
   npm run dev
   ```
The frontend application will be available at `http://localhost:3000`

### Setup Using NX
At the root directory, run the following commands:

1. (Backend) Run the development server
   ```bash
   npx nx serve backend
   ```

2. (Frontend) Run the development server
   ```bash
   npx nx serve frontend
   ```
3. (Frontend) Run the production build
   ```bash
   npx nx start frontend
   ```

## Features

- User authentication (Login/Register)
- Product catalog browsing
- Shopping cart functionality
- Payment processing
- Transaction history
- User account management

## Tech Stack

### Frontend
- Next.js (v15.2.4)
- React (v19.0.0)
- Mantine UI

### Backend
- Spring Boot
- Spring Security
- Spring Data JPA
- Liquibase for database migrations

