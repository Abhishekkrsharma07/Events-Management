# Event Management System

## Introduction
The Event Management System is a full-stack web application designed to simplify the process of managing and booking events. It allows users to browse events, view details, and book tickets, while administrators can create and manage events efficiently.

## Features

### User Features
- Browse available events
- View event details
- Book tickets/events
- View booking history

### Admin Features
- Add new events
- Update event details
- Delete events
- Manage bookings

## Technology Stack
- **Frontend:** React.js (Vite), Tailwind CSS
- **Backend:** Node.js, Express.js
- **Database:** MongoDB
- **Other Tools & Integrations:** JWT Authentication, Cloudinary (Image Uploads), Razorpay (Payment Gateway), Nodemailer, QR Code generation

## Project Structure
```text
Event-Management/
├── frontend/
│   ├── public/
│   └── src/
│       ├── api/
│       ├── components/
│       ├── context/
│       └── pages/
└── backend/
    ├── api/
    ├── config/
    ├── middleware/
    ├── models/
    ├── routes/
    └── utils/
```

## Installation and Setup

### Prerequisites
- Node.js installed
- MongoDB installed or MongoDB Atlas URI

### 1. Clone the repository
```bash
git clone https://github.com/Abhishekkrsharma07/Events-Management.git
cd Events-Management
```

### 2. Backend Setup
```bash
cd backend
npm install
```
Create a `.env` file in the `backend` directory and configure your variables (e.g., `PORT`, `MONGO_URI`, `JWT_SECRET`, Cloudinary credentials, Razorpay keys).
```bash
npm start
# or use nodemon: npm run dev
```

### 3. Frontend Setup
```bash
cd ../frontend
npm install
npm run dev
```

## Future Improvements
- Real-time notifications
- Event reviews and ratings
- AI-based recommendations

## Author
**Abhishek Sharma** - B.Tech CSE Final Year
