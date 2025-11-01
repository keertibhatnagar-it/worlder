import { Routes, Route } from 'react-router-dom'
import Header from './components/Header'
import RegisterLogin from './pages/RegisterLogin'
import Home from './pages/Home'
import MovieDetail from './pages/MovieDetail'
import Favorites from './pages/Favorites'
import Landing from './pages/Landing'
import PrivateRoute from './components/PrivateRoute'
import './App.css'

export default function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <Routes>
          {/* Public routes */}
          <Route path="/" element={<Landing />} />
          <Route path="/auth" element={<RegisterLogin />} />

          {/* Private routes */}
          <Route
            path="/explore"
            element={
              <PrivateRoute>
                <Home />
              </PrivateRoute>
            }
          />
          <Route
            path="/movie/:id"
            element={
              <PrivateRoute>
                <MovieDetail />
              </PrivateRoute>
            }
          />
          <Route
            path="/favorites"
            element={
              <PrivateRoute>
                <Favorites />
              </PrivateRoute>
            }
          />
        </Routes>
      </main>
    </div>
  )
}
