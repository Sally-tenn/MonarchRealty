# Replit.md

## Overview

This is a full-stack real estate management platform called "Monarch Property" built with modern web technologies. The application provides comprehensive property management capabilities, user authentication, analytics, tutorials, and AI-powered features for different user roles including agents, managers, admins, investors, and vendors.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Routing**: Wouter for client-side navigation
- **State Management**: TanStack React Query for server state management
- **UI Framework**: Radix UI components with shadcn/ui styling system
- **Styling**: Tailwind CSS with custom CSS variables and glass morphism effects
- **Build Tool**: Vite with hot module replacement and development optimizations

### Backend Architecture
- **Runtime**: Node.js with Express.js server
- **Language**: TypeScript with ES modules
- **Authentication**: OpenID Connect (OIDC) via Replit Auth with session management
- **Session Storage**: PostgreSQL-backed sessions using connect-pg-simple
- **API Design**: RESTful endpoints with comprehensive error handling and logging

### Database Architecture
- **Database**: PostgreSQL (configured for Neon serverless)
- **ORM**: Drizzle ORM with type-safe schema definitions
- **Migration**: Drizzle Kit for schema migrations
- **Connection**: Connection pooling via @neondatabase/serverless

## Key Components

### Authentication System
- Replit Auth integration with OpenID Connect
- Role-based access control (user, agent, manager, admin, vendor, investor)
- Session-based authentication with PostgreSQL storage
- Protected routes and API endpoints

### Property Management
- Comprehensive property CRUD operations
- Advanced filtering and search capabilities
- Property status tracking (for_sale, for_rent, sold, rented, off_market)
- Property type categorization (single_family, etc.)
- Agent-property associations

### User Interface
- Responsive design with mobile-first approach
- Glass morphism design system with custom CSS variables
- Dark/light theme support
- Comprehensive component library based on Radix UI
- Interactive dashboards for different user roles

### Analytics & Reporting
- Real-time analytics tracking
- Dashboard statistics and metrics
- Revenue tracking and occupancy rates
- Performance monitoring

### AI Integration
- AI chatbot functionality for user assistance
- AI-powered property insights and recommendations
- Chat message storage and history

### Tutorial System
- Comprehensive tutorial management
- Progress tracking for users
- Difficulty-based categorization
- Interactive learning experience

## Data Flow

1. **Authentication Flow**: Users authenticate via Replit Auth → Session created in PostgreSQL → User role determined → Route access granted
2. **Property Management**: Frontend filters → API queries → Drizzle ORM → PostgreSQL → Formatted response → UI display
3. **Real-time Updates**: React Query manages cache invalidation and background refetching
4. **Analytics**: User actions → Analytics API → Database storage → Dashboard aggregation → Visual reporting

## External Dependencies

### Core Dependencies
- **@neondatabase/serverless**: PostgreSQL connection and pooling
- **drizzle-orm**: Type-safe database operations
- **express**: Web server framework
- **@tanstack/react-query**: Server state management
- **wouter**: Lightweight React routing

### UI Dependencies
- **@radix-ui/***: Headless UI components
- **tailwindcss**: Utility-first CSS framework
- **class-variance-authority**: Component variant management
- **lucide-react**: Icon library

### Authentication
- **openid-client**: OpenID Connect implementation
- **passport**: Authentication middleware
- **express-session**: Session management
- **connect-pg-simple**: PostgreSQL session store

## Deployment Strategy

### Development Environment
- **Runtime**: Node.js 20 with TypeScript execution via tsx
- **Database**: PostgreSQL 16 module in Replit
- **Hot Reload**: Vite development server with HMR
- **Port Configuration**: Server runs on port 5000 with external port 80

### Production Build
- **Frontend**: Vite build process outputs to dist/public
- **Backend**: esbuild bundles server code to dist/index.js
- **Deployment**: Replit autoscale deployment target
- **Environment**: Production NODE_ENV with optimized builds

### Environment Variables
- `DATABASE_URL`: PostgreSQL connection string (required)
- `SESSION_SECRET`: Session encryption key (required)
- `REPL_ID`: Replit environment identifier
- `ISSUER_URL`: OIDC issuer URL (defaults to replit.com/oidc)

## User Preferences

Preferred communication style: Simple, everyday language.

## Changelog

Changelog:
- June 26, 2025. Initial setup