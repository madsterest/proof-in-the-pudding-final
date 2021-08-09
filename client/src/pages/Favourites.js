import React, { useEffect, useState } from "react";
import { Wrap, Center } from "@chakra-ui/react";
import Card from "../components/Card";
import Auth from "../utils/auth";
import { getFavourites, deleteFavourite } from "../utils/API";

export default function Favourites() {
  const [hasToken, setHasToken] = useState(true);
  const [recipes, setRecipes] = useState([]);
  const [user, setUser] = useState();
  console.log(user);

  console.log(recipes);
  useEffect(() => {
    const getRecipes = async () => {
      try {
        const token = Auth.loggedIn() ? Auth.getToken() : null;

        if (!token) {
          setHasToken(false);
          return false;
        }
        const user = Auth.getUserId(token);
        setUser(user);

        console.log(user);
        const response = await getFavourites(user, token);

        if (!response.ok) {
          throw new Error("Unable to finish request");
        }

        const userData = await response.json();
        console.log(userData);

        const recipeData = userData[0].favourites;

        setRecipes(recipeData);
      } catch (err) {
        console.error(err);
      }
    };
    getRecipes();
  }, []);

  if (!hasToken) {
    window.location.assign("/login");
  }

  const handleEditClick = (event) => {
    const recipeId = event.target.id;
    console.log(recipeId);
    window.location.assign(`/edit/favs/${recipeId}`);
  };

  const handleDelete = (event) => {
    const recipeId = event.target.id;
    console.log(recipeId, user);

    const removeRecipe = async () => {
      try {
        const token = Auth.loggedIn() ? Auth.getToken() : null;

        if (!token) {
          return false;
        }

        const response = await deleteFavourite(recipeId, user, token);

        if (!response.ok) {
          throw new Error("something went wrong");
        }
        const userData = await response.json();
        console.log(userData);

        setRecipes(userData.favourites);
      } catch (err) {
        console.error(err);
      }
    };
    removeRecipe();
  };

  return (
    <>
      <Center mb="6" fontSize="2xl" color="#009797">
        Your Favourite Flavours
      </Center>

      <Wrap spacing="30px" justify="center">
        {recipes?.map((recipe, index) => {
          return (
            <Card
              key={recipe._id}
              _id={recipe._id}
              title={recipe.name}
              prep={recipe.prepTime}
              cook={recipe.cookTime}
              ingredients={recipe.ingredients}
              instructions={recipe.instructions}
              description={recipe.description}
              rating={recipe.rating}
              img={recipe.img}
              index={index + 1}
              onIndexEdit={handleEditClick}
              onDelete={handleDelete}
            ></Card>
          );
        })}
      </Wrap>
    </>
  );
}
