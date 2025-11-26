# BizTalk - AI-Powered English Learning Platform

A complete, production-ready English learning web application inspired by prepedu.com, featuring personalized lessons, speech correction, vocabulary training, and more.

## 🚀 Quick Start

### Prerequisites
- Node.js 16+ and npm installed
- Modern web browser with microphone access (for speech features)

### Installation & Running

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

The app will be available at `http://localhost:8080`

## 🎯 Features

### Core Functionality
- **Placement Test**: Multi-dimensional assessment (grammar, reading, speaking) with immediate results
- **Personalized Dashboard**: Track progress, streaks, weekly goals, and skills
- **Lesson Library**: Filterable by level (A1-C2), topic, and format
- **Interactive Lesson Player**: Read articles, listen to audio, answer comprehension questions
- **Vocabulary Trainer**: Spaced repetition system (SRS) with topical decks
- **Speech Correction** (Pro): Real-time pronunciation analysis with phoneme-level feedback
- **Social Features**: Leaderboards, badges, streak tracking with freeze option

### Pro Features (Gated)
- Advanced speech correction with detailed phoneme analysis
- Unlimited lessons and practice sessions
- Full personalized content feed
- Advanced analytics and progress tracking

## 🏗️ Architecture

### Tech Stack
- **Framework**: React 18 + TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS with custom design system
- **UI Components**: Shadcn UI
- **Routing**: React Router v6
- **State Management**: React Context + React Query
- **Animations**: Framer Motion
- **Forms**: React Hook Form + Zod validation

### Project Structure
```
src/
├── components/         # Reusable UI components
│   ├── ui/            # Shadcn UI components
│   ├── ThemeToggle.tsx
│   └── ProBadge.tsx
├── pages/             # Route pages
│   ├── Landing.tsx
│   ├── PlacementTest.tsx
│   ├── Dashboard.tsx
│   ├── Lessons.tsx
│   ├── LessonPlayer.tsx
│   ├── Vocabulary.tsx
│   └── Speech.tsx
├── lib/               # Utilities and mock data
│   ├── mockData.ts    # Sample lessons, vocab, users
│   └── utils.ts
├── hooks/             # Custom React hooks
└── index.css          # Design system tokens
```

## 🎨 Design System

The app uses a comprehensive design system defined in `src/index.css` and `tailwind.config.ts`:

