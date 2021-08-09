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
router.route("/favourites/:id").get(authMiddleware, getFavourites);
router.route("/new").post(authMiddleware, createRecipe);
router.route("/:id").get(getIndividRecipe);
router.route("/edit").put(authMiddleware, editRecipe);
router.route("/delete/:recipeid/:userid").delete(authMiddleware, deleteRecipe);
router.route("/favourites/:recipeid").put(authMiddleware, addToFavourites);
router.route("/editfavourites/:userid").put(authMiddleware, editFavourites);
router
  .route("/deletefavourite/:userid/:recipeid")
  .put(authMiddleware, deleteFavourites);
router.route("/comment/:recipeid").post(authMiddleware, addComment);

module.exports = router;
