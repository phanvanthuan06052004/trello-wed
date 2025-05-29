# Trello Frontend

Frontend for Trello application using React, Vite, and Material UI.

## Key Features

- **User Management**: Registration, login, email verification
- **Board Management**: Create, edit, display, and manage boards
- **Drag & Drop**: Drag and drop columns and cards with DnD Kit
- **User-Friendly Interface**: Modern UI with Material UI
- **Notifications**: Notification system with React Toastify
- **Real-time Communication**: Using Socket.io for real-time data updates
- **State Persistence**: Using Redux Persist to save user state

## Technologies

- **React**: UI library
- **Vite**: High-performance build tool
- **Material UI**: Modern UI framework
- **Redux & Redux Toolkit**: Application state management
- **Redux Persist**: State persistence to localStorage
- **React Router**: Routing management
- **React Hook Form**: Form management and validation
- **@dnd-kit**: Drag and drop library
- **Axios**: HTTP client
- **Socket.io-client**: Socket connection to backend
- **ESLint**: Code linting and standardization

## Project Structure

```
trello-wed/
├── public/                # Static assets
├── src/
│   ├── Apis/              # API calls and mock data
│   ├── assets/            # Assets (icons, images)
│   ├── components/        # Reusable components
│   │   ├── AppBar/        # Navigation bar
│   │   ├── Form/          # Form components
│   │   ├── Loading/       # Loading components
│   │   ├── Modal/         # Modals
│   │   └── ModeSelect/    # Light/dark mode selector
│   ├── customHooks/       # Custom React hooks
│   ├── customLib/         # Custom libraries
│   ├── pages/             # Application pages
│   │   ├── 404/           # Not found page
│   │   ├── Auth/          # Login/Register
│   │   ├── Boards/        # Display and manage boards
│   │   ├── Settings/      # User settings
│   │   └── Users/         # User management
│   ├── redux/             # Redux store, slices
│   ├── utils/             # Utility functions
│   ├── App.jsx            # Root component
│   ├── main.jsx           # Entry point
│   ├── socketClient.js    # Socket.io configuration
│   └── theme.js           # Material UI theme
├── index.html             # HTML template
├── vite.config.js         # Vite configuration
└── package.json           # Dependencies and scripts
```

## Setup

1. Clone repository
```bash
git clone <repository-url>
cd trello-wed
```

2. Install dependencies
```bash
npm install
```

3. Create .env.local file based on .env.example template (if available) and update environment variables

4. Run the application
```bash
npm run dev
```

5. Build for production
```bash
npm run build
```

## Usage Guide

1. Register a new account or login if you already have one
2. Create a new board or access an existing one
3. Add columns and cards, and drag-drop to arrange them
4. Invite other members to join the board
5. Customize account settings in the Settings page

## Acknowledgments

This project was created as part of my learning journey by following the TrungQuanDev tutorial series on YouTube.
