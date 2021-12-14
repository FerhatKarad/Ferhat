import React from 'react'
import axios from 'axios'
import { useState, useEffect, useContext } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { AuthContext } from '../context/auth'



export default function EditPokeCards() {

    const { user } = useContext(AuthContext)

    const [title, setTitle] = useState('')
    const [price, setPrice] = useState(0)
    const [imageUrl, setImageUrl] = useState('')
    const [description, setDescription] = useState('')

    const { id } = useParams()
    let navigate = useNavigate();

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



    useEffect(() => {
        axios.get(`/pokecards/${id}`, { headers: { Authorization: `Bearer ${storedToken}` } })
            .then(response => {
                const { title, price, imageUrl, description } = response.data
                setTitle(title)
                setPrice(price)
                setDescription(description)
                setImageUrl(imageUrl)
            })
            .catch(err => console.log(err))
    }, [])

    const handleSubmit = e => {
        e.preventDefault()
        const requestBody = { title, price, imageUrl, description }
        axios.put(`/pokecards/${id}`, requestBody, { headers: { Authorization: `Bearer ${storedToken}` } })
            .then(response => {
                console.log(response)
                navigate(`/pokecards`)
            })
    }

    const deletePokeCard = () => {
        axios.delete(`/pokecards/${id}`, { headers: { Authorization: `Bearer ${storedToken}` } })
            .then(() => {
                console.log("deleted")
                // redirect to the projects list 
                navigate('/pokecards')
            })
            .catch(err => console.log(err))
    }

    return (
        <div>

            <h1>Edit Your PokeCard</h1>

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
            
                    <button>Edit this PokeCard</button>
              
            </form>
            <button onClick={deletePokeCard}>Delete this Pokecard from your List</button>

        </div>
    )
}


