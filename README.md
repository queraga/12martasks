# JWT Authentication API (Learning Project)

## Description

This project demonstrates a simple authentication system built with **Node.js**, **Express**, **JWT**, and **bcrypt**.

The application allows users to:

- authenticate via email and password
- receive a JWT token
- access protected routes
- update their profile

This project is part of backend learning tasks and will be extended with additional features.

## Tech Stack

- Node.js
- Express
- JSON Web Token (JWT)
- bcrypt
- dotenv

## Project Structure

```
JWT/
│
├── middlewares/
│   └── auth.js        # JWT authentication middleware
│
├── index.js           # Express server and routes
├── .env               # environment variables
├── package.json
```

What This Project Demonstrates

- password hashing with bcrypt
- JWT authentication
- Express middleware
- protected routes
- simple user profile update
