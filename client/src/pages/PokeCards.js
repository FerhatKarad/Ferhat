import React from 'react'
import { useState, useEffect, useContext } from 'react'
import axios from 'axios'
import { AuthContext } from '../context/auth'
import Service from '../fileupload/Service.js'



export default function PokeCards() {

    const { user } = useContext(AuthContext)

    const [title, setTitle] = useState('')
    const [price, setPrice] = useState(0)
    const [imageUrl, setImageUrl] = useState('')

    const [pokemons, setPokemons] = useState([])
    const [fire, setFire] = useState(false)

    const storedToken = localStorage.getItem('authToken')



    const handleFileUpload = e => {     
        const uploadData = new FormData();
             uploadData.append("imageUrl", e.target.files[0]);
     
        Service
          .uploadImage(uploadData)
          .then(response => { console.log(response)
            setImageUrl(response.secure_url);
          })
          .catch(err => console.log("Error while uploading the file: ", err));
      };




    const handleSubmit = e => {
        e.preventDefault()
        const requestBody = { title: title, price: price, imageUrl: imageUrl, userId: user._id }
        axios.post('/pokecards/pokemon', requestBody, { headers: { Authorization: `Bearer ${storedToken}` } })

            .then(() => {
                setTitle('')
                setPrice('')
                setImageUrl('')
                setFire(!fire)
            })
            .catch(err => console.log(err))
    }

    useEffect(() => {
        axios.get('/pokecards/pokemon', { headers: { Authorization: `Bearer ${storedToken}` } })
            .then(response => {
                setPokemons(response.data.pokemons)
            })
            .catch(err => console.log(err))
    }, [fire])

    if (pokemons.length === 0) return <></>
    return (
        <div>
            <h1> Add a Pokemon Card</h1>

            <form onSubmit={handleSubmit}>
                <label hmtlfor="title"> Title:</label>
                <input id="title"
                    type="text"
                    value={title}
                    onChange={e => setTitle(e.target.value)}>
                </input>
                <label hmtlfor="price"> Price</label>
                <input id="price"
                    type="Number"
                    value={price}
                    onChange={e => setPrice(e.target.value)}>

                </input>

                <input id="file"
                    type="file"
                    value={imageUrl}
                    name="imageUrl"
                    onChange={handleFileUpload}>

                </input>

                <button type='submit'>Add this Card</button>
            </form>


            {
                pokemons.map(pokemon => {
                    return <h1 key={pokemon._id}>
                        {pokemon.title}
                        <p > {pokemon.price} $</p>
                        <img src={pokemon.imageUrl}/>
                    </h1>


                })
            }

        </div>
    )
}
