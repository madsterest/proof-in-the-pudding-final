const { Recipe, User, Comment } = require("../models");
const { signToken } = require("../utils/auth");
const path = require("path");

const saveImg = (img) =>
  new Promise((resolve, reject) => {
    img.mv(path.join(__dirname, "../uploads/" + img.name), function (err) {
      if (err) {
        reject(err);
      } else {
        resolve();
      }
    });
  });

module.exports = {
  async getRecipes(req, res) {
    try {
      const allRecipes = await Recipe.find({}).populate({ path: "user" });

      res.status(200).json(allRecipes);
    } catch (err) {
      console.log(err);
      return res.status(400).json(err);
    }
  },
  async getUserRecipes(req, res) {
    try {
      const userRecipes = await User.find({ _id: req.params.id }).populate({
        path: "recipes",
      });

      res.status(200).json(userRecipes);
    } catch (err) {
      console.log(err);
      return res.status(400).json(err);
    }
  },
  async createUser(req, res) {
    const user = await User.create(req.body);

    if (!user) {
      return res.stats(400).json({ message: "Unable to create user" });
    }

    const token = signToken(user);
    res.json({ token, user });
  },
  async userLogin(req, res) {
    const user = await User.findOne({ username: req.body.username });

    if (!user) {
      res.status(400).json({ message: "Unable to sign in" });
    }
    console.log("Correct User");

    const checkPw = await user.passwordCheck(req.body.password);

    if (!checkPw) {
      return res.status(400).json({ message: "Unable to sign in" });
    }

    const token = signToken(user);
    res.json({ token, user });
  },
  async createRecipe(req, res) {
    try {
      console.log(req.files);
      const img = req.files.img;
      await saveImg(img);

      const newRecipe = await Recipe.create({ ...req.body, img: img.name });
      const recipeId = newRecipe._id;
      const userId = newRecipe.user;
      const addToUser = await User.findOneAndUpdate(
        { _id: userId },
        { $push: { recipes: recipeId } }
      );
      res.status(200).json(newRecipe);
    } catch (err) {
      console.log(err);
      return res.status(400).json(err);
    }
  },
  async getIndividRecipe(req, res) {
    try {
      const recipeData = await Recipe.find({ _id: req.params.id }).populate({
        path: "comments",
      });

      res.status(200).json(recipeData);
    } catch (err) {
      console.log(err);
      return res.status(400).json(err);
    }
  },
  async editRecipe(req, res) {
    try {
      const editData = await Recipe.findOneAndUpdate(
        { _id: req.body._id },
        req.body,
        { upsert: true, new: true }
      );
      res.status(200).json(editData);
    } catch (err) {
      console.log(err);
      return res.status(400).json(err);
    }
  },
  async deleteRecipe(req, res) {
    try {
      const deleteData = await Recipe.findOneAndDelete({
        _id: req.params.recipeid,
      });

      const deleteRecipeData = await User.findOneAndUpdate(
        {
          _id: req.params.userid,
        },
        { $pull: { recipes: req.params.recipeid } },
        { new: true }
      ).populate({ path: "recipes" });

      res.status(200).json(deleteRecipeData);
    } catch (err) {
      console.log(err);
      return res.status(400).json(err);
    }
  },
  async addToFavourites(req, res) {
    try {
      const recipeData = await Recipe.find({ _id: req.params.recipeid });

      const userUpdate = await User.findOneAndUpdate(
        { _id: req.body.userId },
        {
          $addToSet: {
            favourites: recipeData,
          },
        },
        { new: true }
      );

      res.status(200).json(userUpdate);
    } catch (err) {
      console.log(err);
      return res.status(400).json(err);
    }
  },
  async getFavourites(req, res) {
    try {
      const userData = await User.find({ _id: req.params.id });
      res.status(200).json(userData);
    } catch (err) {
      console.log(err);
      return res.status(400).json(err);
    }
  },
  async editFavourites(req, res) {
    try {
      const userData = await User.findOneAndUpdate(
        { _id: req.params.userid },
        { $pull: { favourites: { _id: req.body._id } } }
      );

      const updateRecipe = await User.findOneAndUpdate(
        {
          _id: req.params.userid,
        },
        { $addToSet: { favourites: req.body } },
        { new: true }
      );
      res.status(200).json(updateRecipe);
    } catch (err) {
      console.log(err);
      return res.status(400).json(err);
    }
  },
  async deleteFavourites(req, res) {
    try {
      const userData = await User.findOneAndUpdate(
        { _id: req.params.userid },
        { $pull: { favourites: { _id: req.params.recipeid } } },
        { new: true }
      );
      res.status(200).json(userData);
    } catch (err) {
      console.log(err);
      return res.status(400).json(err);
    }
  },

  async addComment(req, res) {
    try {
      const addComment = await Comment.create(req.body);

      const commentId = addComment._id;

      const addToRecipe = await Recipe.findOneAndUpdate(
        { _id: req.params.recipeid },
        { $push: { comments: commentId } },
        { new: true }
      ).populate({
        path: "comments",
      });

      res.status(200).json(addToRecipe);
    } catch (err) {
      console.log(err);
      return res.status(400).json(err);
    }
  },
};
