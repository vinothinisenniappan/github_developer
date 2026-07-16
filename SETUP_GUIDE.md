# GitHub Developer Insights - Setup Guide

## ✅ What's Been Set Up

Your project is now a **pure MERN stack** application with:

### ✨ Tech Stack
- ✅ **Frontend**: React 18 + Vite (JSX only, no TypeScript)
- ✅ **Backend**: Node.js + Express (JavaScript, no TypeScript)
- ✅ **Styling**: Tailwind CSS 3 with custom design system
- ✅ **Charts**: Recharts for data visualization
- ✅ **Icons**: Lucide React
- ✅ **API**: GitHub REST API integration

### 📁 Project Structure

```
github-developer-insights/
├── server/                          # Express Backend (Port 5000)
│   ├── src/server.js               # Main server with API routes
│   ├── package.json                # Backend dependencies
│   └── .env                        # Environment variables
│
├── client/                          # React + Vite Frontend (Port 5173)
│   ├── src/
│   │   ├── App.jsx                 # Main app component
│   │   ├── main.jsx                # Entry point
│   │   ├── globals.css             # Global styles
│   │   ├── pages/
│   │   │   ├── LandingPage.jsx     # Hero section
│   │   │   └── DashboardPage.jsx   # Analytics dashboard
│   │   └── components/             # Reusable components
│   │       ├── ProfileCard.jsx
│   │       ├── StatsCards.jsx
│   │       ├── LanguageChart.jsx
│   │       ├── ActivityChart.jsx
│   │       ├── TopRepositories.jsx
│   │       ├── RepositoriesTable.jsx
│   │       └── ErrorState.jsx
│   ├── index.html
│   ├── vite.config.js
│   ├── tailwind.config.js
│   ├── postcss.config.js
│   └── package.json
│
├── package.json                     # Root scripts
├── README.md                        # Full documentation
└── SETUP_GUIDE.md                  # This file
```

## 🚀 How to Run

### Option 1: Run Both Frontend & Backend Together (Recommended)

```bash
cd /vercel/share/v0-project
pnpm dev
```

This will start:
- **Backend API**: `http://localhost:5000`
- **Frontend UI**: `http://localhost:5173`

The frontend automatically proxies API calls to the backend.

### Option 2: Run Separately

**Backend only**:
```bash
cd server
pnpm dev
# Runs on http://localhost:5000
```

**Frontend only** (in another terminal):
```bash
cd client
pnpm dev
# Runs on http://localhost:5173
```

## 📖 How to Use the App

1. **Open** `http://localhost:5173` in your browser
2. **Search** for a GitHub username (e.g., `torvalds`, `gvanrossum`, `linus`)
3. **View** detailed analytics:
   - Developer profile card
   - Statistics (repos, stars, forks, languages)
   - Language distribution pie chart
   - Repository creation timeline
   - Top repositories by stars
   - Complete searchable/sortable repository table

## 🔧 Customization

### Add a GitHub Token (Optional)

For higher API rate limits, add your GitHub Personal Access Token:

1. Generate token at: https://github.com/settings/tokens
2. Edit `server/.env`:
   ```
   PORT=5000
   GITHUB_TOKEN=ghp_xxxxxxxxxxxxxxxxxxxx
   ```

### Customize Design

Edit `client/tailwind.config.js` to change colors:

```javascript
theme: {
  extend: {
    colors: {
      primary: '#0366d6',        // GitHub Blue
      secondary: '#6f42c1',      // Purple
      accent: '#28a745',         // Green
      // ... more colors
    }
  }
}
```

### Modify Components

All React components are in `client/src/components/`:
- Edit `.jsx` files directly
- Hot reload automatically applies changes
- No TypeScript required - pure JSX

## 📚 API Routes

### `/api/health`
Health check endpoint.

### `/api/developer/:username`
Get complete developer profile and analytics.

```javascript
// Example fetch
const data = await fetch('/api/developer/torvalds').then(r => r.json());
// Returns: { profile, repos, stats }
```

### `/api/repositories/:username?page=1`
Get paginated repositories.

## 🔐 What's Included

✅ CORS enabled for frontend-backend communication
✅ Professional error handling
✅ Loading states on frontend
✅ Responsive design (mobile, tablet, desktop)
✅ GitHub API rate limiting handled
✅ No TypeScript - pure JSX/JS only
✅ Tailwind CSS with custom design system
✅ Data visualization with Recharts

## 📦 No External Databases

This MVP doesn't include MongoDB because:
- ✅ We only analyze **public GitHub data**
- ✅ No user data needs to be stored
- ✅ Simpler deployment & fewer dependencies
- ✅ Faster setup & development

**To add MongoDB later**: Update `server/package.json` and add connection logic.

## 🚢 Deployment

### Frontend Deployment (Vercel/Netlify)
```bash
pnpm build:client
# Deploy the client/dist folder
```

### Backend Deployment (Railway/Render)
```bash
pnpm build:server
# Deploy with `pnpm start` as the start command
```

## 📝 Important Notes

### Pure MERN (No TypeScript)
- ✅ All code is JSX/JS only
- ✅ No `.tsx` or `.ts` files in the app logic
- ✅ Use JSDoc comments for documentation if needed

### Frontend Architecture
- ✅ React 18 with hooks
- ✅ No external state management (kept simple)
- ✅ Component-based structure
- ✅ Responsive with Tailwind CSS

### Backend Architecture
- ✅ Express.js REST API
- ✅ Axios for GitHub API calls
- ✅ Modular route structure
- ✅ Error handling middleware

## 🆘 Troubleshooting

### Port Already in Use
```bash
# Kill the process using port 5000 or 5173
# Linux/Mac:
lsof -i :5000
kill -9 <PID>

# Windows:
netstat -ano | findstr :5000
taskkill /PID <PID> /F
```

### GitHub API Rate Limit Exceeded
- Add a GitHub token to `server/.env`
- Or wait 1 hour for the rate limit to reset

### Frontend Can't Connect to Backend
- Make sure both servers are running
- Check `client/vite.config.js` proxy settings
- Verify `http://localhost:5000` is accessible

## ✨ Features to Explore

- 🔍 Search any GitHub username
- 📊 View language distribution
- 📈 See repository timeline
- ⭐ Find top repositories by stars
- 🔗 Direct links to GitHub profiles
- 📄 Sortable/searchable repository table
- 📱 Fully responsive design

## 🎯 Next Steps

1. **Run the app**: `pnpm dev`
2. **Test it**: Search for popular developers
3. **Customize**: Modify colors, add features
4. **Deploy**: Push to GitHub and deploy to Vercel/Railway

## 💡 Tips

- Components are small and focused - easy to modify
- All styling uses Tailwind classes - no need for CSS files
- API integration is straightforward with Axios
- Charts use Recharts - easy to extend
- No build complexity - Vite is fast!

---

**Happy coding! 🚀 Your pure MERN stack is ready to go!**

For full documentation, see `README.md`.
