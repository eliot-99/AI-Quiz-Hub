# Contributing to AI Quiz Hub

Thank you for your interest in contributing to AI Quiz Hub! This document provides guidelines and information for contributors.

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm 8+
- Git
- OpenRouter API key (for testing AI features)

### Development Setup
1. Fork the repository
2. Clone your fork: `git clone https://github.com/yourusername/ai-quiz-hub.git`
3. Install dependencies: `npm install`
4. Copy `.env.example` to `.env` and configure
5. Start development servers: `./start-quiz-hub.bat` (Windows) or `npm run dev`

## 📋 Development Guidelines

### Code Style
- **TypeScript**: Use strict typing
- **ESLint**: Follow configured rules
- **Prettier**: Auto-format code
- **Naming**: Use camelCase for variables, PascalCase for components

### Component Structure
```typescript
// Component template
'use client';

import React from 'react';
import { motion } from 'framer-motion';

interface ComponentProps {
  // Define props with types
}

export default function Component({ prop }: ComponentProps) {
  // Component logic
  return (
    <motion.div>
      {/* JSX content */}
    </motion.div>
  );
}
```

### Commit Messages
Use conventional commits:
- `feat:` New features
- `fix:` Bug fixes
- `docs:` Documentation changes
- `style:` Code style changes
- `refactor:` Code refactoring
- `test:` Test additions/changes
- `chore:` Maintenance tasks

Example: `feat: add multi-language quiz support`

## 🧪 Testing

### Running Tests
```bash
npm test              # Unit tests
npm run test:e2e      # End-to-end tests
npm run lint          # Code linting
npm run type-check    # TypeScript checking
```

### Writing Tests
- Place tests next to components: `Component.test.tsx`
- Use React Testing Library for component tests
- Mock external dependencies
- Aim for >80% code coverage

## 🎨 UI/UX Guidelines

### Design Principles
- **Dark Theme**: Maintain elegant dark aesthetic
- **Accessibility**: Ensure WCAG 2.1 AA compliance
- **Responsive**: Mobile-first design approach
- **Performance**: Optimize animations and interactions

### Color Palette
- **Primary**: Dark slate colors (#0f172a to #334155)
- **Accent**: Purple/magenta (#d946ef, #c026d3)
- **Electric**: Blue tones (#0ea5e9, #0284c7)
- **Neon**: Green highlights (#22c55e, #16a34a)

### Animation Guidelines
- Use Framer Motion for complex animations
- Keep animations under 300ms for interactions
- Provide reduced motion alternatives
- Test on lower-end devices

## 🔧 Backend Development

### API Standards
- RESTful endpoints
- Consistent error handling
- Input validation
- Rate limiting
- Comprehensive logging

### AI Integration
- Handle API failures gracefully
- Implement fallback mechanisms
- Validate AI-generated content
- Monitor API usage and costs

## 📱 Mobile Considerations

### Audio System
- Test audio on iOS Safari
- Handle autoplay restrictions
- Provide visual feedback for audio states
- Optimize for battery usage

### Performance
- Lazy load components
- Optimize images and assets
- Minimize bundle size
- Test on various devices

## 🚀 Deployment

### Pre-deployment Checklist
- [ ] All tests passing
- [ ] No console errors
- [ ] Environment variables configured
- [ ] Build succeeds
- [ ] Performance audit passed
- [ ] Accessibility audit passed

### Deployment Platforms
- **Vercel**: Recommended for Next.js
- **Docker**: For containerized deployment
- **Traditional**: PM2 for process management

## 🐛 Bug Reports

### Bug Report Template
```markdown
**Describe the bug**
A clear description of the bug.

**To Reproduce**
Steps to reproduce the behavior.

**Expected behavior**
What you expected to happen.

**Screenshots**
If applicable, add screenshots.

**Environment:**
- OS: [e.g. Windows 11]
- Browser: [e.g. Chrome 120]
- Version: [e.g. 1.0.0]
```

## 💡 Feature Requests

### Feature Request Template
```markdown
**Is your feature request related to a problem?**
A clear description of the problem.

**Describe the solution you'd like**
A clear description of what you want to happen.

**Additional context**
Any other context about the feature request.
```

## 📚 Documentation

### Documentation Standards
- Update README.md for major changes
- Document new components and functions
- Include code examples
- Keep documentation current

### API Documentation
- Document all endpoints
- Include request/response examples
- Specify error codes
- Update OpenAPI spec if applicable

## 🤝 Pull Request Process

### Before Submitting
1. Create feature branch from `main`
2. Make your changes
3. Add/update tests
4. Update documentation
5. Run full test suite
6. Ensure build passes

### PR Template
```markdown
## Description
Brief description of changes.

## Type of Change
- [ ] Bug fix
- [ ] New feature
- [ ] Breaking change
- [ ] Documentation update

## Testing
- [ ] Tests pass
- [ ] Manual testing completed
- [ ] Cross-browser testing

## Screenshots
If applicable, add screenshots.
```

### Review Process
1. Automated checks must pass
2. Code review by maintainers
3. Address feedback
4. Final approval and merge

## 🏆 Recognition

Contributors will be recognized in:
- README.md contributors section
- Release notes
- Project documentation

## 📞 Getting Help

- **GitHub Discussions**: For questions and ideas
- **GitHub Issues**: For bugs and feature requests
- **Email**: support@ai-quiz-hub.com

## 📄 License

By contributing, you agree that your contributions will be licensed under the MIT License.

---

Thank you for contributing to AI Quiz Hub! 🎯