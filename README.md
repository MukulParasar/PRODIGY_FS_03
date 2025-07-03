# LocalStore E-commerce Website

A modern full-stack e-commerce application built with React and Express.js, featuring a complete product catalog and shopping cart functionality.

## Features

- 🛒 **Product Catalog**: Browse products with images, descriptions, prices, and ratings
- 🔍 **Advanced Filtering**: Filter by category and price range
- 📊 **Product Sorting**: Sort by price, rating, and newest products
- 🛍️ **Shopping Cart**: Add, remove, and update quantities in your cart
- 📱 **Responsive Design**: Works seamlessly on desktop and mobile devices
- 💾 **Session Storage**: Cart persists during your browsing session

## Tech Stack

### Frontend
- **React** with TypeScript
- **Tailwind CSS** for styling
- **shadcn/ui** component library
- **TanStack React Query** for state management
- **Wouter** for routing
- **Vite** for build tooling

### Backend
- **Express.js** with TypeScript
- **In-memory storage** for data persistence
- **Session-based** cart management
- **RESTful API** design

## Quick Start

### Prerequisites

Make sure you have the following installed:
- **Node.js** (version 18 or higher)
- **npm** (comes with Node.js)

### Installation

1. **Clone or download this project** to your local machine

2. **Navigate to the project directory**
   ```bash
   cd your-project-folder
   ```

3. **Install dependencies**
   ```bash
   npm install
   ```

4. **Start the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser** and visit:
   ```
   http://localhost:5000
   ```

That's it! The application will be running locally on your machine.

## Available Scripts

- `npm run dev` - Starts the development server with hot reloading
- `npm run build` - Builds the application for production
- `npm start` - Starts the production server (after building)

## Project Structure

```
├── client/                 # Frontend React application
│   ├── src/
│   │   ├── components/     # Reusable UI components
│   │   ├── hooks/          # Custom React hooks
│   │   ├── lib/            # Utility functions
│   │   └── pages/          # Page components
├── server/                 # Backend Express application
│   ├── index.ts           # Server entry point
│   ├── routes.ts          # API routes
│   ├── storage.ts         # Data storage layer
│   └── vite.ts            # Vite integration
├── shared/                # Shared types and schemas
│   └── schema.ts          # Database schemas and types
└── package.json           # Project dependencies and scripts
```

## API Endpoints

- `GET /api/products` - Get all products
- `GET /api/products/:id` - Get specific product
- `GET /api/cart` - Get cart items
- `POST /api/cart/add` - Add item to cart
- `PUT /api/cart/update` - Update item quantity
- `DELETE /api/cart/remove/:id` - Remove item from cart
- `DELETE /api/cart/clear` - Clear entire cart

## Sample Products

The application comes with 12 sample products across different categories:
- Electronics (headphones, charging pads, speakers)
- Clothing (t-shirts, jackets)
- Home & Garden (water bottles, mugs, desk lamps)
- Books (novels and collections)
- Sports (yoga mats, running shoes)

## Development

The project uses modern development tools:
- **TypeScript** for type safety
- **ESLint** for code quality
- **Hot Module Replacement** for fast development
- **Automatic restarting** when server code changes

## Deployment

The application is designed to run on a single port (5000) and serves both the API and static files. For production deployment:

1. Build the application: `npm run build`
2. Start the production server: `npm start`
3. The app will be available on the configured port

## Support

If you encounter any issues:
1. Make sure Node.js is properly installed
2. Try deleting `node_modules` and running `npm install` again
3. Check that port 5000 is not being used by another application

Enjoy building your local store! 🏪