# 🎉 Eventify  
### A Smart & Modern Event Management Platform

Eventify is a full-stack event management system that allows users to **host events**, **register for events**, receive **auto-generated e-tickets**, and manage everything through a clean and interactive UI.

---

## ✨ Features

### 👥 User Features
- Browse all upcoming events  
- Register for events easily  
- Receive email confirmation with **unique ticket code**  
- View all registered events in personal dashboard  
- Cancel event registration anytime  

### 🧑‍💼 Admin / Host Features
- Create and publish new events  
- Edit, update or delete events  
- View list of all participants  
- Admin dashboard for analytics  
- Secure access with authentication (optional)  

---

## 🛠️ Tech Stack

### **Frontend**
- React + Vite / EJS (choose your implementation)
- Tailwind CSS  
- Framer Motion  
- Axios  

### **Backend**
- Node.js  
- Express.js  
- MongoDB + Mongoose  
- Nodemailer (for sending tickets)  
- dotenv  
- JWT Authentication (optional)

---

## 🧾 Auto Ticket Generation
Every registration generates a unique ticket code:
Example: EVT-A1B2C3
The user receives an email containing:
- Event Name
- Event Date
- Time Slot
- Guest Details
- Auto-generated Ticket Code
