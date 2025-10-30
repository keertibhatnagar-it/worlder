import React from 'react'
import { Link } from 'react-router-dom'
import { tmdb } from '../services/tmdb'


export default function MovieCard({ movie }: { movie: any }) {
return (
<div className="bg-white rounded-md shadow-sm overflow-hidden">
<Link to={`/movie/${movie.id}`}>
<img src={tmdb.image(movie.poster_path, 'w342')} alt={movie.title} className="w-full h-56 object-cover" />
</Link>
<div className="p-3">
<h3 className="text-sm font-semibold truncate">{movie.title}</h3>
<div className="text-xs text-gray-500">{new Date(movie.release_date || '').getFullYear() || '—'} • {movie.vote_average}</div>
</div>
</div>
)
}