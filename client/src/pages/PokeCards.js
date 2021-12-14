import React from 'react'
import { useState, useEffect, useContext } from 'react'
import axios from 'axios'
import { AuthContext } from '../context/auth'
import { Link } from 'react-router-dom'




export default function PokeCards() {

    const { user } = useContext(AuthContext)

    const [title, setTitle] = useState('')
    const [price, setPrice] = useState(0)
    const [imageUrl, setImageUrl] = useState('')
    const [description, setDescription] = useState('')

    const [pokemons, setPokemons] = useState([])
    const [fire, setFire] = useState(false)
    const [file, setFile] = useState('')

    const storedToken = localStorage.getItem('authToken')


    const uploadImage = (file) => {
        return axios
            .post("/pokecards/upload", file, { headers: { Authorization: `Bearer ${storedToken}` } })
            .then(res => res.data)
    };


    const handleFileUpload = e => {
        const uploadData = new FormData();
        console.log('uploadData', e.target.files[0])
        uploadData.append("imageUrl", e.target.files[0]);


        uploadImage(uploadData)
            .then(response => {
                console.log("drin")
                console.log(response.secure_url)
                setImageUrl(response.secure_url);
            })
            .catch(err => console.log("Error while uploading the file: ", err));
    };




    const handleSubmit = e => {
        e.preventDefault()
        const requestBody = { title: title, description: description, price: price, imageUrl: imageUrl, userId: user._id }
        if (imageUrl === "") return
        axios.post('/pokecards/pokemon', requestBody, { headers: { Authorization: `Bearer ${storedToken}` } })

            .then(() => {
                setTitle('')
                setPrice('')
                setImageUrl('')
                setDescription('')
                setFire(!fire)
            })
            .catch(err => console.log(err))
    }

    useEffect(() => {
        axios.get('/pokecards/pokemon', { headers: { Authorization: `Bearer ${storedToken}` } })
            .then(response => {
                console.log(response.data)
                setPokemons(response.data.pokemons)
            })
            .catch(err => console.log(err))
    }, [fire])

    if (pokemons.length === 0) return <></>
    return (
        <div>
            <h1> Add a Pokemon Card</h1>

            <form className='pokemon-form' onSubmit={handleSubmit}>
                <label hmtlfor="title"> Title : </label>
                <input id="title"
                    type="text"
                    value={title}
                    onChange={e => setTitle(e.target.value)}>
                </input>
                <label hmtlfor="price"> Price : </label>
                <input id="price"
                    type="Number"
                    value={price}
                    onChange={e => setPrice(e.target.value)}>

                </input>
                <label hmtlfor="description"> Description : </label>
                <input className='input-description' id="description" placeholder=' write informations here'

                    type="text"
                    value={description}
                    onChange={e => setDescription(e.target.value)}>

                </input>

                <input className='file' id="file"
                    type="file"
                    name="imageUrl"
                    onChange={handleFileUpload}>

                </input>

                <button type='submit'>Add this Card</button>
            </form>


            {
                pokemons.map(pokemon => {
                    return <div className='pokecards' key={pokemon._id}>
                        <h1> {pokemon.title}</h1>
                         <img className='box' src={pokemon.imageUrl} />
                        
                        <p className='price'> {pokemon.price} $</p>
                        <p className='description'>{pokemon.description}</p>
                         <Link to={`/pokecards/edit/${pokemon._id}`}>
						<button>Edit this PokeCard</button>
					</Link> 
                       
                    </div>


                })
            }

        </div>
    )
}
