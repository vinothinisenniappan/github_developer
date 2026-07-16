# GitHub Developer Insights

A professional, responsive full-stack web application for analyzing public GitHub profiles with meaningful analytics. Built with pure **MERN stack** using JSX/JS (no TypeScript).

## 🏗️ Architecture

This is a **pure MERN project** with:
- **Frontend**: React 18 + Vite + Tailwind CSS (JSX)
- **Backend**: Node.js + Express (JavaScript)
- **Database**: Optional MongoDB (for future enhancements)
- **API**: GitHub REST API integration

## ✨ Features

### Landing Page
- Hero section with GitHub Developer Insights branding
- Centered search box to enter GitHub username
- Information cards about analytics capabilities
- Suggestion examples (torvalds, gvanrossum, etc.)

### Developer Dashboard
- **Profile Card**: Avatar, name, bio, company, location, followers/following metrics
- **Statistics**: Total repositories, stars, forks, and unique languages used
- **Language Distribution**: Interactive pie chart showing programming language breakdown
- **Activity Timeline**: Bar chart of repositories created by year
- **Top Repositories**: Showcase of top 5 repositories by stars with descriptions
- **Repositories Table**: 
  - Searchable and sortable (by stars or last updated)
  - Pagination (10 repositories per page)
  - Language badges
  - Direct GitHub links

### Professional Design
- Clean, minimal interface inspired by GitHub, Vercel, and Stripe
- Professional light theme with blue accent color
- Smooth animations and hover effects
- Fully responsive (desktop, tablet, mobile)
- Loading states with skeleton loaders
- Error handling with friendly messages

## 🚀 Quick Start

### Prerequisites
- Node.js 16+ and pnpm installed

### Installation

1. **Install root dependencies**:
   ```bash
   pnpm install
   ```

2. **Setup Environment Variables**:
   
   Create `server/.env`:
   ```
   PORT=5000
   # Optional: Add GitHub token for higher API rate limits
   # GITHUB_TOKEN=your_github_personal_token
   ```

### Development

Run both frontend and backend concurrently:
```bash
pnpm dev
```

This will start:
- **Backend**: http://localhost:5000
- **Frontend**: http://localhost:5173

The frontend will automatically proxy API calls to the backend.

### Individual Commands

**Backend only**:
```bash
cd server && npm run dev
```

**Frontend only**:
```bash
cd client && npm run dev
```

## 📁 Project Structure

```
github-developer-insights/
├── server/                      # Express backend
│   ├── src/
│   │   └── server.js           # Main server file with API routes
│   ├── .env                    # Environment variables
│   └── package.json
│
├── client/                      # React + Vite frontend
│   ├── src/
│   │   ├── App.jsx             # Main app component
│   │   ├── main.jsx            # Entry point
│   │   ├── globals.css         # Global styles + Tailwind
│   │   ├── pages/
│   │   │   ├── LandingPage.jsx    # Hero & search
│   │   │   └── DashboardPage.jsx  # Analytics dashboard
│   │   └── components/
│   │       ├── ProfileCard.jsx       # Developer profile
│   │       ├── StatsCards.jsx        # Key metrics
│   │       ├── LanguageChart.jsx     # Pie chart
│   │       ├── ActivityChart.jsx     # Bar chart
│   │       ├── TopRepositories.jsx   # Top 5 repos
│   │       ├── RepositoriesTable.jsx # Full table
│   │       └── ErrorState.jsx        # Error display
│   ├── index.html
│   ├── vite.config.js
│   ├── tailwind.config.js
│   ├── postcss.config.js
│   └── package.json
│
├── package.json                 # Root package with scripts
├── .gitignore
└── README.md
```

## 🔌 API Endpoints

### Backend Routes

**GET `/api/health`**
- Health check endpoint

**GET `/api/developer/:username`**
- Returns complete developer profile and analytics
- Parameters:
  - `username` (string): GitHub username
- Response includes:
  - User profile data
  - All repositories with statistics
  - Calculated statistics (total stars, forks, languages, etc.)

**GET `/api/repositories/:username`**
- Returns paginated repositories
- Query parameters:
  - `page` (number): Page number (default: 1)
  - `sortBy` (string): Sort field - "updated" or "stars" (default: "updated")

## 📊 Statistics Calculation

The backend aggregates:
- **Total Stars**: Sum of all repository stars
- **Total Forks**: Sum of all repository forks
- **Language Distribution**: Count and percentage of each programming language
- **Creation Timeline**: Repositories grouped by year
- **Top Languages**: Top 10 languages by repository count
- **Average Metrics**: Average stars and forks per repository

## 🎨 Design System

### Color Palette
- **Primary**: `#0366d6` (GitHub Blue)
- **Secondary**: `#6f42c1` (Purple)
- **Accent**: `#28a745` (Green)
- **Background**: `#ffffff`
- **Surface**: `#f6f8fa` (Light Gray)
- **Border**: `#e1e4e8` (Border Gray)
- **Text Primary**: `#24292e` (Dark Gray)
- **Text Secondary**: `#586069` (Medium Gray)

### Component Classes
- `.card` - Rounded containers with shadows
- `.btn-primary` - Blue action buttons
- `.btn-secondary` - Secondary buttons
- `.input` - Form inputs with focus states
- `.badge` - Inline labels and tags

## 🔐 Security & Best Practices

- ✅ CORS enabled for frontend-backend communication
- ✅ GitHub API authenticated (optional token for higher rate limits)
- ✅ No sensitive data exposed to frontend
- ✅ Error handling on both client and server
- ✅ Only public GitHub data accessed
- ✅ Rate limiting friendly (handles GitHub API limits gracefully)

## 📦 Dependencies

### Backend
- **express**: Web framework
- **cors**: Cross-origin resource sharing
- **axios**: HTTP client for GitHub API
- **dotenv**: Environment variable management

### Frontend
- **react**: UI library
- **recharts**: Charts and visualization
- **lucide-react**: Icon library
- **tailwindcss**: Utility-first CSS framework
- **vite**: Fast build tool and dev server

## 🚢 Deployment

### Frontend (Vercel/Netlify)
```bash
pnpm build:client
# Deploy the client/dist folder
```

### Backend (Heroku/Railway/Vercel Functions)
```bash
pnpm build:server
# Start with: npm start
```

## 🤝 Contributing

This is a demonstration project. Feel free to fork and enhance with features like:
- User-saved search history
- Dark mode toggle
- PDF export functionality
- Repository filtering by language
- Contribution heatmap visualization
- MongoDB integration for search history

## 📝 License

MIT - Feel free to use this project for learning and reference.

## 🎯 Future Enhancements

- [ ] MongoDB for storing user searches
- [ ] Authentication system
- [ ] Dark mode toggle
- [ ] Export dashboard as PDF
- [ ] Contribution graph scraping
- [ ] Multiple user comparison
- [ ] Advanced filtering and sorting
- [ ] Caching for popular developers

---

**Built with ❤️ using pure MERN stack (JSX/JS only, no TypeScript)**
