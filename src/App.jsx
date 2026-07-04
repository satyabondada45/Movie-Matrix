import { useState } from "react"

function App(){

const [movies,setMovies] = useState([])
const [loading,setLoading] = useState(false)
const [search,setSearch] = useState("")
const [error,setError] = useState("")

async function getMovies(){

    if(search.trim() === ""){
        setError("Please Enter Movie Name")
        return
    }

    setLoading(true)
    setError("")

    try{

        const response = await fetch(
`https://api.themoviedb.org/3/search/movie?api_key=${import.meta.env.VITE_TMDB_KEY}&query=${search}`
        )

        const data = await response.json()

        console.log(data)

        if(data.results.length === 0){
            throw new Error("Movie Not Found")
        }

        setMovies(data.results)

    }

    catch(error){

        setError("Movie Not Found")
        setMovies([])

    }

    setLoading(false)
}

async function getTrailer(id){
    const response=await fetch(`https://api.themoviedb.org/3/movie/${id}/videos?api_key=${import.meta.env.VITE_TMDB_KEY}`)
    const data=await response.json();

    const trailer=await data.results.find((video)=>video.type==="Trailer")
    if(trailer){
        window.open(`https://www.youtube.com/watch?v=${trailer.key}`)
    }
}


return(

<div className="main-div">

    <h1 className="title">Movie Matrix</h1>

    <div className="search-box">

        <input
        type="text"
        placeholder="Enter Movie Name"
        value={search}
        onChange={(e)=>setSearch(e.target.value)}
        />

        <button onClick={getMovies}>
            Search
        </button>

    </div>

    {loading && <h2>Loading....</h2>}

    {error && <h2>{error}</h2>}

    <div className="movie-container">

    {movies.map((movie)=>

    <div className="movie-card" key={movie.id}>

        <h2>{movie.title}</h2>

        {movie.poster_path ? (

        <img
        src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
        alt={movie.title}
        width="250px"
        />

        ) : (

        <h3>No Image Found</h3>

        )}

        <p><strong>Release Date:</strong> {movie.release_date}</p>

        <p><strong>Rating:</strong> ⭐ {movie.vote_average}</p>

        <p>{movie.overview}</p>
        <button className ="Trailer-btn"onClick={()=>getTrailer(movie.id)}>Watch Trailer</button>

    </div>

    )}

    </div>

</div>

)

}

export default App