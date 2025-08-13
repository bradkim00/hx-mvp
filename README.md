# HX ("Chex") MVP

Turn gameday into lasting, measurable memories.

## Overview

HX is a mobile-first web app that helps sports fans log verified game attendance, track personal stats (FanMetrics), collect digital memorabilia, and share gameday posts.

**Selling point**: "Tickets are expensive—turn gameday into lasting, measurable memories."

## Features

### MVP Scope
- **Auth & Profile**: Sign in, profile edit (name, location, favorite teams multi-select)
- **Game Logging**: Date → pick/search MLB game (seeded list) or manual; manual check-in; ticket image upload; seat/caption/friends tags
- **Social**: Feed (my + friends), like, comment, "I Was There" (open same game prefilled)
- **FanMetrics**: Games attended, personal W-L & win rate, streaks, stadium collection count, MyMVP (manual top performer)
- **Collections**: Badges (rarity SILVER/GOLD/PLATINUM) + gallery
- **Shareable**: Generate 1080×1080 PNG with matchup/date/score/streak + HX watermark

## Tech Stack

- **Frontend**: Next.js 14 (App Router) + TypeScript + Tailwind CSS
- **UI Components**: shadcn/ui + Radix UI primitives
- **Authentication**: NextAuth.js (Email + Google)
- **Database**: Prisma + PostgreSQL
- **File Storage**: Local dev (S3-ready interface)
- **Maps**: Leaflet + OpenStreetMap
- **Testing**: Vitest (unit), Playwright (smoke)
- **CI**: GitHub Actions (lint/build/test)

## Getting Started

### Prerequisites

- Node.js 18+ 
- PostgreSQL database
- Google OAuth credentials (optional)

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd hx-mvp
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Setup**
   ```bash
   cp env.example .env.local
   ```
   
   Update `.env.local` with your configuration:
   ```env
   DATABASE_URL="postgresql://username:password@localhost:5432/hx_mvp"
   NEXTAUTH_URL="http://localhost:3000"
   NEXTAUTH_SECRET="your-secret-key-here"
   GOOGLE_CLIENT_ID="your-google-client-id"
   GOOGLE_CLIENT_SECRET="your-google-client-secret"
   ```

4. **Database Setup**
   ```bash
   # Generate Prisma client
   npm run db:generate
   
   # Push schema to database
   npm run db:push
   
   # Seed with initial data
   npm run db:seed
   ```

5. **Start Development Server**
   ```bash
   npm run dev
   ```

   Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
hx-mvp/
├── prisma/                 # Database schema and migrations
├── scripts/                # Database seeding scripts
├── src/
│   ├── app/               # Next.js App Router pages
│   │   ├── api/           # API routes
│   │   ├── auth/          # Authentication pages
│   │   ├── log/           # Game logging
│   │   ├── me/            # User profile & FanMetrics
│   │   ├── collections/   # Badges & achievements
│   │   └── ...
│   ├── components/        # Reusable UI components
│   │   ├── ui/            # Base UI components
│   │   ├── layout/        # Layout components
│   │   ├── feed/          # Social feed components
│   │   └── ...
│   └── lib/               # Utility functions & configurations
├── public/                 # Static assets
└── ...
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run db:generate` - Generate Prisma client
- `npm run db:push` - Push schema to database
- `npm run db:seed` - Seed database with initial data
- `npm run db:studio` - Open Prisma Studio
- `npm run test` - Run unit tests
- `npm run test:e2e` - Run end-to-end tests

## Database Schema

The MVP includes the following core models:

- **User**: Profile information, location, preferences
- **Team**: Sports teams with league, name, city, abbreviation
- **Stadium**: Venues with coordinates for mapping
- **Game**: Game details, scores, status
- **Checkin**: User game attendance records
- **Post**: Social media posts with game context
- **Badge**: Achievement system with rarity levels
- **UserBadge**: User badge progress tracking

## API Routes

- `/api/auth/*` - NextAuth.js authentication
- `/api/profile/*` - User profile management
- `/api/games/*` - Game search and creation
- `/api/checkins/*` - Game attendance logging
- `/api/posts/*` - Social feed management
- `/api/fanmetrics/*` - User statistics
- `/api/badges/*` - Achievement system
- `/api/shareables/*` - Image generation

## Development

### Adding New Features

1. Create the database model in `prisma/schema.prisma`
2. Generate and push the schema: `npm run db:generate && npm run db:push`
3. Create the API route in `src/app/api/`
4. Build the UI components in `src/components/`
5. Create the page in `src/app/`

### Testing

- **Unit Tests**: `npm run test` (Vitest)
- **E2E Tests**: `npm run test:e2e` (Playwright)

### Database Management

- **Schema Changes**: Edit `prisma/schema.prisma`, then run `npm run db:push`
- **Seed Data**: Edit `scripts/seed.ts`, then run `npm run db:seed`
- **Database UI**: `npm run db:studio`

## Deployment

### Environment Variables

Ensure all required environment variables are set in production:

- Database connection string
- NextAuth configuration
- OAuth provider credentials
- File storage configuration

### Build & Deploy

```bash
npm run build
npm run start
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

[Add your license here]

## Support

For questions or support, please [create an issue](link-to-issues) or contact the development team.
