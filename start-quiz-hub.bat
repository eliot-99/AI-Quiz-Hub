@echo off
title AI-Powered Quiz Hub Launcher
color 0A

echo.
echo  ╔══════════════════════════════════════════════════════════════╗
echo  ║                    🎯 AI-Powered Quiz Hub                    ║
echo  ║                                                              ║
echo  ║  A beautiful, interactive quiz application with AI-generated ║
echo  ║  questions, elegant animations, and immersive audio.         ║
echo  ╚══════════════════════════════════════════════════════════════╝
echo.

echo 🔍 Checking system requirements...
node --version >nul 2>&1
if errorlevel 1 (
    echo ❌ Node.js is not installed or not in PATH
    echo Please install Node.js 18+ from https://nodejs.org/
    pause
    exit /b 1
)

echo ✅ Node.js is installed
echo.

echo 📦 Installing dependencies...
call npm install --silent
if errorlevel 1 (
    echo ❌ Failed to install dependencies
    pause
    exit /b 1
)

echo ✅ Dependencies installed
echo.

echo 🚀 Starting AI-Powered Quiz Hub...
echo.
echo ┌─────────────────────────────────────────────────────────────┐
echo │  🌐 Frontend: http://localhost:3000                        │
echo │  🔧 Backend:  http://localhost:3001                        │
echo │  📊 Health:   http://localhost:3001/api/health             │
echo └─────────────────────────────────────────────────────────────┘
echo.

echo 🔧 Starting backend server...
start "Quiz API Server" /min cmd /c "npm run server & pause"

echo ⏳ Waiting for backend to initialize...
timeout /t 3 /nobreak >nul

echo 🌐 Starting frontend development server...
start "Quiz Frontend" cmd /c "npm run dev & pause"

echo.
echo ✨ Both servers are starting up!
echo.
echo 📖 Quick Start Guide:
echo   1. Wait for both terminal windows to show "ready"
echo   2. Open http://localhost:3000 in your browser
echo   3. Enter any topic you want to be quizzed on
echo   4. Select your difficulty level
echo   5. Click "Start Quiz" and enjoy!
echo.
echo 💡 Features:
echo   • 50 AI-generated questions per quiz
echo   • Beautiful animations and sound effects
echo   • Real-time progress tracking
echo   • Detailed results analysis
echo   • Works with or without API keys
echo.
echo 🔊 Audio: Enable sound for the best experience
echo 📱 Mobile: Fully responsive design
echo 🎨 Theme: Calm, elegant, and immersive
echo.
echo Press any key to open the application in your browser...
pause >nul

start http://localhost:3000

echo.
echo 🎉 AI-Powered Quiz Hub is now running!
echo.
echo To stop the servers:
echo   • Close both terminal windows
echo   • Or press Ctrl+C in each terminal
echo.
echo Enjoy your quiz experience! 🚀
echo.
pause