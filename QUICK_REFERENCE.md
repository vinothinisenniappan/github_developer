# GitHub Developer Insights - Quick Reference

## 🚀 Start Here

```bash
# Install everything (already done!)
pnpm install

# Run the app
pnpm dev

# Open browser to http://localhost:5173
```

---

## 📁 File Locations

| What | Where |
|------|-------|
| Backend API | `server/src/server.js` |
| Frontend App | `client/src/App.jsx` |
| Landing Page | `client/src/pages/LandingPage.jsx` |
| Dashboard | `client/src/pages/DashboardPage.jsx` |
| Components | `client/src/components/` |
| Styles | `client/src/globals.css` |
| Tailwind Config | `client/tailwind.config.js` |

---

## 🔧 Commands

```bash
# Development
pnpm dev              # Run both frontend & backend
pnpm run server       # Backend only
pnpm run client       # Frontend only

# Production
pnpm build            # Build both
pnpm build:client     # Frontend only
pnpm build:server     # Backend only
pnpm start            # Run backend in production

# Individual
cd server && pnpm dev
cd client && pnpm dev
```

---

## 🎨 Styling with Tailwind

```jsx
// Use Tailwind classes
<div className="bg-surface rounded-lg p-4 hover:shadow-md">
  <h1 className="text-2xl font-bold text-primary">Hello</h1>
</div>

// Custom colors defined in tailwind.config.js
primary: '#0366d6'      // Blue
secondary: '#6f42c1'    // Purple
accent: '#28a745'       // Green
background: '#ffffff'   // White
surface: '#f6f8fa'      // Light gray
border: '#e1e4e8'       // Border gray
```

---

## 📡 Backend API Routes

```javascript
// Health check
GET /api/health

// Get developer profile & stats
GET /api/developer/:username
// Response: { profile, repos, stats }

// Get paginated repositories
GET /api/repositories/:username?page=1
// Response: { repos, totalCount }
```

---

## ⚛️ React Component Template

```jsx
import React, { useState, useEffect } from 'react';

export default function MyComponent({ data }) {
  const [state, setState] = useState('');

  useEffect(() => {
    // Run on mount
  }, []);

  return (
    <div className="card">
      <h2 className="text-xl font-semibold">{data.title}</h2>
      <p className="text-text-secondary">{state}</p>
    </div>
  );
}
```

---

## 🔗 API Call Example

```javascript
// In your React component
const [data, setData] = useState(null);
const [loading, setLoading] = useState(true);
const [error, setError] = useState('');

useEffect(() => {
  const fetchData = async () => {
    try {
      const response = await fetch('/api/developer/username');
      if (!response.ok) throw new Error('Failed');
      const result = await response.json();
      setData(result);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  fetchData();
}, [username]);
```

---

## 🎨 Pre-built Tailwind Classes

```jsx
// Buttons
<button className="btn-primary">Primary</button>
<button className="btn-secondary">Secondary</button>

// Cards
<div className="card">Content</div>

// Inputs
<input className="input" />

// Badges
<span className="badge">Label</span>
```

---

## 🐛 Debugging Tips

```javascript
// Check if data is loading
console.log('Loading:', loading);

// Inspect fetched data
console.log('Data:', data);

// Check errors
console.log('Error:', error);

// Check component props
console.log('Props:', props);
```

---

## 🌐 Port Reference

| Service | URL | Port |
|---------|-----|------|
| Frontend | http://localhost:5173 | 5173 |
| Backend | http://localhost:5000 | 5000 |
| Database | None (yet) | - |

---

## 📦 Key Dependencies

### Frontend
- `react@18` - UI library
- `vite@5` - Build tool
- `tailwindcss@3` - Styling
- `recharts@2` - Charts
- `lucide-react` - Icons
- `axios` - HTTP requests

### Backend
- `express@4` - Web framework
- `axios` - HTTP requests
- `cors` - Cross-origin
- `dotenv` - Environment vars

---

## 🔐 Environment Variables

### Server (.env)
```
PORT=5000
GITHUB_TOKEN=ghp_xxxxx  # Optional (for higher rate limits)
```

### Client (.env.local)
```
VITE_API_URL=http://localhost:5000
```

---

## 📝 Useful File Edits

### Change Primary Color
Edit `client/tailwind.config.js`:
```javascript
colors: {
  primary: '#0366d6',  // Change this hex code
}
```

### Add New API Route
Edit `server/src/server.js`:
```javascript
app.get('/api/my-route', (req, res) => {
  res.json({ message: 'Hello' });
});
```

### Create New Component
Create `client/src/components/MyComponent.jsx`:
```jsx
export default function MyComponent() {
  return <div>My Component</div>;
}
```

---

## ✅ Checklist

- [ ] Run `pnpm dev`
- [ ] Open http://localhost:5173
- [ ] Search for "torvalds"
- [ ] View the dashboard
- [ ] Explore the code
- [ ] Try modifying a component
- [ ] Check the charts
- [ ] Search for another developer
- [ ] Read the README.md
- [ ] Ready to deploy!

---

## 🆘 Common Fixes

**Port in use?**
```bash
# Kill process on port 5000
lsof -i :5000
kill -9 <PID>

# Or change port in server/src/server.js
const PORT = 5001;  // Different port
```

**Dependencies not installed?**
```bash
pnpm install
cd server && pnpm install
cd client && pnpm install
```

**API not connecting?**
- Check both servers are running
- Check vite.config.js proxy settings
- Check browser console for errors

**GitHub rate limited?**
- Add `GITHUB_TOKEN` to `server/.env`
- Get token from: https://github.com/settings/tokens

---

## 📚 Learn More

| Topic | Link |
|-------|------|
| React | https://react.dev |
| Vite | https://vitejs.dev |
| Tailwind | https://tailwindcss.com |
| Express | https://expressjs.com |
| GitHub API | https://docs.github.com |

---

## 🎯 Next Steps

1. **Customize colors** - Edit tailwind.config.js
2. **Add features** - Create new API routes
3. **Modify components** - Edit .jsx files
4. **Deploy** - Push to GitHub
5. **Share** - Show off your app!

---

**Made with ❤️ | Pure MERN Stack | No TypeScript**
