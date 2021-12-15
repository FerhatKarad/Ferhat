
import React from 'react'
import axios from 'axios'
import { useState, useEffect } from 'react'

export default function PokeBuy() {
   
    
    const [query, setQuery] = useState('')

    const [pokemons, setPokemons] = useState([])
    const [fire, setFire] = useState(false)

   const storedToken = localStorage.getItem('authToken')

const handleSearch = event => {
    setQuery(event.target.value)
  } 

   useEffect(() => {
    axios.get('/pokecards/pokemon', { headers: { Authorization: `Bearer ${storedToken}` } })
        .then(response => 
            setPokemons(response.data.pokemons))
        .catch(err => console.log(err))
}, [fire])
 


let pokemonsList  = pokemons.filter(pokemon =>
    `${pokemon.title}`.toLowerCase().includes(query)
  );

    return (
        <div>

            <h1>Hi PokeBuy</h1>
            <form>
            <label hmtlfor="search" placeholder='Search by Name'> Search by Name : </label>
                <input id="search"
                    type="text"
                    value={query}
                    onChange={handleSearch}
                />
               
            </form>
        {
            pokemonsList.map(pokemon => {return <div className='pokecards' key={pokemon._id}>
            <h1> {pokemon.title}</h1>
             <img className='box' src={pokemon.imageUrl} />
            
            <p className='price'> {pokemon.price} $</p>
            <p className='description'>{pokemon.description}</p>
             
           
        </div>})
        }
            
            
        </div>
    )
}
