# Board-Based To-Do Application

A production-ready, full-stack task management web application with board-based organization. Built with React, Node.js, Express, MongoDB, and Firebase Authentication.

## 🎯 Features

### Authentication
- **Email & Password Authentication** - Secure signup and login
- **Google OAuth** - One-click authentication with Google
- **Email Verification** - Required email verification before access
- **Backend Token Verification** - Firebase Admin SDK validates all requests

### Board Management
- Create, rename, and delete boards
- Each board belongs to a specific user
- Boards are displayed in chronological order
- Inline editing for board names

### Todo Management
- Create, update, and delete todos within boards
- Mark todos as completed/incomplete
- Add optional descriptions to todos
- Real-time UI updates without page reloads
- Todos are organized by board

### Responsive Design
- **Mobile-first approach** - Optimized for all screen sizes
- **Breakpoints:**
  - Mobile: < 768px
  - Tablet: 768px - 1024px
  - Desktop: > 1024px
- Collapsible sidebar on mobile devices
- Touch-friendly buttons (minimum 44px)
- No horizontal scrolling
- Smooth transitions and animations

## 🛠 Tech Stack

### Frontend
- **React.js** - UI library
- **Vite** - Build tool and dev server
- **React Router** - Client-side routing
- **Firebase SDK** - Client authentication
- **Axios** - HTTP client
- **Vanilla CSS** - Responsive styling

### Backend
- **Node.js** - Runtime environment
- **Express** - Web framework
- **MongoDB** - Database
- **Mongoose** - ODM for MongoDB
- **Firebase Admin SDK** - Token verification
- **CORS** - Cross-origin resource sharing

## 📁 Project Structure

```
board-todo-app/
├── backend/
│   ├── src/
│   │   ├── config/
│   │   │   ├── db.js                 # MongoDB connection
│   │   │   └── firebase.js           # Firebase Admin SDK
│   │   ├── middleware/
│   │   │   └── auth.js               # Authentication middleware
│   │   ├── models/
│   │   │   ├── User.js               # User schema
│   │   │   ├── Board.js              # Board schema
│   │   │   └── Todo.js               # Todo schema
│   │   ├── routes/
│   │   │   ├── auth.js               # Auth endpoints
│   │   │   ├── boards.js             # Board CRUD
│   │   │   └── todos.js              # Todo CRUD
│   │   └── server.js                 # Express app entry
│   ├── .env.example
│   ├── .gitignore
│   └── package.json
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Auth/                 # Login, Signup, Verification
│   │   │   ├── Boards/               # Board management
│   │   │   ├── Todos/                # Todo management
│   │   │   ├── Layout/               # Header, Sidebar, MainLayout
│   │   │   └── PrivateRoute.jsx      # Route protection
│   │   ├── config/
│   │   │   └── firebase.js           # Firebase client config
│   │   ├── services/
│   │   │   └── api.js                # API client
│   │   ├── context/
│   │   │   └── AuthContext.jsx       # Auth state management
│   │   ├── App.jsx                   # Main app component
│   │   ├── App.css                   # Styles
│   │   └── main.jsx                  # React entry point
│   ├── index.html
│   ├── .env.example
│   ├── .gitignore
│   ├── package.json
│   └── vite.config.js
│
└── README.md
```

## 🔐 Authentication Flow

1. **User Signup/Login** - User authenticates via Firebase (email/password or Google OAuth)
2. **Email Verification** - Email verification required for email/password signups
3. **Token Generation** - Firebase generates ID token on client
4. **Token Transmission** - Token sent with each API request in Authorization header
5. **Backend Verification** - Firebase Admin SDK verifies token
6. **User Creation** - User document created/retrieved in MongoDB
7. **Request Processing** - Authenticated requests access user-specific data

## 🚀 Setup Instructions

### Prerequisites
- Node.js (v18 or higher)
- MongoDB (local installation or MongoDB Atlas account)
- Firebase project with Authentication enabled

### Firebase Setup

