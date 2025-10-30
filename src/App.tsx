
import { Routes, Route } from 'react-router-dom'
import Header from './components/Header'
import RegisterLogin from './pages/RegisterLogin'
import Home from './pages/Home'
import MovieDetail from './pages/MovieDetail'
import Favorites from './pages/Favorites'
import './App.css'
import Landing from './pages/Landing'

export default function App(){
return (
<div className="min-h-screen flex flex-col">
<Header />
<main className="flex-1">
<Routes>
<Route path="/" element={<Landing/>} />
<Route path="/explore" element={<Home />} />
<Route path="/auth" element={<RegisterLogin />} />
<Route path="/movie/:id" element={<MovieDetail />} />
<Route path="/favorites" element={<Favorites />} />
</Routes>
</main>
</div>
)
}