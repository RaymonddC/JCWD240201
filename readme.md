# 🏥 Medicore - Online Pharmacy Platform

An end-to-end e-commerce solution for pharmacies featuring prescription management, secure payments, and real-time inventory tracking. Built with React, Node.js, and PostgreSQL.

![Medicore Dashboard](screenshots/dashboard.png)

## 🌟 Features

### User Features

- 🔒 Authentication with JWT & Google Sign In
- 📱 Responsive design for all devices
- 🛒 Shopping cart management
- 💊 Prescription upload and tracking
- 📍 Multiple address management
- 💳 Secure payment integration (Midtrans)
- 🚚 Order tracking
- ❓ Q&A discussion forum

### Admin Features

- 📊 Sales & inventory dashboard
- 🏷️ Product management
- 👨‍⚕️ Prescription verification
- 📦 Order management
- 📝 Transaction reports

## 🛠️ Technical Stack

### Frontend

- React 18 with Redux Toolkit for state management
- TailwindCSS & DaisyUI for responsive UI
- Formik & Yup for form validation
- Chart.js for analytics visualization

### Backend

- Node.js/Express REST API
- PostgreSQL with Sequelize ORM
- JWT & Firebase authentication
- PM2 process manager

### DevOps

- GitHub Actions CI/CD
- Vercel (Frontend hosting)
- Render (Backend hosting)
- Supabase (Database)

### Third Party Services

- Google reCAPTCHA v3
- Midtrans Payment Gateway
- Firebase Authentication
- RajaOngkir Shipping API
- Nodemailer

## 🚀 Getting Started

### Prerequisites

```bash
# Clone the repository
git clone https://github.com/yourusername/medicore.git

# Install dependencies
npm install

# Setup environment variables
# Frontend (.env)
REACT_APP_API_BASE_URL=your_api_url
REACT_APP_FIREBASE_API_KEY=your_firebase_key
REACT_APP_MIDTRANS_CLIENT_KEY=your_midtrans_key
REACT_APP_RECAPTCHA_SITE_KEY=your_recaptcha_key

# Backend (.env)
DATABASE_URL=your_supabase_url
MIDTRANS_SERVER_KEY=your_midtrans_server_key
RECAPTCHA_SECRET_KEY=your_recaptcha_secret
```

### Migration

```bash
cd projects/server
npx sequelize-cli db:migrate
npx sequelize-cli db:seed:all
```

## ⚡ Quick Start

```bash
# Clone repository
git clone https://github.com/RaymonddC/JCWD240201

# Install dependencies (root, client, server)
npm run install

# Set up environment variables
cp .env.example .env

# Start development servers
npm run start
```

## 📦 Project Structure

```markdown
medicore/
├── projects/
│ ├── client/ # React frontend
│ │ ├── src/
│ │ └── public/
│ └── server/ # Express backend
│ ├── src/
│ └── migrations/
├── package.json
└── README.md
```

## 📦 Deployment

- Frontend: Deployed on Vercel
- Backend: Deployed on Render
- Database: Hosted on Supabase

## 🔐 Security Features

Google reCAPTCHA v3

- Protects forms from spam and abuse
- Invisible to users
- Score-based verification

Google Sign In

- Secure OAuth2 authentication
- One-click login/signup
- Profile information syncing

Midtrans Payment Gateway

- Multiple payment methods
- Secure transaction handling
- Real-time payment status
- Sandbox testing environment

## 🌐 Live Demo

- Frontend: https://medicore-client.vercel.app
- Backend: https://medicore-0klv.onrender.com

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📧 Contact

Raymond - raymondchrisandy@gmail.com

Project Link: https://github.com/RaymonddC/JCWD240201
