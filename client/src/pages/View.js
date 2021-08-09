import React, { useEffect, useState } from "react";

import { getIndividualRecipe, addComment } from "../utils/API";
import SingleCard from "../components/SingleCard";
import Auth from "../utils/auth";

export default function View(props) {
  const [recipes, setRecipes] = useState({
    name: "",
    description: "",
    prepTime: "",
    cookTime: "",
    ingredients: [""],
    instructions: [""],
    img: "",
    user: "",
    comments: [""],
  });

  const [recipeId, setRecipeId] = useState("");

  const [hasToken, setHasToken] = useState(true);
  const [comment, setComment] = useState({ comment: "", username: "" });

  useEffect(() => {
    const token = Auth.loggedIn() ? Auth.getToken() : null;
    if (!token) {
      setHasToken(false);
    }
    const username = Auth.getUserName(token);
    console.log(username);

    setComment({ ...comment, username: username });

    const getRecipeData = async () => {
      const recipeId = props.match.params.id;

      setRecipeId(recipeId);
      try {
        const response = await getIndividualRecipe(recipeId);

        if (!response.ok) {
          throw new Error("Something went wrong");
        }
        const recipeData = await response.json();
        console.log(recipeData);

        setRecipes(recipeData[0]);
      } catch (err) {
        console.error(err);
      }
    };
    getRecipeData();
  }, []);

  const handleOnChange = (event) => {
    const { value } = event.target;
    setComment({ ...comment, comment: value });
  };

  const validate = (event) => {
    if (comment.comment === "") {
      return;
    }

    handleFormSubmit(event);
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    console.log(comment);

    try {
      const token = Auth.loggedIn() ? Auth.getToken() : null;

      if (!token) {
        return false;
      }

      const response = await addComment(recipeId, comment, token);

      if (!response.ok) {
        throw new Error("Something went wrong");
      }
      const recipeData = await response.json();

      console.log(recipeData);
      setRecipes({ ...recipes, comments: recipeData.comments });

      setComment({ comment: "", user: "" });
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <SingleCard
      key={recipes._id}
      name={recipes.name}
      prepTime={recipes.prepTime}
      cookTime={recipes.cookTime}
      ingredients={recipes.ingredients}
      instructions={recipes.instructions}
      img={recipes.img}
      description={recipes.description}
      user={recipes.user}
      comments={recipes.comments}
      commentvalue={comment.comment}
      onChange={handleOnChange}
      onClick={validate}
      loggedIn={hasToken}
    />
  );
}
