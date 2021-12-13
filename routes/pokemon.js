const router = require('express').Router()
const Pokemon = require('../models/Pokemon.model')
const {fileUploader, cloudinary} = require('../config/cloudinary.js');

router.post("/upload", fileUploader.single("imageUrl"), (req, res, next) => {
    console.log(req.file.path)
    if (!req.file) {
      next(new Error("No file uploaded!"));
      return;
    }
    
    res.json({ secure_url: req.file.path });
  });

router.post('/pokemon', (req, res, next) => {
    const { title, price, imageUrl, userId, description } = req.body
    console.log(req.body)

    Pokemon.create({ title, price, imageUrl, userId, description })
        .then((createdPokemon) => {
            console.log(createdPokemon)
            res.status(201).json({ createdPokemon });
        })
        .catch((err) => next(err))
})

router.get('/pokemon', (req, res, next) => {
   
    Pokemon.find()
        .then((pokemons) =>  res.status(200).json({ pokemons }))
        .catch(err => res.status(400).json(err))
})



module.exports = router;