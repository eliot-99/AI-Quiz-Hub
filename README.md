# 🎯 AI Quiz Hub

<div align="center">

![AI Quiz Hub Logo](public/favicon.svg)

**An intelligent, interactive quiz platform powered by AI with stunning visuals and immersive audio**

[![Next.js](https://img.shields.io/badge/Next.js-14.2.32-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-18.2.0-blue?style=for-the-badge&logo=react)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0.0-blue?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.3.0-38B2AC?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/)
[![Express.js](https://img.shields.io/badge/Express.js-4.18.0-green?style=for-the-badge&logo=express)](https://expressjs.com/)

[🚀 Live Demo](#) • [📖 Documentation](#features) • [🛠️ Installation](#installation) • [🔧 Deployment](#deployment)

</div>

---

## ✨ Features

### 🧠 **AI-Powered Question Generation**
- **Smart Question Creation**: Leverages Meta's Llama 3.1 70B model via OpenRouter API
- **Multi-Language Support**: English, Hindi, and Bengali quiz generation
- **Adaptive Difficulty**: Easy, Medium, and Hard difficulty levels with intelligent scaling
- **Topic Flexibility**: Generate quizzes on any subject imaginable

### 🎨 **Stunning User Experience**
- **Interactive 3D Backgrounds**: Vanta.js-powered neural network animations
- **Smooth Animations**: Framer Motion for fluid transitions and micro-interactions
- **Responsive Design**: Optimized for desktop, tablet, and mobile devices
- **Dark Theme**: Elegant dark UI with custom color palette and gradients

### 🔊 **Immersive Audio System**
- **Background Music**: Contextual audio for home, quiz, and results pages
- **Audio Controls**: User-friendly play/pause and volume controls
- **Mobile Optimization**: Enhanced audio experience across all devices
- **Smart Audio Management**: Automatic audio context switching

### 📊 **Advanced Analytics**
- **Real-time Progress**: Live progress tracking during quizzes
- **Detailed Results**: Comprehensive performance analysis with explanations
- **Score Visualization**: Beautiful charts and performance metrics
- **Performance Levels**: Intelligent categorization (Excellent, Good, Fair, Needs Improvement)

### 🎯 **Interactive Quiz Experience**
- **50 Questions per Quiz**: Comprehensive testing with substantial question sets
- **Instant Feedback**: Immediate answer validation with explanations
- **Progress Indicators**: Visual progress bars and question counters
- **Confetti Celebrations**: Animated celebrations for achievements

---

## 🏗️ Architecture

### **Frontend (Next.js 14)**
```
app/
├── components/          # Reusable UI components
│   ├── EnhancedAudioManager.tsx    # Audio system management
│   ├── VantaNetworkBackground.tsx  # 3D background animations
│   ├── QuestionCard.tsx            # Quiz question display
│   ├── ProgressBar.tsx             # Progress visualization
│   ├── ConfettiAnimation.tsx       # Celebration animations
│   ├── LoadingScreen.tsx           # Loading states
│   ├── UserGuide.tsx               # User onboarding
│   └── StatusDashboard.tsx         # System status
├── services/           # API integration
│   └── api.ts         # Backend communication
├── utils/             # Utility functions
│   └── audioUtils.ts  # Audio management utilities
├── about/             # About page
├── quiz/              # Quiz interface
├── results/           # Results display
└── globals.css        # Global styles
```

### **Backend (Express.js)**
```
server/
├── index.js           # Main server configuration
└── aiService.js       # AI integration service
```

### **Key Technologies**
- **Frontend**: Next.js 14, React 18, TypeScript, Tailwind CSS
- **Animations**: Framer Motion, Vanta.js
- **Backend**: Express.js, Node.js
- **AI Integration**: OpenRouter API (Llama 3.1 70B)
- **Styling**: Custom Tailwind theme with dark palette
- **Audio**: Web Audio API with enhanced mobile support

---

## 🚀 Installation

### **Prerequisites**
- **Node.js**: Version 18.0 or higher
- **npm**: Version 8.0 or higher
- **OpenRouter API Key**: For AI question generation

### **Quick Start**

1. **Clone the Repository**
   ```bash
   git clone https://github.com/yourusername/ai-quiz-hub.git
   cd ai-quiz-hub
   ```

2. **Install Dependencies**
   ```bash
   npm install
   ```

3. **Environment Setup**
   ```bash
   # Copy environment template
   cp .env.example .env
   
   # Edit .env file with your API key
   nano .env
   ```

4. **Configure Environment Variables**
   ```env
   # API Configuration
   LLama_API_KEY=your_openrouter_api_key_here
   
   # Server Configuration
   PORT=3001
   NODE_ENV=development
   
   # Frontend Configuration
   NEXT_PUBLIC_API_URL=http://localhost:3001
   ```

5. **Start the Application**
   
   **Option A: Using the Launcher (Recommended)**
   ```bash
   # Windows
   ./start-quiz-hub.bat
   
   # Linux/Mac
   chmod +x start-quiz-hub.sh && ./start-quiz-hub.sh
   ```
   
   **Option B: Manual Start**
   ```bash
   # Terminal 1 - Backend Server
   npm run server
   
   # Terminal 2 - Frontend Development Server
   npm run dev
   ```

6. **Access the Application**
   - **Frontend**: http://localhost:3000
   - **Backend API**: http://localhost:3001
   - **Health Check**: http://localhost:3001/api/health

---

## 🔧 Configuration

### **API Keys Setup**

#### **OpenRouter API (Recommended)**
1. Visit [OpenRouter.ai](https://openrouter.ai/)
2. Create an account and generate an API key
3. Add to `.env` file:
   ```env
   LLama_API_KEY=sk-or-v1-your-api-key-here
   ```

#### **Alternative AI Providers**
The system supports multiple AI providers:
- **OpenAI GPT**: Set `OPENAI_API_KEY`
- **Google Gemini**: Set `GEMINI_API_KEY`
- **Anthropic Claude**: Set `ANTHROPIC_API_KEY`

### **Audio Configuration**
Audio files are located in `public/Audio/`:
- `Home_Bgm.mp3` - Homepage background music
- `Quiz_Bgm.mp3` - Quiz session background music

### **Customization Options**

#### **Theme Colors** (`tailwind.config.js`)
```javascript
colors: {
  dark: { /* Dark theme palette */ },
  accent: { /* Purple accent colors */ },
  electric: { /* Blue electric colors */ },
  neon: { /* Green neon colors */ },
  gold: { /* Gold highlight colors */ }
}
```

#### **Quiz Settings** (`server/aiService.js`)
```javascript
// Modify default settings
const DEFAULT_QUESTION_COUNT = 50;
const SUPPORTED_LANGUAGES = ['english', 'hindi', 'bengali'];
const DIFFICULTY_LEVELS = ['easy', 'medium', 'hard'];
```

---

## 🌐 Deployment

### **Vercel Deployment (Recommended)**

1. **Prepare for Deployment**
   ```bash
   npm run build
   ```

2. **Deploy to Vercel**
   ```bash
   # Install Vercel CLI
   npm i -g vercel
   
   # Deploy
   vercel --prod
   ```

3. **Environment Variables**
   Set in Vercel dashboard:
   - `LLama_API_KEY`
   - `NODE_ENV=production`
   - `NEXT_PUBLIC_API_URL=https://your-domain.vercel.app`

### **Docker Deployment**

1. **Create Dockerfile**
   ```dockerfile
   FROM node:18-alpine
   WORKDIR /app
   COPY package*.json ./
   RUN npm ci --only=production
   COPY . .
   RUN npm run build
   EXPOSE 3000 3001
   CMD ["npm", "start"]
   ```

2. **Build and Run**
   ```bash
   docker build -t ai-quiz-hub .
   docker run -p 3000:3000 -p 3001:3001 ai-quiz-hub
   ```

### **Traditional Server Deployment**

1. **Build the Application**
   ```bash
   npm run build
   ```

2. **Start Production Server**
   ```bash
   # Start backend
   NODE_ENV=production npm run server
   
   # Start frontend
   npm start
   ```

3. **Process Management (PM2)**
   ```bash
   # Install PM2
   npm install -g pm2
   
   # Start services
   pm2 start ecosystem.config.js
   ```

### **Environment Variables for Production**
```env
# Production API Configuration
LLama_API_KEY=your_production_api_key
NODE_ENV=production
PORT=3001

# Production Frontend Configuration
NEXT_PUBLIC_API_URL=https://your-domain.com
```

---

## 📱 PWA Support

The application includes Progressive Web App features:

### **Installation**
- **Desktop**: Click install prompt in browser
- **Mobile**: Add to home screen option
- **Offline**: Basic offline functionality

### **Features**
- **App Icons**: Multiple sizes (192px, 512px)
- **Splash Screen**: Custom loading screen
- **Theme Colors**: Consistent branding
- **Manifest**: Complete PWA manifest

---

## 🔍 API Documentation

### **Generate Quiz**
```http
POST /api/generate-quiz
Content-Type: application/json

{
  "topic": "JavaScript Programming",
  "difficulty": "medium",
  "questionCount": 50,
  "language": "english"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "topic": "JavaScript Programming",
    "difficulty": "medium",
    "questionCount": 50,
    "questions": [
      {
        "question": "What is a closure in JavaScript?",
        "options": ["A", "B", "C", "D"],
        "answer": "A",
        "explanation": "Detailed explanation..."
      }
    ]
  }
}
```

### **Submit Quiz**
```http
POST /api/submit-quiz
Content-Type: application/json

{
  "questions": [...],
  "userAnswers": ["A", "B", "C", ...],
  "topic": "JavaScript Programming",
  "difficulty": "medium"
}
```

### **Health Check**
```http
GET /api/health
```

---

## 🧪 Testing

### **Run Tests**
```bash
# Unit tests
npm test

# E2E tests
npm run test:e2e

# Linting
npm run lint
```

### **Test Coverage**
- **Components**: React component testing
- **API**: Backend endpoint testing
- **Integration**: Full user flow testing

---

## 🤝 Contributing

### **Development Setup**
1. Fork the repository
2. Create feature branch: `git checkout -b feature/amazing-feature`
3. Commit changes: `git commit -m 'Add amazing feature'`
4. Push to branch: `git push origin feature/amazing-feature`
5. Open Pull Request

### **Code Standards**
- **TypeScript**: Strict type checking
- **ESLint**: Code quality enforcement
- **Prettier**: Code formatting
- **Conventional Commits**: Commit message standards

### **Project Structure Guidelines**
- **Components**: Reusable UI components in `app/components/`
- **Pages**: Route components in respective directories
- **Services**: API and external service integrations
- **Utils**: Helper functions and utilities
- **Types**: TypeScript type definitions

---

## 📄 License

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.

---

## 🙏 Acknowledgments

- **Meta AI**: Llama 3.1 70B model for question generation
- **OpenRouter**: AI API infrastructure
- **Vanta.js**: 3D background animations
- **Framer Motion**: Animation library
- **Tailwind CSS**: Utility-first CSS framework
- **Next.js Team**: React framework
- **Vercel**: Deployment platform

---

## 📞 Support

### **Getting Help**
- **Documentation**: Check this README and inline code comments
- **Issues**: Create GitHub issues for bugs and feature requests
- **Discussions**: Use GitHub Discussions for questions

### **Contact**
- **Email**: support@ai-quiz-hub.com
- **GitHub**: [@yourusername](https://github.com/yourusername)
- **Website**: [ai-quiz-hub.com](https://ai-quiz-hub.com)

---

<div align="center">

**Made with ❤️ by the AI Quiz Hub Team**

⭐ **Star this repository if you found it helpful!** ⭐

</div>