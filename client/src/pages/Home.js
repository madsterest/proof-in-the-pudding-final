import React, { useEffect, useState } from "react";

import { Wrap, Center } from "@chakra-ui/react";
import Card from "../components/Card";
import Auth from "../utils/auth";
import { getRecipes, addToFavourites } from "../utils/API";

export default function Home() {
  const [recipes, setRecipes] = useState([]);

  console.log(recipes);

  useEffect(() => {
    const getRecipeData = async () => {
      try {
        const token = Auth.loggedIn() ? Auth.getToken() : null;
        if (!token) {
          return false;
        }
        console.log(token);
        const response = await getRecipes();

        if (!response.ok) {
          throw new Error("Something went wrong");
        }
        const recipeData = await response.json();

        console.log(recipeData);
        setRecipes(recipeData);

        console.log(recipes);
      } catch (err) {
        console.error(err);
      }
    };
    getRecipeData();
  }, []);

  const addFavourite = (event) => {
    const recipeId = event.target.id;
    const token = Auth.loggedIn() ? Auth.getToken() : null;
    if (!token) {
      return false;
    }

    const userId = Auth.getUserId(token);
    console.log(recipeId, userId);

    const getRecipeData = async () => {
      try {
        const response = await addToFavourites(recipeId, userId, token);

        if (!response.ok) {
          throw new Error("Something went wrong");
        }

        const recipeData = await response.json();
        console.log(recipeData);
      } catch (err) {
        console.error(err);
      }
    };
    getRecipeData();
  };

  return (
    <>
      <Center color="#009797" mb="6" fontSize="2xl">
        See what's cookin!
      </Center>
      <Wrap spacing="20" justify="center">
        {recipes?.map((recipe) => {
          return (
            <Card
              key={recipe._id}
              title={recipe.name}
              prep={recipe.prepTime}
              cook={recipe.cookTime}
              img={recipe.img}
              description={recipe.description}
              rating={recipe.rating}
              _id={recipe._id}
              user={recipe.user.name}
              favourite={addFavourite}
            />
          );
        })}
      </Wrap>
    </>
  );
}
