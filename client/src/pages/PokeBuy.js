import React from 'react'
import axios from 'axios'
import { useState, useEffect } from 'react'
import { response } from 'express'

export default function PokeBuy() {

    const [title, setTitle] = useState('')
    const [price, setPrice] = useState(0)
    const [imageUrl, setImageUrl] = useState('')
    const [description, setDescription] = useState('')
    const [userId, setUserId] = useState('')
    const [pokemons, setPokemons] = useState([])




    return (
        <div>
            <h1> Select your PokeCards</h1>
        </div>
    )
}
