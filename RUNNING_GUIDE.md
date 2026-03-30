# 🚀 Readora - Setup & Running Guide

## Quick Start Guide

### Step 1: Install Dependencies

Open **two separate terminals**:

**Terminal 1 (Backend):**
```bash
cd server
npm install
```

**Terminal 2 (Frontend):**
```bash
npm install
```

### Step 2: Run the Application

**Terminal 1 (Backend) - Start the API server:**
```bash
cd server
npm run dev
```

You should see:
```
╔═══════════════════════════════════════════════════════════╗
║                                                           ║
║   📚 Readora Backend API Server                          ║
║                                                           ║
║   Server running on: http://localhost:5000               ║
║   API Base URL: http://localhost:5000/api                ║
║                                                           ║
╚═══════════════════════════════════════════════════════════╝
```

**Terminal 2 (Frontend) - Start the UI:**
```bash
npm run dev
```

You should see:
```
  VITE v7.x.x  ready in xxx ms

  ➜  Local:   http://localhost:5173/
  ➜  Network: use --host to expose
```

### Step 3: Open in Browser

Go to: **http://localhost:5173/**

## 🔐 Login Credentials

### For Admin Access:
- **Username:** `admin`
- **Password:** `admin123`
- Select the **"Admin"** tab before logging in

### For Student Access:
- **Username:** `student`
- **Password:** `student123`
- Select the **"Student"** tab before logging in

Or use these specific accounts:
- `ahmad` / `student123`
- `siti` / `student123`

## ✅ Verification Checklist

- [ ] Backend server running on http://localhost:5000
- [ ] Frontend server running on http://localhost:5173
- [ ] No errors in backend terminal
- [ ] No errors in frontend terminal or browser console
- [ ] Can access login page at http://localhost:5173/
- [ ] Can login with test credentials

## 🐛 Troubleshooting

### Problem: "Login failed" or "Login failed. Please check your credentials."

**Solution:**
1. Check if backend is running (http://localhost:5000/api/health should return `{"status":"ok"}`)
2. Open browser console (F12) and check for errors
3. Make sure you're using the correct credentials

### Problem: Backend won't start / Port 5000 in use

**Solution (Windows):**
```bash
# Find process using port 5000
netstat -ano | findstr :5000

# Kill the process (replace PID with actual number)
taskkill /F /PID <PID>
```

**Solution (Linux/Mac):**
```bash
lsof -ti:5000 | xargs kill -9
```

### Problem: Frontend shows blank page

**Solution:**
1. Check browser console for errors (F12)
2. Make sure frontend dependencies are installed: `npm install`
3. Try clearing browser cache: Ctrl+Shift+Delete
4. Restart the dev server

### Problem: CORS errors in browser console

**Solution:**
The backend should already have CORS configured. If you still see errors:
1. Make sure backend is running on port 5000
2. Check `server/server.js` CORS configuration includes your frontend URL
3. Try using incognito/private browsing mode

### Problem: "Cannot find module" errors

**Solution:**
```bash
# In the directory showing the error
npm install
```

## 📡 API Testing

You can test the API directly:

**Test Backend Health:**
```bash
curl http://localhost:5000/api/health
```

**Test Login:**
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d "{\"email\":\"admin@readora.com\",\"password\":\"admin123\"}"
```

**Test Get Books:**
```bash
curl http://localhost:5000/api/buku
```

## 📂 Project Structure Quick Reference

```
Readora-Lib/
├── server/              # Backend (Express.js)
│   ├── routes/         # API endpoints
│   ├── middleware/     # Auth middleware
│   ├── data/           # Mock database
│   └── server.js       # Entry point
│
├── src/                # Frontend (React + Vite)
│   ├── components/     # UI components
│   ├── views/          # Page components
│   ├── services/       # API calls
│   ├── stores/         # State management
│   └── App.jsx         # Main app
│
└── README.md           # Full documentation
```

## 🔧 Development Tips

1. **Always run both servers** - Backend AND Frontend
2. **Check console logs** - Both browser console and terminal logs
3. **Use test accounts** - Don't create new users for testing
4. **Hot reload** - Changes auto-reload, no need to restart servers
5. **Clear localStorage** - If login acts weird, clear browser data

## 📞 Need Help?

Check these files for more info:
- `README.md` - Full project documentation
- `API_DOCUMENTATION.md` - Complete API reference
- `server/README.md` - Backend setup guide

---

**Happy Coding! 📚✨**
