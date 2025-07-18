# Bootcamp Scheduler

A modern React-based event management application that enables users to create,
manage, and discover bootcamp events.

## Features

- Event creation and management with detailed information
- User profile management and authentication state
- Advanced search and filtering capabilities
- Calendar integration for date selection
- Error handling with user-friendly notifications
- Loading states and retry logic for API operations
- Responsive design optimized for desktop and mobile

## Technology Stack

- **Frontend**: React 19 with TypeScript
- **Build Tool**: Vite
- **Routing**: React Router v7 for client-side navigation
- **Testing**: Vitest with React Testing Library
- **Styling**: CSS modules with component-scoped styles
- **Calendar**: React Calendar for date selection

## Quick Start

1. Clone the repository:

   ```bash
   git clone https://github.com/DovLozys/bootcamp-scheduler.git
   cd bootcamp-scheduler
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Configure environment variables:

   ```bash
   cp .env.example .env.local
   # Edit .env.local with your configuration
   ```

4. Start the development server:
   ```bash
   npm start
   ```

The application will be available at `http://localhost:5173`.

## Development Commands

- `npm start` - Start development server
- `npm run build` - Build for production
- `npm test` - Run test suite
- `npm run test:ui` - Run tests with UI interface
- `npm run preview` - Preview production build locally

## Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── App/            # Main application component
│   ├── Navbar/         # Navigation component
│   ├── EventCard/      # Event display component
│   └── ...
├── pages/              # Page-level components
├── hooks/              # Custom React hooks
├── utils/              # Utility functions and API client
├── types/              # TypeScript type definitions
└── styles/             # Global styles and CSS modules
```

## Environment Configuration

The application uses environment variables for configuration. Copy
`.env.example` to `.env.local` and configure:

- `VITE_API_BASE_URL` - Backend API base URL
- `VITE_API_TIMEOUT` - API request timeout in milliseconds
- `VITE_APP_NAME` - Application name
- `VITE_ENABLE_DEBUG` - Enable debug mode

## Contributing

1. Ensure all tests pass before submitting changes
2. Follow the existing code style and component patterns
3. Add tests for new functionality
4. Update documentation as needed
