# MERN Authentication App ✨
## Demo
[Live Demo](https://mern-auth-ee67.onrender.com/) 


A full-stack authentication application built using the **MERN stack** — MongoDB, Express.js, React, and Node.js. This project demonstrates secure user authentication, and clean integration between backend and frontend.

---

## 🚀 Tech Stack

- **Frontend:** React, Vite, Tailwind CSS
- **Backend:** Node.js, Express.js
- **Database:** MongoDB via Mongoose
- **Authentication:** JWT, bcrypt
- **Media Storage:** Cloudinary(For image upload feature.)
- **State Management:** Redux Toolkit

---

## 🔑 Key Features

- JWT-based authentication with secure token handling
- Protected frontend & backend routes
- Integrated image upload with Cloudinary
- Reusable component architecture
- Responsive and modern UI using Tailwind CSS
- Error handling and form validation

---

## 📸 Screenshots
![image](https://github.com/user-attachments/assets/affa84ca-e6b0-450d-89fd-b2aebfda7ba2)
![image](https://github.com/user-attachments/assets/0cd33275-5386-4bba-a44b-97c114693ed1)


---

## 📂 Folder Structure

```
mern-auth/
|
├── api/                # Express backend
|   ├── controllers/
|   ├── routes/
|   ├── models/
|   ├── utils/
|   └── index.js
|
├── client/             # React frontend
|   ├── src/
|       ├── components/
|       ├── pages/
|       ├── utils/
|         ├── redux/
|       └── main.jsx
|
└── README.md
```

---

## 📅 Environment Variables

### Backend (.env at project root)
```
PORT=3000
MONGO_URI=your_mongo_connection_string
JWT_SECRET=your_jwt_secret
CLOUDINARY_CLOUD_NAME=your_cloudinary_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_secret
```

### Frontend (client/.env)
```
VITE_API_URL=http://localhost:3000
VITE_FIREBASE_API_KEY=your_firebase_key
```

---

## 🚧 Getting Started

### 1. Clone Repository
```bash
git clone https://github.com/Prakashkhadka7/mern-auth.git
cd mern-auth
```

### 2. Install Dependencies
```bash
# Backend
npm install --cwd api

# Frontend
npm install --cwd client
```

### 3. Run Development Servers
```bash
# Start Backend
cd api
npm install
npm run dev

# Start Frontend
cd client
npm install
npm run dev
```

### 4. Build for Production
```bash
# Build Frontend
npm run build --prefix client

# Serve built frontend from backend
node api/index.js
```

---

## 🔗 URLs

- Frontend Dev: `http://localhost:5173`
- Backend/API: `http://localhost:3000`

---


---

## 🚀 Author

Developed by [@Prakashkhadka7](https://github.com/Prakashkhadka7)