1. **Create Firebase Project**
   - Go to [Firebase Console](https://console.firebase.google.com/)
   - Create a new project
   - Enable Authentication (Email/Password and Google providers)

2. **Get Web Config**
   - Project Settings → General → Your apps → Web app
   - Copy the config object (for frontend)

3. **Get Service Account**
   - Project Settings → Service Accounts
   - Click "Generate New Private Key"
   - Save the JSON file (for backend)

### Backend Setup

1. **Navigate to backend directory**
   ```bash
   cd backend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure environment variables**
   ```bash
   cp .env.example .env
   ```

4. **Edit `.env` file**
   ```env
   MONGODB_URI=mongodb://localhost:27017/board-todo-app
   PORT=5000
   FIREBASE_SERVICE_ACCOUNT_PATH=./firebase-service-account.json
   FRONTEND_URL=http://localhost:5173
   ```

5. **Place Firebase Service Account JSON**
   - Copy the downloaded JSON file to `backend/firebase-service-account.json`

6. **Start MongoDB**
   - Local: `mongod` or start MongoDB service
   - Atlas: Use connection string in `.env`

7. **Run the server**
   ```bash
   # Development mode (with auto-reload)
   npm run dev

   # Production mode
   npm start
   ```

   Server will run on `http://localhost:5000`

### Frontend Setup

1. **Navigate to frontend directory**
   ```bash
   cd frontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure environment variables**
   ```bash
   cp .env.example .env
   ```

4. **Edit `.env` file with Firebase config**
   ```env
   VITE_FIREBASE_API_KEY=your_api_key
   VITE_FIREBASE_AUTH_DOMAIN=your_project_id.firebaseapp.com
   VITE_FIREBASE_PROJECT_ID=your_project_id
   VITE_FIREBASE_STORAGE_BUCKET=your_project_id.appspot.com
   VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
   VITE_FIREBASE_APP_ID=your_app_id
   VITE_API_URL=http://localhost:5000/api
   ```

5. **Run the development server**
   ```bash
   npm run dev
   ```

   App will run on `http://localhost:5173`

6. **Build for production**
   ```bash
   npm run build
   ```

## 📡 API Endpoints

### Authentication

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/api/auth/verify` | Verify Firebase token and create/get user | Yes |
| GET | `/api/auth/me` | Get current user info | Yes |

### Boards

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | `/api/boards` | Get all boards for current user | Yes |
| POST | `/api/boards` | Create new board | Yes |
| PUT | `/api/boards/:id` | Update board name | Yes |
| DELETE | `/api/boards/:id` | Delete board and all its todos | Yes |

### Todos

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | `/api/boards/:boardId/todos` | Get all todos for a board | Yes |
| POST | `/api/boards/:boardId/todos` | Create new todo in board | Yes |
| PUT | `/api/todos/:id` | Update todo (title, description, completed) | Yes |
| DELETE | `/api/todos/:id` | Delete todo | Yes |

### Request/Response Examples

**Create Board**
```bash
POST /api/boards
Authorization: Bearer <firebase-token>
Content-Type: application/json

{
  "name": "Work Tasks"
}

Response:
{
  "board": {
    "_id": "...",
    "name": "Work Tasks",
    "userId": "...",
    "createdAt": "...",
    "updatedAt": "..."
  }
}
```

**Create Todo**
```bash
POST /api/boards/:boardId/todos
Authorization: Bearer <firebase-token>
Content-Type: application/json

{
  "title": "Complete project",
  "description": "Finish the board-todo app"
}

Response:
{
  "todo": {
    "_id": "...",
    "title": "Complete project",
    "description": "Finish the board-todo app",
    "completed": false,
    "boardId": "...",
    "createdAt": "...",
    "updatedAt": "..."
  }
}
```

## 📱 Responsive Design Notes

### Mobile (< 768px)
- Sidebar becomes a slide-out drawer
- Hamburger menu toggle in header
- Full-width content area
- Touch-friendly buttons (44px minimum)
- Actions always visible (no hover required)

### Tablet (768px - 1024px)
- Sidebar remains visible
- Optimized spacing and typography
- User email hidden in header

### Desktop (> 1024px)
- Full sidebar with all features
- Maximum content width for readability
- Hover states for interactive elements
- User email displayed in header

## 🎨 Design Philosophy

- **Minimal & Clean** - Focus on content, not decoration
- **Modern Aesthetics** - Subtle shadows, smooth transitions
- **Accessibility** - Touch-friendly, keyboard navigable
- **Performance** - Optimized rendering, lazy loading
- **Consistency** - Unified design language throughout

## 🔒 Security Features

- Firebase Authentication with email verification
- Backend token validation on every request
- User-specific data isolation
- CORS configuration for frontend-only access
- Secure environment variable management
- No sensitive data in client code

## 🧪 Testing the Application

1. **Sign up** with email and password
2. **Verify email** via link sent to inbox
3. **Log in** to access the application
4. **Create boards** to organize tasks
5. **Add todos** to boards with titles and descriptions
6. **Mark todos** as complete/incomplete
7. **Edit/Delete** boards and todos
8. **Test responsive design** by resizing browser
9. **Try Google OAuth** for quick authentication
10. **Log out** and log back in to verify persistence

## 🚀 Live Demo

🔗 https://to-do-web-app-91xx.onrender.com/

## 📝 Development Notes

- **No Tutorial Code** - All code written from scratch
- **Modular Architecture** - Clean separation of concerns
- **Scalable Structure** - Easy to extend with new features
- **Production Ready** - Error handling, validation, security
- **Interview Quality** - Clean, readable, well-documented code

## 🚧 Future Enhancements

- Drag-and-drop todo reordering
- Board sharing and collaboration
- Due dates and reminders
- Todo categories/tags
- Dark mode support
- Progressive Web App (PWA)
- Real-time updates with WebSockets

## 📄 License

This project is created for educational and portfolio purposes.

## 👤 Author

YASH GUPTA

---




