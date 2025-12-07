# HabitFlow AI - MERN Stack Habit Tracker

A comprehensive habit tracking application with AI-powered insights using React 19, Node.js, Express, MongoDB, and Gemini AI.

## Features

- **Authentication**: JWT-based login/register system with password hashing
- **Habit Management**: Full CRUD operations with priority levels (low/medium/high)
- **Streak Tracking**: Automatic streak calculation based on completion dates
- **Dashboard**: Visual analytics with weekly and monthly bar charts
- **AI Insights**: Personalized recommendations using Gemini AI (with mock fallback)
- **Responsive Design**: Mobile-friendly with collapsible hamburger menu
- **Optimistic UI**: Instant feedback on habit completion
- **Priority System**: Sort and display habits by priority level
- **Category System**: Organize habits by health, productivity, mindfulness, learning

## Tech Stack

### Backend
- Node.js & Express.js
- MongoDB with Mongoose
- JWT Authentication
- bcryptjs for password hashing
- Google Generative AI SDK (Gemini)

### Frontend
- React 19 with Vite
- React Router DOM v6
- Tailwind CSS v4 with Vite plugin
- Recharts for data visualization
- Lucide React for icons
- Axios for API calls

## Prerequisites

- Node.js (v18+)
- MongoDB Atlas account or local MongoDB
- Gemini API key (optional - app works with mock data)

## Installation

### 1. Clone Repository
```bash
git clone <repository-url>
cd HAbittraCK
```

### 2. Backend Setup

```bash
cd backend
npm install
```

Create/Update `.env` file:
```env
PORT=5000
MONGO_URI=mongodb+srv://RaviTeja:<YOUR_PASSWORD>@cluster0.dc4gbcu.mongodb.net/?appName=Cluster0
JWT_SECRET=secret
GEMINI_API_KEY=<YOUR_GEMINI_API_KEY>
```

Seed demo data (optional):
```bash
npm run seed
```

Start backend server:
```bash
npm run dev
```

Server runs on `http://localhost:5000`

### 3. Frontend Setup

```bash
cd frontend
npm install
```

Start frontend:
```bash
npm run dev
```

Frontend runs on `http://localhost:3000`

## Demo Credentials

After running seed script:
- **Email**: demo@example.com
- **Password**: password123

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user

### Habits (Protected)
- `GET /api/habits` - Get all user habits
- `POST /api/habits` - Create new habit
- `PUT /api/habits/:id` - Update habit
- `DELETE /api/habits/:id` - Delete habit
- `POST /api/habits/:id/toggle` - Toggle habit completion

### AI (Protected)
- `GET /api/ai/insights` - Get AI-generated insights (with mock fallback)

## Project Structure

```
HAbittraCK/
├── backend/
│   ├── config/
│   │   └── db.js                 # MongoDB connection
│   ├── controllers/
│   │   ├── authController.js     # Auth logic
│   │   ├── habitController.js    # Habit CRUD + streak logic
│   │   └── aiController.js       # AI insights with fallback
│   ├── middleware/
│   │   └── auth.js               # JWT verification
│   ├── models/
│   │   ├── User.js               # User schema with password hashing
│   │   └── Habit.js              # Habit schema with priority
│   ├── routes/
│   │   ├── authRoutes.js
│   │   ├── habitRoutes.js
│   │   └── aiRoutes.js
│   ├── services/
│   │   └── aiService.js          # Gemini AI configuration
│   ├── .env
│   ├── package.json
│   ├── seed.js                   # Demo data seeder
│   └── server.js                 # Express app entry
│
└── frontend/
    ├── src/
    │   ├── components/
    │   │   ├── HabitCard.jsx     # Habit display with priority badge
    │   │   ├── HabitModal.jsx    # Add/Edit habit form
    │   │   ├── ProtectedRoute.jsx # Auth guard
    │   │   ├── Sidebar.jsx       # Responsive navigation
    │   │   └── StatCard.jsx      # Dashboard metric cards
    │   ├── contexts/
    │   │   ├── AuthContext.jsx   # Auth state management
    │   │   └── ToastContext.jsx  # Notification system
    │   ├── pages/
    │   │   ├── Dashboard.jsx     # Stats + weekly/monthly charts
    │   │   ├── Habits.jsx        # Habit CRUD with optimistic UI
    │   │   ├── Insights.jsx      # AI analysis page
    │   │   ├── Login.jsx
    │   │   └── Register.jsx
    │   ├── services/
    │   │   └── api.js            # Axios API client
    │   ├── utils/
    │   │   └── helpers.js        # Date/streak calculations
    │   ├── App.jsx               # Router setup
    │   ├── main.jsx              # React entry
    │   └── index.css             # Tailwind imports
    ├── index.html
    ├── package.json
    ├── vite.config.js
    └── postcss.config.js
```

## Key Features Explained

### Streak Tracking
Automatically calculates consecutive completion days. Streak resets if habit is not completed today or yesterday.

### Priority System
- **High**: Red badge, displayed first
- **Medium**: Yellow badge, displayed second
- **Low**: Gray badge, displayed last

### Charts
- **Weekly View**: Last 7 days with day names
- **Monthly View**: Current month (1-31) showing only past dates

### AI Insights
- Fetches from Gemini API when available
- Falls back to mock data on rate limit/errors
- Provides analysis, suggestions, quote, and focus area

### Optimistic UI
Habit completion updates immediately in UI before server confirmation for better UX.

## Environment Variables

### Backend
- `PORT` - Server port (default: 5000)
- `MONGO_URI` - MongoDB connection string
- `JWT_SECRET` - Secret for JWT signing
- `GEMINI_API_KEY` - Google Gemini API key (optional)

## Scripts

### Backend
```bash
npm start       
npm run dev     
npm run seed    # Sample Data
```

### Frontend
```bash
npm run dev
```

## Troubleshooting

### Gemini API Rate Limit
The app automatically falls back to mock insights. To fix:
1. Get new API key from https://aistudio.google.com/app/apikey
2. Update `GEMINI_API_KEY` in `.env`
3. Restart backend server

### MongoDB Connection Error
- Verify `MONGO_URI` in `.env`
- Check MongoDB Atlas IP whitelist
- Ensure password doesn't contain special characters

### Port Already in Use
Change `PORT` in backend `.env` or kill process using the port.

## License

MIT

## Author

Built as a comprehensive MERN stack demonstration project.
