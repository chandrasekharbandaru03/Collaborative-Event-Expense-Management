# Collaborative Event Expense Management System

A full-stack web application that helps users organize events, manage participants, record expenses, and track event-related spending in one place.

## 🚀 Technologies Used

### Backend
- Java
- Spring Boot
- Spring Data JPA
- Hibernate
- REST APIs
- MySQL
- Maven
- Swagger UI / OpenAPI

### Frontend
- React.js
- Vite
- JavaScript
- Axios
- HTML5
- CSS3

## ✨ Features

- **User Management** – Create and manage users.
- **Event Management** – Create events and retrieve event details.
- **Member Management** – Add members to events.
- **Expense Management** – Record and retrieve event expenses.
- **REST API Integration** – Connect the React frontend with the Spring Boot backend.
- **Database Integration** – Store application data using MySQL.
- **API Documentation** – Test backend endpoints using Swagger UI.

## 🏗️ Project Structure

```text
Collaborative-Event-Expense-Management/
├── TeamExpensemanagement-UI/
│   └── React Frontend
├── Teamexpensemanager-BE/
│   └── Spring Boot Backend
├── .gitignore
└── README.md
```

## ⚙️ Prerequisites

Install the following before running the application:

- Java JDK
- Node.js and npm
- MySQL Server
- Maven (or use the Maven Wrapper if included)

## 🛠️ Setup and Installation

### 1. Clone the Repository

```bash
git clone https://github.com/chandrasekharbandaru03/Collaborative-Event-Expense-Management.git
```

### 2. Configure the Database

Create a MySQL database:

```sql
CREATE DATABASE team_expense_manager;
```

Configure the database URL, username, and password in the backend's `application.properties` file.

For security, keep database credentials outside the source code and use environment variables.

### 3. Run the Spring Boot Backend

Navigate to the backend directory:

```bash
cd Teamexpensemanager-BE
```

Run the application using Maven:

```bash
mvn spring-boot:run
```

The backend is configured to run on port `7799`.

### 4. Run the React Frontend

Open another terminal and navigate to the frontend directory:

```bash
cd TeamExpensemanagement-UI
npm install
npm run dev
```

Open the local URL displayed in the terminal, usually `http://localhost:5173`.

## 📚 API Documentation

After starting the backend, open Swagger UI at:

http://localhost:7799/swagger-ui/index.html

Use Swagger UI to explore and test the available REST API endpoints.

## 🔮 Future Enhancements

- User authentication and authorization
- Expense splitting and individual member balances
- Expense summaries and reports
- Improved UI and responsive design
- Deployment to a cloud platform


## 📄 License

This project is developed for learning and portfolio purposes.
