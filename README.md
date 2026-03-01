<div align="center">

# 🌱 AgriSense

### *Empowering Farmers with Smart Soil & Seed Analytics*

[![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://react.dev/)
[![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)](https://nodejs.org/)
[![MySQL](https://img.shields.io/badge/MySQL-4479A1?style=for-the-badge&logo=mysql&logoColor=white)](https://www.mysql.com/)
[![Express](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white)](https://expressjs.com/)
[![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![ESP32](https://img.shields.io/badge/ESP32-IoT-E7352C?style=for-the-badge&logo=espressif&logoColor=white)](https://www.espressif.com/)

<br/>

> An end-to-end smart agriculture platform that connects IoT soil sensors, AI-powered image analysis, and expert agricultural guidance — all in one place.

<br/>

![AgriSense Banner](https://placehold.co/900x300/1a7a3c/white?text=AgriSense+%7C+Smart+Agriculture+Platform)

</div>

---

## 📋 Table of Contents

- [Overview](#-overview)
- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [System Architecture](#-system-architecture)
- [User Roles](#-user-roles)
- [Database Schema](#-database-schema)
- [Project Structure](#-project-structure)
- [Getting Started](#-getting-started)
- [API Endpoints](#-api-endpoints)
- [Roadmap](#-roadmap)
- [Contributing](#-contributing)

---

## 🌍 Overview

AgriSense is a full-stack web application designed to modernize agriculture through technology. Farmers can connect **ESP32 IoT sensors** to monitor soil conditions in real time, upload soil/seed images for **AI-powered analysis**, and receive personalized feedback from **certified agricultural experts**.

The platform is designed with the future in mind — every data point collected today (images, sensor readings, expert reviews) is structured to train a custom machine learning model tomorrow.

---

## ✨ Features

| Feature | Guest Farmer | Registered Farmer | Expert | Admin |
|---|:---:|:---:|:---:|:---:|
| Upload soil/seed images | ✅ | ✅ | — | — |
| View mock AI prediction | ✅ | ✅ | — | — |
| Register ESP32 sensor | ❌ | ✅ | — | — |
| Live sensor data dashboard | ❌ | ✅ | — | — |
| Analysis history | ❌ | ✅ | — | — |
| Expert inbox / notifications | ❌ | ✅ | — | — |
| Review farmer requests | — | — | ✅ | — |
| Send personalized advice | — | — | ✅ | — |
| Manage all users | — | — | — | ✅ |
| Broadcast system notices | — | — | — | ✅ |
| View all historical data | — | — | — | ✅ |

---

## 🛠 Tech Stack

**Frontend**
- [React.js](https://react.dev/) (bootstrapped with Vite)
- [Tailwind CSS](https://tailwindcss.com/) for utility-first styling
- [Recharts](https://recharts.org/) for live sensor data graphs
- Axios for API communication

**Backend**
- [Node.js](https://nodejs.org/) + [Express.js](https://expressjs.com/) (RESTful API)
- [JWT](https://jwt.io/) for stateless authentication
- [bcrypt](https://www.npmjs.com/package/bcrypt) for password hashing
- [Multer](https://www.npmjs.com/package/multer) for image file uploads

**Database**
- [MySQL](https://www.mysql.com/) — relational, structured, and perfect for sensor time-series data

**Hardware**
- [ESP32](https://www.espressif.com/en/products/socs/esp32) microcontroller (C++ firmware)
- Sends JSON payloads via HTTP POST to the Node.js backend over Wi-Fi

---

## 🏗 System Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                        CLIENT LAYER                          │
│              React.js + Vite + Tailwind CSS                  │
│    [ Home ] [ Login ] [ Dashboard ] [ Analysis ] [ Admin ]   │
└──────────────────────┬──────────────────────────────────────┘
                       │  HTTP / REST API
┌──────────────────────▼──────────────────────────────────────┐
│                       API LAYER                              │
│               Node.js + Express.js Server                    │
│  /api/auth   /api/sensor   /api/analysis   /api/admin        │
│  JWT Middleware · Role Guard · Multer (File Uploads)         │
└──────────┬───────────────────────────────┬──────────────────┘
           │                               │
┌──────────▼──────────┐       ┌────────────▼──────────────────┐
│    MySQL Database    │       │         Hardware Layer         │
│  users · sensors    │       │   ESP32 Microcontroller (IoT)  │
│  sensor_readings    │       │   Wi-Fi → POST /api/sensor/data│
│  analyses · notices │       │   Reads: moisture, pH, N/P/K   │
└─────────────────────┘       └────────────────────────────────┘
```

---

## 👥 User Roles

### 🌾 Guest Farmer
A visitor with no account. Can upload a soil or seed image and receive a **mock AI prediction** instantly. Their data is saved anonymously to help train the future AI model. They are prompted to sign up to unlock sensors, history, and expert feedback.

### 🧑‍🌾 Registered Farmer
A logged-in farmer with a personal dashboard. They can:
- Register their **ESP32 sensor** by MAC address
- View **live charts** of moisture, pH, nitrogen, temperature, and more
- Upload images and have them **bundled with the latest sensor reading** for a complete analysis record
- Receive expert feedback and admin notices via an in-app inbox

### 🔬 Agriculture Expert
A verified expert who reviews farmer submissions. They:
- See a queue of pending analysis requests
- Review the farmer's image, mock AI result, and live sensor data from that moment
- Write and submit personalized advice, which instantly appears on the farmer's dashboard
- Their verified reviews are flagged for future AI model training

### 🛡 Admin
Full platform oversight. Can manage all users, delete/suspend accounts, view all historical data, and broadcast notices to individual users or the entire platform.

---

## 🗄 Database Schema

<details>
<summary><strong>Click to expand full schema</strong></summary>

### `users`
```sql
CREATE TABLE users (
    id           VARCHAR(36) DEFAULT (UUID()) PRIMARY KEY,
    full_name    VARCHAR(100) NOT NULL,
    email        VARCHAR(150) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    role         ENUM('admin', 'farmer', 'expert') NOT NULL,
    created_at   TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### `sensors`
```sql
CREATE TABLE sensors (
    id                VARCHAR(36) PRIMARY KEY,
    esp32_mac_address VARCHAR(17) UNIQUE NOT NULL,
    farmer_id         CHAR(36) NOT NULL,
    status            ENUM('active','inactive','maintenance') DEFAULT 'active',
    latitude          DECIMAL(10,8),
    longitude         DECIMAL(11,8),
    created_at        TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (farmer_id) REFERENCES users(id) ON DELETE CASCADE
);
```

### `sensor_readings`
```sql
CREATE TABLE sensor_readings (
    id            BIGINT AUTO_INCREMENT PRIMARY KEY,
    sensor_id     CHAR(36) NOT NULL,
    moisture_level DECIMAL(5,2) NOT NULL,
    temperature   DECIMAL(5,2) NOT NULL,
    ph_level      DECIMAL(4,2) NOT NULL,
    nitrogen      DECIMAL(6,2),
    phosphorus    DECIMAL(6,2),
    potassium     DECIMAL(6,2),
    recorded_at   TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (sensor_id) REFERENCES sensors(id) ON DELETE CASCADE
);
CREATE INDEX idx_sensor_time ON sensor_readings(sensor_id, recorded_at DESC);
```

### `analyses` *(The AI Goldmine)*
```sql
CREATE TABLE analyses (
    id                      VARCHAR(36) DEFAULT (UUID()) PRIMARY KEY,
    farmer_id               VARCHAR(36),
    type                    ENUM('soil', 'seed') NOT NULL,
    image_url               VARCHAR(500) NOT NULL,
    sensor_reading_id       VARCHAR(36),
    ai_prediction           TEXT NOT NULL,
    expert_id               VARCHAR(36),
    expert_feedback         TEXT,
    is_verified_for_training BOOLEAN DEFAULT FALSE,
    created_at              TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (farmer_id)         REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (sensor_reading_id) REFERENCES sensor_readings(id) ON DELETE SET NULL,
    FOREIGN KEY (expert_id)         REFERENCES users(id) ON DELETE SET NULL
);
```

### `notices`
```sql
CREATE TABLE notices (
    id              VARCHAR(36) DEFAULT (UUID()) PRIMARY KEY,
    admin_id        VARCHAR(36),
    title           VARCHAR(150) NOT NULL,
    message         TEXT NOT NULL,
    target_audience ENUM('admin', 'farmer', 'expert'),
    created_at      TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (admin_id) REFERENCES users(id) ON DELETE CASCADE
);
```

</details>

---

## 📁 Project Structure

```
AgriSense_Project/
│
├── frontend/                        # React (Vite) App
│   ├── src/
│   │   ├── assets/                  # Images, logos, icons
│   │   ├── components/              # Reusable UI (Navbar, Footer, Cards, Buttons)
│   │   ├── pages/                   # Page layouts
│   │   │   ├── Home.jsx             # Landing page
│   │   │   ├── Login.jsx
│   │   │   ├── Register.jsx
│   │   │   ├── FarmerDashboard.jsx
│   │   │   ├── ExpertDashboard.jsx
│   │   │   └── AdminDashboard.jsx
│   │   ├── context/
│   │   │   └── AuthContext.jsx      # Global login state management
│   │   ├── services/
│   │   │   └── api.js               # Axios API calls to backend
│   │   └── App.jsx                  # Main routing (React Router)
│   └── package.json
│
└── backend/                         # Node.js + Express App
    ├── src/
    │   ├── config/
    │   │   └── db.js                # MySQL connection pool
    │   ├── controllers/
    │   │   ├── authController.js    # Login, register logic
    │   │   ├── sensorController.js  # Receive & query sensor data
    │   │   └── analysisController.js# Image upload, mock AI, expert review
    │   ├── middlewares/
    │   │   ├── verifyToken.js       # JWT authentication guard
    │   │   └── checkRole.js         # Role-based access control
    │   ├── models/                  # Raw SQL query functions
    │   ├── routes/
    │   │   ├── auth.js              # POST /api/auth/login|register
    │   │   ├── sensor.js            # POST /api/sensor/data, GET /api/sensor/:id
    │   │   ├── analysis.js          # POST /api/analysis/upload
    │   │   └── admin.js             # GET/DELETE /api/admin/users
    │   └── server.js                # Express entry point
    └── package.json
```

---

## 🚀 Getting Started

### Prerequisites
- Node.js >= 18.x
- MySQL >= 8.x
- npm or yarn

### 1. Clone the repository
```bash
git clone https://github.com/Shabbir-369/AgriSense.git
cd AgriSense
```

### 2. Set up the backend
```bash
cd backend
npm install
```

Create a `.env` file in `/backend`:
```env
PORT=5000
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=agrisense_db
JWT_SECRET=your_super_secret_key
```

Initialize the database:
```bash
mysql -u root -p agrisense_db < src/config/schema.sql
```

Start the backend server:
```bash
npm run dev
```

### 3. Set up the frontend
```bash
cd ../frontend
npm install
npm run dev
```

The app will be running at `http://localhost:5173`

### 4. (Optional) Simulate ESP32 data
No hardware? Run this mock sensor script to feed data to your backend:
```bash
node scripts/mockSensor.js
```
It sends a JSON POST request with randomized sensor values every 5 seconds — perfect for testing your charts and database without physical hardware.

---

## 📡 API Endpoints

| Method | Endpoint | Auth | Description |
|---|---|---|---|
| `POST` | `/api/auth/register` | None | Register a new user |
| `POST` | `/api/auth/login` | None | Login and receive JWT |
| `POST` | `/api/sensor/data` | Sensor Token | ESP32 posts a new reading |
| `GET` | `/api/sensor/:farmerId/latest` | Farmer | Get latest sensor reading |
| `POST` | `/api/analysis/upload` | Optional | Upload image for analysis |
| `GET` | `/api/analysis/pending` | Expert | Get unreviewed submissions |
| `PUT` | `/api/analysis/:id/review` | Expert | Submit expert feedback |
| `GET` | `/api/admin/users` | Admin | List all users |
| `DELETE` | `/api/admin/users/:id` | Admin | Delete/suspend a user |
| `POST` | `/api/admin/notice` | Admin | Broadcast a notice |

---

## 🗺 Roadmap

- [x] Project architecture & database design
- [ ] **Phase 1** — Foundation: Vite + Express setup, MySQL connection, static pages
- [ ] **Phase 2** — Authentication: Login/Signup, JWT, role-based routing
- [ ] **Phase 3** — Core Features: Image upload, mock AI, farmer dashboard
- [ ] **Phase 4** — Hardware Integration: ESP32 firmware, live sensor charts
- [ ] **Phase 5** — Interactivity: Expert dashboard, admin panel, notice system
- [ ] **Phase 6** *(Future)* — Real AI model trained on collected expert-verified data
- [ ] **Phase 7** *(Future)* — Mobile app (React Native)

---

## 🤝 Contributing

Contributions, issues, and feature requests are welcome! Feel free to check the [issues page](https://github.com/your-username/AgriSense/issues).

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📄 License

Distributed under the MIT License. See `LICENSE` for more information.

---

<div align="center">

Made with ❤️ for the farming community

*"Technology in the soil, knowledge in the harvest."*

</div>