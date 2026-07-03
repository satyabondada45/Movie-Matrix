import {useState,useEffect} from "react"
function App(){
const[movies,setMovies]=useState([])
const[loading,setLoading]=useState(false);
const[search,setSearch]=useState("")
const[error,setError]=useState("")
const[movieDetails,setMovieDetails]=useState(null)
async function getMovies(){
    setLoading(true)
    setError("")
    try{
const response=await fetch(`https://www.omdbapi.com/?apikey=${import.meta.env.VITE_OMDB_KEY}&s=${search}`)
    
    if(!response.ok){
        throw new Error("Movie not Found")
    }

const data=await response.json()
if(data.Response==="False"){
    throw new Error("Movie Not Found")
}
console.log(data)
setMovies(data.Search)
setError("")
    }

    catch(error){
       setError("Movie not Found")
       setMovies([])
    }
setLoading(false)
}

return(

<div className="main-div">
    <h1>Movie Matrix</h1>
    <div className="search">
<input type="text"
placeholder="Enter movie"
value={search}
onChange={(e)=>setSearch(e.target.value)}/>

<button onClick={getMovies}>
    search
    </button>
    <div className="movie-card">

{loading&&<h3>loading....</h3>}
{error && <h2>{error}</h2>}
{movies.map((data,index)=>
<div key={data.imdbID}>
<h3>{data.Title}</h3>
{data.Poster!=="N/A"?
<img src={data.Poster} width="200px" alt={data.Title}   /> :
<h3>NO IMAGE FOUND</h3>
} 
<h3>{data.Year}</h3>

</div>

)}
 </div>
    </div>
    </div>

)
}
export default App;