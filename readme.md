/**\*\***\***\*\*** ✨ Codeium Command 🌟 **\*\***\***\*\***/

# MERN Stack Contact Management System

# 🌟 **Contact management System** 🌟

Welcome to the MERN Stack Contact Management System! A secure and user-friendly with Login and Registration System developed using the MERN stack (MongoDB, Express, React, Node.js). This application provides user authentication and a dynamic dashboard for managing contacts.
Welcome to the **MERN Stack Contact management System**! 🚀

## Features

A secure and user-friendly with Login and Registration System developed using the **MERN stack** (MongoDB, Express, React, Node.js). This application provides user authentication and a dynamic dashboard for managing contacts.

## Screenshots

Below are some screenshots of the application:

### 1. Homepage

![Homepage Screenshot](./frontend/src/assets/screenshots/feeds.png)
![Homepage Screenshot](./frontend/src/assets/screensorts/feeds.png)

### 2. User Profile Page

![User Profile Page Screenshot](./frontend/src/assets/screenshots/profile.png)
![User Profile Page Screenshot](./frontend/src/assets/screensorts/profile.png)

### 3. Post Details Page

![Post Details Page Screenshot](./frontend/src/assets/screenshots/postdetails.png)
![Post Details Page Screenshot](./frontend/src/assets/screensorts/postdetails.png)

### 4. Chat Page

![Chat Page Screenshot](./frontend/src/assets/screenshots/chat.png)
![Chat Page Screenshot](./frontend/src/assets/screensorts/chat.png)

### 5. Search Page

![Search Page Screenshot](./frontend/src/assets/screenshots/search.png)
![Search Page Screenshot](./frontend/src/assets/screensorts/search.png)

### 6. Sign In Profile Page

![Sign In Profile Page Screenshot](./frontend/src/assets/screenshots/signup.png)
![Sign In Profile Page Screenshot](./frontend/src/assets/screensorts/signup.png)

### User Authentication

---

- Register new users with unique email and password.
- Password hashing using bcrypt for security.
- Secure authentication using JWT.
- Access control to ensure only authenticated users can access protected routes.

## 🎉 **Live Demo**

### Dynamic User Dashboard

👉 [**Click Here**](#) _(Add your live demo link here)_

- Add Contacts:
  - Form to input a contact's name, email, and mobile number.

---

## 🧾 **Table of Contents**

- 🔑 [Features](#features)
- 🖼️ [Screenshots](#screenshots)
- 🛠️ [Getting Started](#getting-started)
- 🌐 [API Routes](#api-routes)
- 🖥️ [Frontend Routes](#frontend-routes)
- 🔐 [Environment Variables](#environment-variables)
- 📜 [License](#license)

---

## 🔑 **Features**

### ✨ **User Authentication**

- ✅ Register new users with unique email and password.
- ✅ Password hashing using **bcrypt** for security.
- ✅ Secure authentication using **JWT**.
- ✅ Access control to ensure only authenticated users can access protected routes.

### ✨ **Dynamic User Dashboard**

- 📇 **Add Contacts**:
  - Form to input a contact’s name, email, and mobile number.
  - Validation for unique email and valid mobile number.
- **Edit Contacts**:
  - Update contact details via a modal or separate edit page.
- **Delete Contacts**:
  - Remove contacts with confirmation prompts.

### ✨ **Advanced Functionalities**

- 🔍 Search and filter contacts effortlessly.
- ⭐ Mark and manage favorite contacts.
- 🖼️ Upload profile pictures.
- 🔒 Secure data storage with MongoDB.
- 📧 Integrated email (mailto) and call (tel) actions.
- 📊 Paginated views for contact management.

---

## 🛠️ **Getting Started**

### 🚀 **Prerequisites**

Before you begin, ensure you have the following tools installed:

- React.js
- Material UI
- Tailwind CSS
- React Router Dom
- Framer-motion
- React-icons
- Node.js
- npm/yarn
- Express.js
- MongoDB
- Git
- Cloudinary account for image uploads

### Installing

1. Clone the repository:
1. **Clone the repository:**

   ```bash
   git clone https://github.com/anupamyadav01/Threads-Clone.git
   ```

1. **Navigate to the project directory:**

   ```bash
   cd Threads-Clone
   ```

1. **Install backend dependencies:**

   ```bash
   cd backend
   npm install
   ```

1. **Install frontend dependencies:**

   ```bash
   cd ../frontend
   npm install
   ```

1. **Create a `.env` file in the `backend` directory with the following:**

   ```plaintext
   PORT=10000
   MONGODB_URI=mongodb+srv://yourusername:yourpassword@cluster0.mongodb.net
   DB_NAME=socialmedia
   JWT_SECRET=your-secret-key
   MAIL_PASSWORD=your-mail-password
   MAIL_USERNAME=your-email@gmail.com
   CLOUDINARY_NAME=your-cloudinary-name
   CLOUDINARY_API_KEY=your-cloudinary-api-key
   CLOUDINARY_API_SECRET=your-cloudinary-api-secret
   CLOUDINARY_URL=cloudinary://your-cloudinary-api-key:your-cloudinary-api-secret@your-cloudinary-name
   ```

1. **Run the backend:**

   ```bash
   npm run dev
   ```

1. **Run the frontend:**

   ```bash
   cd frontend
   npm run dev
   ```

---

## API Routes

### User Routes

| HTTP Method | Endpoint           | Description                      |
| ----------- | ------------------ | -------------------------------- |
| `POST`      | `/register`        | Register a new user              |
| `POST`      | `/login`           | Log in an existing user          |
| `POST`      | `/logout`          | Log out a user                   |
| `POST`      | `/isLoggedIn`      | Check if a user is logged in     |
| `POST`      | `/forgot-password` | Request password reset via email |
| `POST`      | `/verify-otp`      | Verify OTP for password reset    |
| `POST`      | `/reset-password`  | Reset user password              |

## Frontend Routes

The frontend is built using **React** and **React Router**. Here are the main routes:

| Route        | Component           | Description         |
| ------------ | ------------------- | ------------------- |
| `/`          | `Login/Signup Page` | To Login and Signup |
| `/dashboard` | `Dashboard`         | User's Dashbaord    |
