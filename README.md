# Worlder

A modern React + TypeScript application for discovering and exploring movies using the TMDB (The Movie Database) API. Worlder provides a beautiful, responsive interface with authentication, movie browsing, search functionality, and favorites management.

## 🎬 Features

- **User Authentication**

  - Email/password registration (password stored as base64 hash for demo purposes)
  - Social login options (Google, Facebook, Apple) — UI-only implementation
  - Session management via localStorage

- **Movie Discovery**

  - Browse movies by categories: Popular, Now Playing, Upcoming, Top Rated
  - Search movies by keyword
  - View detailed movie information including:
    - Cast information
    - Release year and synopsis
    - Ratings
    - Movie trailers (YouTube via TMDB video data)

- **Personalization**

  - Save favorite movies to localStorage
  - Add/remove favorites from any movie page
  - Dedicated favorites page

- **Internationalization**

  - Multi-language support (English, Arabic, Spanish, French)
  - RTL (Right-to-Left) support for Arabic

- **Modern UI/UX**
  - Responsive design with Tailwind CSS
  - Smooth animations with Framer Motion
  - Carousel components for movie browsing
  - Toast notifications for user feedback

## 🛠️ Tech Stack

- **Frontend Framework**: React 19 with TypeScript
- **Build Tool**: Vite 7
- **Styling**: Tailwind CSS 4
- **Routing**: React Router DOM 7
- **HTTP Client**: Axios
- **Animations**: Framer Motion
- **UI Components**: React Icons, React Slick (carousel)
- **Internationalization**: i18next, react-i18next
- **Notifications**: React Hot Toast
- **Authentication**: localStorage-based (demo implementation)
- **External API**: TMDB (The Movie Database)

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (version 16.x or higher recommended)
- **npm** (comes with Node.js) or **yarn**
- **TMDB API Key** ([Get one here](https://www.themoviedb.org/settings/api))

## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone <repository-url>
cd worlder
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Environment Configuration

Create a `.env` file in the root directory of the project:

```env
VITE_TMDB_API_KEY=your_tmdb_api_key_here
```

**Note**: You can also add Firebase configuration variables if needed:

```env
VITE_FIREBASE_API_KEY=your_firebase_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_firebase_auth_domain
VITE_FIREBASE_PROJECT_ID=your_firebase_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_firebase_storage_bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=your_firebase_messaging_sender_id
VITE_FIREBASE_APP_ID=your_firebase_app_id
VITE_FIREBASE_MEASUREMENT_ID=your_firebase_measurement_id
```

### 4. Run the Application

#### Development Mode

Start the development server:

```bash
npm run dev
```

The application will be available at `http://localhost:5173` (or another port if 5173 is occupied).

#### Build for Production

To create a production build:

```bash
npm run build
```

The optimized build will be created in the `dist/` directory.

#### Preview Production Build

To preview the production build locally:

```bash
npm run preview
```

This will serve the production build at `http://localhost:4173` (or another port).

#### Lint Code

To check for code quality issues:

```bash
npm run lint
```

### Running the Desktop App (Electron)

Build & Run Electron App

```bash
npm run start
```

This command will:

Build your React app into /dist

Compile Electron TypeScript into /dist-electron

Launch a desktop window running the app

### File Structure for Electron

```
electron/
├── main.ts # Electron main process (entry)
└── tsconfig.json # Electron TypeScript config
dist/ # React production build
dist-electron/ # Compiled Electron output
```

### Electron Features

- Runs offline with local data (favorites, login)

- Uses local TMDB and Firebase configurations

- Same UI/UX as the web version

- Built with TypeScript and CommonJS support for compatibility

## 📁 Project Structure

```
worlder/
├── public/                 # Static assets
├── electron/
│   ├── main.ts
│   └── tsconfig.json
├── dist/
├── dist-electron/
├── src/
│   ├── components/         # Reusable React components
│   │   ├── Header.tsx
│   │   ├── MovieCard.tsx
│   │   └── PrivateRoute.tsx
│   ├── i18n/               # Internationalization configuration
│   │   ├── config.ts
│   │   └── locales/        # Translation files
│   │       ├── en.json
│   │       ├── ar.json
│   │       ├── es.json
│   │       └── fr.json
│   ├── lib/                # Utility libraries
│   │   ├── auth.ts         # Authentication helpers
│   │   └── firebase.ts     # Firebase configuration
│   ├── pages/              # Page components
│   │   ├── Landing.tsx     # Landing page
│   │   ├── RegisterLogin.tsx
│   │   ├── Home.tsx        # Movie browsing
│   │   ├── MovieDetail.tsx # Movie details page
│   │   └── Favorites.tsx   # Favorites page
│   ├── services/           # API services
│   │   ├── api.ts          # API utilities
│   │   └── tmdb.ts         # TMDB API integration
│   ├── App.tsx             # Main app component
│   ├── main.tsx            # Entry point
│   └── index.css           # Global styles
├── dist/                   # Production build output
├── package.json
├── vite.config.ts          # Vite configuration
└── tsconfig.json           # TypeScript configuration
```

## 🔐 Authentication

The application uses localStorage for authentication (demo implementation):

- Users are stored in `localStorage` with key `worlder_users`
- Current session is stored with key `worlder_session`
- Passwords are hashed using base64 (for demo purposes only)

**Note**: This is a demo implementation. For production, use a proper authentication service.

## 💾 LocalStorage Keys

The application uses the following localStorage keys:

- `worlder_users` - Array of registered users
- `worlder_session` - Currently signed-in user data
- `worlder_favs` - Array of favorite movie IDs

## 🎯 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## 📝 Notes

- This is a demo application showcasing frontend capabilities
- Authentication is handled via localStorage (not for production use)
- Social logins (Google, Facebook, Apple) are UI-only implementations
- TMDB API key is required for the application to function
- The application supports multiple languages with RTL support for Arabic

## 📄 License

This project is for educational/demo purposes.
