const { Schema, model, SchemaTypes } = require('mongoose')
const pokemonSchema = new Schema(
  {
    title: String,
    price: Number,
    imageUrl: String,
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
  },
  {
    timestamps: true,
  }
)

const Pokemon = model('Pokemon', pokemonSchema)
module.exports = Pokemon
