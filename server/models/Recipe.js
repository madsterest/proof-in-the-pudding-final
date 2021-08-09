const { Schema, model } = require("mongoose");

const recipeSchema = new Schema({
  name: {
    type: String,
    unique: true,
  },
  prepTime: {
    type: String,
  },
  cookTime: {
    type: String,
  },
  ingredients: [
    {
      type: String,
    },
  ],
  img: {
    type: String,
  },
  instructions: [
    {
      type: String,
    },
  ],
  description: {
    type: String,
  },
  rating: [
    {
      type: Number,
      max: 5,
    },
  ],
  comments: [
    {
      type: Schema.Types.ObjectId,
      ref: "Comment",
    },
  ],
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
});

const Recipe = model("Recipe", recipeSchema);

module.exports = Recipe;
