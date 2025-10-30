import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { tmdb } from '../services/tmdb'


export default function MovieDetail(){
const { id } = useParams()
const [movie, setMovie] = useState<any|null>(null)
const [favIds, setFavIds] = useState<number[]>(() => {
try { return JSON.parse(localStorage.getItem('worlder_favs')||'[]') } catch { return [] }
})


useEffect(()=>{ if (!id) return; tmdb.getMovieDetails(Number(id)).then(r=>setMovie(r)) },[id])


function toggleFav(){
if (!movie) return
const ids = new Set(favIds)
if (ids.has(movie.id)) ids.delete(movie.id) 
else ids.add(movie.id)
const arr = Array.from(ids)
setFavIds(arr)
localStorage.setItem('worlder_favs', JSON.stringify(arr))
}


if (!movie) return <div className="p-6">Loading...</div>


const year = (movie.release_date || '').slice(0,4)
const cast = movie.credits?.cast?.slice(0,8) || []
const trailer = movie.videos?.results?.find((v:any)=> v.type==='Trailer' && v.site==='YouTube')


return (
<div className="max-w-5xl mx-auto px-4 py-6 grid grid-cols-1 md:grid-cols-3 gap-6">
<div>
<img src={tmdb.image(movie.poster_path, 'w500')} alt={movie.title} className="rounded-md" />
<div className="mt-3">
<button onClick={toggleFav} className="btn bg-yellow-50">{favIds.includes(movie.id) ? 'Remove from favourites' : 'Add to favourites'}</button>
</div>
</div>
<div className="md:col-span-2">
<h1 className="text-2xl font-semibold">{movie.title} <span className="text-gray-500 text-sm">({year})</span></h1>
<div className="text-sm text-gray-600 mt-2">{movie.genres?.map((g:any)=>g.name).join(', ')} • {movie.runtime} min • Rating: {movie.vote_average}</div>
<p className="mt-4 text-gray-700">{movie.overview}</p>


<h3 className="mt-6 font-semibold">Cast</h3>
<div className="flex gap-3 mt-2 overflow-auto">{cast.map((c:any)=> (
<div key={c.cast_id} className="text-sm text-center" style={{minWidth:120}}>
<img src={tmdb.image(c.profile_path, 'w185')} alt={c.name} className="h-36 w-full object-cover rounded-md" />
<div className="mt-1">{c.name}</div>
<div className="text-xs text-gray-500">as {c.character}</div>
</div>
))}</div>


{trailer && (
<div className="mt-6">
<h3 className="font-semibold">Trailer</h3>
<div className="mt-2">
<iframe title="trailer" width="100%" height="400" src={`https://www.youtube.com/embed/${trailer.key}`} allowFullScreen />
</div>
</div>
)}


</div>
</div>
)
}