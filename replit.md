# replit.md

## Overview

This is a modern full-stack e-commerce application built with React and Express.js, featuring a product catalog with shopping cart functionality. The application follows a monorepo structure with separate client and server directories, using TypeScript throughout for type safety.

## System Architecture

### Frontend Architecture
- **Framework**: React with TypeScript
- **Styling**: Tailwind CSS with shadcn/ui component library
- **State Management**: TanStack React Query for server state management
- **Routing**: Wouter for client-side routing
- **Build Tool**: Vite for development and production builds
- **UI Components**: Radix UI primitives with custom styling via shadcn/ui

### Backend Architecture
- **Framework**: Express.js with TypeScript
- **Database**: PostgreSQL with Drizzle ORM
- **Session Management**: In-memory storage with session-based cart functionality
- **API Design**: RESTful API endpoints for products and cart operations
- **Development**: Hot module replacement and live reloading via Vite integration

## Key Components

### Database Schema (shared/schema.ts)
- **Products Table**: id, name, description, price, image, category, rating, stock
- **Cart Items Table**: id, sessionId, productId, quantity
- **Users Table**: id, username, password (basic structure)
- Uses Drizzle ORM with PostgreSQL dialect
- Zod schemas for validation

### API Endpoints
- `GET /api/products` - Retrieve all products
- `GET /api/products/:id` - Retrieve specific product
- `GET /api/cart` - Get cart items for current session
- `POST /api/cart/add` - Add item to cart
- `DELETE /api/cart/remove/:id` - Remove item from cart
- `PUT /api/cart/update` - Update cart item quantity
- `DELETE /api/cart/clear` - Clear entire cart

### Frontend Components
- **Product Grid**: Displays products with filtering and sorting
- **Shopping Cart**: Sidebar component for cart management
- **Product Cards**: Individual product display with add-to-cart functionality
- **Filters Sidebar**: Category and price filtering options
- **Header/Footer**: Navigation and branding components

## Data Flow

1. **Product Display**: Products are fetched from the API on page load and displayed in a grid layout
2. **Cart Management**: Cart operations use session-based storage, with real-time updates via React Query
3. **User Sessions**: Sessions are automatically generated and managed server-side
4. **State Synchronization**: Client state is kept in sync with server state through React Query's caching and invalidation

## External Dependencies

### Frontend Dependencies
- React ecosystem (React, React DOM, React Router via Wouter)
- UI and styling (Tailwind CSS, Radix UI, shadcn/ui components)
- State management (TanStack React Query)
- Form handling (React Hook Form, Hookform Resolvers)
- Utilities (date-fns, clsx, class-variance-authority)

### Backend Dependencies
- Express.js with TypeScript support
- Database (Drizzle ORM, @neondatabase/serverless)
- Session management (connect-pg-simple)
- Development tools (tsx, esbuild)

### Development Dependencies
- Vite for build tooling and development server
- TypeScript for type checking
- ESLint and Prettier for code quality
- Replit-specific plugins for development environment

## Deployment Strategy

The application is configured for deployment on Replit with the following build process:
1. **Development**: Uses `tsx` to run the TypeScript server with hot reloading
2. **Production Build**: 
   - Frontend: Vite builds the React app to `dist/public`
   - Backend: esbuild bundles the Express server to `dist/index.js`
3. **Database**: Configured for PostgreSQL with Drizzle migrations
4. **Environment**: Requires `DATABASE_URL` environment variable

The application uses a hybrid approach where the Express server serves both the API endpoints and static assets in production, while Vite handles the frontend during development.

## Changelog

```
Changelog:
- July 03, 2025. Initial setup
- July 03, 2025. Added session middleware to fix cart functionality
- July 03, 2025. Created local deployment package with comprehensive documentation
```

## User Preferences

```
Preferred communication style: Simple, everyday language.
```