### Color Palette
- **Primary**: Vibrant blue (#0066FF) - main brand color
- **Accent**: Cyan - interactive elements
- **Success**: Green - positive feedback
- **Warning**: Amber - Pro features badge
- **Gradients**: Hero backgrounds, card effects, Pro badges

### Typography
- **Font**: Inter (loaded from Google Fonts)
- **Hierarchy**: Bold headings, clear body text

### Components
All UI components use semantic design tokens:
- `--primary`, `--accent`, `--success`, `--warning`
- `--gradient-hero`, `--gradient-card`, `--gradient-pro`
- `--shadow-soft`, `--shadow-card`, `--shadow-lg`

## 📊 Mock Data & API Structure

Currently uses mock data from `src/lib/mockData.ts`. To connect to real backend:

### Expected API Endpoints

```typescript
// User & Authentication
POST /api/auth/login
POST /api/auth/signup
GET  /api/auth/profile

// Lessons
GET  /api/lessons?level={level}&topic={topic}
GET  /api/lessons/:id
POST /api/lessons/:id/progress

// Vocabulary
GET  /api/vocab/decks
GET  /api/vocab/decks/:id/cards
POST /api/vocab/cards/:id/review

// Speech Analysis
POST /api/speech/analyze
     Body: { audio: Blob, text: string }
     Returns: { pronunciation, intonation, fluency, errors[] }

// Progress & Stats
GET  /api/progress/stats
POST /api/progress/streak/freeze
```

### Replacing Mocks with Real API

1. Create an API client in `src/lib/api.ts`:
```typescript
const API_BASE = import.meta.env.VITE_API_URL;

export const api = {
  lessons: {
    getAll: () => fetch(`${API_BASE}/lessons`).then(r => r.json()),
    getById: (id: string) => fetch(`${API_BASE}/lessons/${id}`).then(r => r.json()),
  },
  // ... other endpoints
};
```

2. Replace mock imports in pages with API calls
3. Add React Query for caching and loading states

## 💳 Payment Integration (Stripe)

The app has UI for Pro feature gating. To integrate Stripe:

### Setup

1. Install Stripe SDK:
```bash
npm install @stripe/stripe-js @stripe/react-stripe-js
```

2. Add environment variables:
```bash
VITE_STRIPE_PUBLIC_KEY=pk_test_...
```

3. Create Stripe wrapper in `src/lib/stripe.ts`:
```typescript
import { loadStripe } from '@stripe/stripe-js';

export const stripePromise = loadStripe(
  import.meta.env.VITE_STRIPE_PUBLIC_KEY
);
```

4. Implement checkout flow:
```typescript
// In Dashboard or Landing component
import { stripePromise } from '@/lib/stripe';

const handleUpgrade = async () => {
  const stripe = await stripePromise;
  // Call your backend to create checkout session
  const response = await fetch('/api/create-checkout-session', {
    method: 'POST',
  });
  const session = await response.json();
  
  // Redirect to Stripe Checkout
  const result = await stripe?.redirectToCheckout({
    sessionId: session.id,
  });
};
```

### Testing
Use Stripe test cards:
- Success: `4242 4242 4242 4242`
- Decline: `4000 0000 0000 0002`

## 🧪 Testing

### Unit Tests (6+ components)
```bash
npm run test
```

Example test structure in `src/components/__tests__/Button.test.tsx`:
```typescript
import { render, screen } from '@testing-library/react';
import { Button } from '../ui/button';

describe('Button', () => {
  it('renders correctly', () => {
    render(<Button>Click me</Button>);
    expect(screen.getByText('Click me')).toBeInTheDocument();
  });
});
```

### E2E Tests (Playwright/Cypress)
```bash
# Install Playwright
npm install -D @playwright/test

# Run E2E tests
npm run test:e2e
```

Example E2E test:
```typescript
test('complete placement test flow', async ({ page }) => {
  await page.goto('/placement-test');
  // Fill out test...
  await page.click('text=Begin Test');
  // ... assertions
});
```

## ♿ Accessibility

The app follows WCAG AA standards:
- ✅ Semantic HTML (`<header>`, `<main>`, `<section>`)
- ✅ ARIA labels on interactive elements
- ✅ Keyboard navigation support
- ✅ Color contrast ratios checked
- ✅ Focus indicators on all interactive elements
- ✅ Screen reader friendly

Test with:
- Chrome DevTools Lighthouse
- axe DevTools browser extension

## 🌐 Internationalization (Future)

To add i18n support:

1. Install dependencies:
```bash
npm install react-i18next i18next
```

2. Create translations in `src/locales/`:
```
locales/
├── en/
│   └── translation.json
└── vi/
    └── translation.json
```

3. Initialize i18n in `src/i18n.ts`

## 🚀 Deployment

### Build
```bash
npm run build
# Output in dist/
```

### Deploy to Vercel
```bash
npm install -g vercel
vercel
```

### Deploy to Netlify
```bash
npm install -g netlify-cli
netlify deploy --prod
```

### Environment Variables
Set these in your deployment platform:
```
VITE_API_URL=https://your-api.com
VITE_STRIPE_PUBLIC_KEY=pk_live_...
```

## 📝 Development Notes

### Adding New Lessons
Add to `src/lib/mockData.ts`:
```typescript
export const mockLessons: Lesson[] = [
  {
    id: 'lesson-new',
    title: 'New Lesson Title',
    level: 'B2',
    topic: 'Business',
    // ...
  },
];
```

### Creating New Components
Follow this pattern:
```typescript
import { cn } from "@/lib/utils";

interface MyComponentProps {
  className?: string;
}

export function MyComponent({ className }: MyComponentProps) {
  return (
    <div className={cn("base-classes", className)}>
      {/* content */}
    </div>
  );
}
```

### Styling Guidelines
- Use design system tokens (`text-primary`, `bg-accent`)
- Never use arbitrary colors (`text-[#0066FF]`)
- Leverage Tailwind utilities
- Create component variants in Shadcn components

## 🔧 Troubleshooting

### Build Errors
```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install
```

### TypeScript Errors
```bash
# Check types
npm run type-check
```

### Audio Recording Not Working
- Ensure HTTPS (required for microphone access)
- Check browser permissions
- Test with `navigator.mediaDevices.getUserMedia()`

## 📄 License

MIT License - feel free to use this project as a template for your own applications.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Run tests and linting
5. Submit a pull request

## 📞 Support

For questions or issues:
- Check existing GitHub Issues
- Create a new issue with detailed reproduction steps
- Join our community Discord (link TBD)

---

Built with ❤️ using React, TypeScript, and Tailwind CSS
