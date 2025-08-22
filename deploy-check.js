#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

console.log('🚀 AI Quiz Hub - Deployment Readiness Check');
console.log('==========================================\n');

const checks = [
  {
    name: 'Package.json exists',
    check: () => fs.existsSync('package.json'),
    required: true
  },
  {
    name: 'Environment example file',
    check: () => fs.existsSync('.env.example'),
    required: true
  },
  {
    name: 'README.md is comprehensive',
    check: () => {
      if (!fs.existsSync('README.md')) return false;
      const content = fs.readFileSync('README.md', 'utf8');
      return content.length > 1000 && content.includes('Getting Started') && content.includes('Installation');
    },
    required: true
  },
  {
    name: 'Docker configuration',
    check: () => fs.existsSync('Dockerfile') && fs.existsSync('docker-compose.yml'),
    required: false
  },
  {
    name: 'Vercel configuration',
    check: () => fs.existsSync('vercel.json'),
    required: false
  },
  {
    name: 'PM2 configuration',
    check: () => fs.existsSync('ecosystem.config.js'),
    required: false
  },
  {
    name: 'GitHub Actions CI/CD',
    check: () => fs.existsSync('.github/workflows/ci.yml'),
    required: false
  },
  {
    name: 'License file',
    check: () => fs.existsSync('LICENSE'),
    required: true
  },
  {
    name: 'Contributing guidelines',
    check: () => fs.existsSync('CONTRIBUTING.md'),
    required: false
  },
  {
    name: 'TypeScript configuration',
    check: () => fs.existsSync('tsconfig.json'),
    required: true
  },
  {
    name: 'Tailwind configuration',
    check: () => fs.existsSync('tailwind.config.js'),
    required: true
  },
  {
    name: 'Next.js configuration',
    check: () => fs.existsSync('next.config.js'),
    required: true
  },
  {
    name: 'Server files',
    check: () => fs.existsSync('server/index.js') && fs.existsSync('server/aiService.js'),
    required: true
  },
  {
    name: 'Public assets',
    check: () => {
      const publicFiles = ['favicon.ico', 'favicon.svg', 'manifest.json'];
      return publicFiles.every(file => fs.existsSync(`public/${file}`));
    },
    required: true
  },
  {
    name: 'Audio files',
    check: () => {
      const audioFiles = ['Home_Bgm.mp3', 'Quiz_Bgm.mp3'];
      return audioFiles.every(file => fs.existsSync(`public/Audio/${file}`));
    },
    required: true
  },
  {
    name: 'App structure',
    check: () => {
      const appDirs = ['components', 'services', 'utils'];
      const appFiles = ['layout.tsx', 'page.tsx', 'globals.css'];
      return appDirs.every(dir => fs.existsSync(`app/${dir}`)) &&
             appFiles.every(file => fs.existsSync(`app/${file}`));
    },
    required: true
  }
];

let passed = 0;
let failed = 0;
let warnings = 0;

checks.forEach(({ name, check, required }) => {
  const result = check();
  const status = result ? '✅' : (required ? '❌' : '⚠️');
  const label = required ? 'REQUIRED' : 'OPTIONAL';
  
  console.log(`${status} ${name} (${label})`);
  
  if (result) {
    passed++;
  } else if (required) {
    failed++;
  } else {
    warnings++;
  }
});

console.log('\n📊 Summary:');
console.log(`✅ Passed: ${passed}`);
console.log(`❌ Failed: ${failed}`);
console.log(`⚠️  Warnings: ${warnings}`);

if (failed === 0) {
  console.log('\n🎉 Deployment Ready!');
  console.log('Your AI Quiz Hub project is ready for deployment.');
  console.log('\n🚀 Quick deployment options:');
  console.log('• Vercel: npm run deploy:vercel');
  console.log('• Docker: npm run docker:compose');
  console.log('• PM2: npm run pm2:start');
} else {
  console.log('\n⚠️  Deployment Issues Found');
  console.log('Please fix the failed checks before deploying.');
  process.exit(1);
}

// Additional environment check
console.log('\n🔧 Environment Setup:');
if (fs.existsSync('.env')) {
  console.log('✅ .env file exists');
  const envContent = fs.readFileSync('.env', 'utf8');
  if (envContent.includes('your_') || envContent.includes('_here')) {
    console.log('⚠️  Remember to update API keys in .env file');
  } else {
    console.log('✅ .env file appears configured');
  }
} else {
  console.log('⚠️  .env file not found - copy from .env.example');
}

console.log('\n📚 Next Steps:');
console.log('1. Configure environment variables in .env');
console.log('2. Test locally: npm run dev');
console.log('3. Build: npm run build');
console.log('4. Deploy using your preferred method');
console.log('\n🎯 Happy deploying!');