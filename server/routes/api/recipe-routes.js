const router = require("express").Router();
const {
  getRecipes,
  getUserRecipes,
  createRecipe,
  getIndividRecipe,
  editRecipe,
  deleteRecipe,
  addToFavourites,
  getFavourites,
  editFavourites,
  deleteFavourites,
  addComment,
} = require("../../controller/recipe");

const { authMiddleware } = require("../../utils/auth");

router.route("/").get(getRecipes);
router.route("/favourites/:id").get(getFavourites);
router.route("/new").post(createRecipe);
router.route("/:id").get(getIndividRecipe);
router.route("/edit").put(editRecipe);
router.route("/delete/:recipeid/:userid").delete(deleteRecipe);
router.route("/favourites/:recipeid").put(addToFavourites);
router.route("/editfavourites/:userid").put(editFavourites);
router.route("/deletefavourite/:userid/:recipeid").put(deleteFavourites);
router.route("/comment/:recipeid").post(addComment);

module.exports = router;
