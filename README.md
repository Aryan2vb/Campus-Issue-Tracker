# Issue Tracker and Department Management API

This is a RESTful API for managing users, departments, and issues, built with Express.js and MongoDB. It includes endpoints for user authentication, department management, and issue tracking.

## Features

- **User Authentication**: Register, login, and manage user profiles.
- **Department Management**: Retrieve and add departments.
- **Issue Tracker**: Submit, retrieve, and filter issues based on status.

## Prerequisites

- Node.js
- MongoDB
- Environment Variables:
    - `MONGODB_URI`: URI for MongoDB connection.
    - `JWT_SECRET`: Secret key for JWT token verification.

## Project Structure

- **server.js**: Sets up the server, connects to MongoDB, and configures the routes.
- **routes/**: Contains routes for users, departments, and issues.
- **controllers/**: Handles the logic for user registration, login, department management, and issue tracking.
- **middleware/**: Includes authentication middleware for JWT verification.

## Installation

1. Clone the repository:
    ```bash
    git clone https://github.com/Aryan2vb/issue-tracker-api.git
    cd issue-tracker-api
    ```
2. Install the required dependencies:
    ```bash
    npm install
    ```
3. Set up environment variables in a `.env` file:
    ```plaintext
    MONGODB_URI=your_mongodb_uri
    JWT_SECRET=your_jwt_secret
    ```
4. Start the server:
    ```bash
    npm start
    ```

## API Endpoints

### User Authentication Routes

#### 1. Register a New User
- **Endpoint**: `POST /api/v1/auth/register`
- **Request Body**:
    ```json
    {
      "username": "JohnDoe",
      "email": "johndoe@example.com",
      "password": "strongPassword123"
    }
    ```
- **Response (Success - 201)**:
    ```json
    {
      "message": "User registered successfully",
      "user": {
        "id": "uniqueUserId",
        "username": "JohnDoe",
        "email": "johndoe@example.com"
      }
    }
    ```
- **Response (Error - 400)**:
    ```json
    {
      "message": "Missing required fields"
    }
    ```

#### 2. Login User
- **Endpoint**: `POST /api/v1/auth/login`
- **Request Body**:
    ```json
    {
      "email": "johndoe@example.com",
      "password": "strongPassword123"
    }
    ```
- **Response (Success - 200)**:
    ```json
    {
      "token": "your.jwt.token"
    }
    ```
- **Response (Error - 400)**:
    ```json
    {
      "message": "Invalid credentials"
    }
    ```

#### 3. Get User Profile
- **Endpoint**: `GET /api/v1/auth/:id`
- **Response (Success - 200)**:
    ```json
    {
      "user": {
        "id": "uniqueUserId",
        "username": "JohnDoe",
        "email": "johndoe@example.com"
      }
    }
    ```
- **Response (Error - 404)**:
    ```json
    {
      "message": "User not found"
    }
    ```

#### 4. Update User Profile
- **Endpoint**: `PUT /api/v1/auth/:id`
- **Request Body**:
    ```json
    {
      "username": "UpdatedJohnDoe",
      "email": "updated.johndoe@example.com"
    }
    ```
- **Response (Success - 200)**:
    ```json
    {
      "user": {
        "id": "uniqueUserId",
        "username": "UpdatedJohnDoe",
        "email": "updated.johndoe@example.com"
      }
    }
    ```
- **Response (Error - 404)**:
    ```json
    {
      "message": "User not found"
    }
    ```

---

### Department Management Routes

#### 1. Get All Departments
- **Endpoint**: `GET /api/v1/departments`
- **Request Header**:
    ```plaintext
    Authorization: Bearer <token>
    ```
- **Response (Success - 200)**:
    ```json
    {
      "departments": [
        {
          "id": "department1",
          "department_name": "Human Resources",
          "contact_email": "hr@example.com"
        },
        {
          "id": "department2",
          "department_name": "IT Support",
          "contact_email": "it@example.com"
        }
      ]
    }
    ```
- **Response (Error - 401)**:
    ```json
    {
      "message": "Unauthorized"
    }
    ```

#### 2. Add a New Department
- **Endpoint**: `POST /api/v1/departments`
- **Request Header**:
    ```plaintext
    Authorization: Bearer <token>
    ```
- **Request Body**:
    ```json
    {
      "department_name": "Marketing",
      "contact_email": "marketing@example.com"
    }
    ```
- **Response (Success - 201)**:
    ```json
    {
      "message": "Department created",
      "department": {
        "id": "department3",
        "department_name": "Marketing",
        "contact_email": "marketing@example.com"
      }
    }
    ```
- **Response (Error - 400)**:
    ```json
    {
      "message": "Missing required fields"
    }
    ```

---

### Issue Tracker Routes

#### 1. Submit a New Issue
- **Endpoint**: `POST /api/v1/issues`
- **Request Header**:
    ```plaintext
    Authorization: Bearer <token>
    ```
- **Request Body**:
    ```json
    {
      "title": "Bug in system",
      "description": "There is a bug in the login system",
      "status": "open"
    }
    ```
- **Response (Success - 201)**:
    ```json
    {
      "message": "Issue created successfully",
      "issue": {
        "id": "issue1",
        "title": "Bug in system",
        "description": "There is a bug in the login system",
        "status": "open"
      }
    }
    ```
- **Response (Error - 400)**:
    ```json
    {
      "message": "Missing required fields"
    }
    ```

#### 2. Get Issue Details
- **Endpoint**: `GET /api/v1/issues/:id`
- **Request Header**:
    ```plaintext
    Authorization: Bearer <token>
    ```
- **Response (Success - 200)**:
    ```json
    {
      "issue": {
        "id": "issue1",
        "title": "Bug in system",
        "description": "There is a bug in the login system",
        "status": "open"
      }
    }
    ```
- **Response (Error - 404)**:
    ```json
    {
      "message": "Issue not found"
    }
    ```

#### 3. Filter Issues by Status
- **Endpoint**: `GET /api/v1/issues`
- **Request Header**:
    ```plaintext
    Authorization: Bearer <token>
    ```
- **Query Parameter**:
    ```plaintext
    status=open
    ```
- **Response (Success - 200)**:
    ```json
    {
      "issues": [
        {
          "id": "issue1",
          "title": "Bug in system",
          "description": "There is a bug in the login system",
          "status": "open"
        },
        {
          "id": "issue2",
          "title": "Server crash",
          "description": "The server crashed on restart",
          "status": "open"
        }
      ]
    }
    ```
- **Response (Error - 401)**:
    ```json
    {
      "message": "Unauthorized"
    }
    ```

---

## Contributing

Contributions are welcome! If you have suggestions for improvements or features, feel free to open an issue or submit a pull request.


This project is open-source.
