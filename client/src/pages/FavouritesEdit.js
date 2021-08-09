import React, { useState, useEffect } from "react";
import Auth from "../utils/auth";
import { editFavourites, getFavourites } from "../utils/API";
import Form from "../components/Form";

export default function FavouritesEdit(props) {
  const [formData, addFormData] = useState({
    name: "",
    description: "",
    prepTime: "",
    cookTime: "",
    ingredients: [""],
    instructions: [""],
    user: "",
  });
  const [user, setUser] = useState();

  const [formError, addFormError] = useState({
    name: false,
    description: false,
    prepTime: false,
    cookTime: false,
    ingredients: false,
    instructions: false,
    img: false,
  });

  console.log(formError);
  console.log(formData);

  useEffect(() => {
    const getRecipeData = async () => {
      const recipeIndex = props.match.params.id;

      try {
        const token = Auth.loggedIn() ? Auth.getToken() : null;

        if (!token) {
          return false;
        }
        const user = Auth.getUserId(token);
        setUser(user);

        const response = await getFavourites(user, token);

        if (!response.ok) {
          throw new Error("Something went wrong");
        }
        const favouritesData = await response.json();

        console.log(favouritesData);

        const chosenRecipe = favouritesData[0].favourites[recipeIndex - 1];
        addFormData(chosenRecipe);
      } catch (err) {
        console.log(err);
      }
    };
    getRecipeData();
  }, []);

  const handleOnChange = (event) => {
    const { name, value } = event.target;
    addFormData({ ...formData, [name]: value });
  };

  const handleOnBlur = (event) => {
    const { name, value } = event.target;
    if (!value) {
      addFormError({ ...formError, [name]: true });
    } else {
      const list = { ...formError, [name]: false };
      addFormError(list);
      console.log("No form error");
    }
  };

  const handleIngredientChange = (event, index) => {
    const { name, value } = event.target;
    const list = { ...formData };
    list[name][index] = value;
    addFormData(list);

    console.log(formData);
  };

  const handleInstructionChange = (event, index) => {
    const { name, value } = event.target;
    const list = { ...formData };
    list[name][index] = value;
    addFormData(list);

    console.log(formData);
  };

  const handleAddClick = (event) => {
    const buttonId = event.target.id;
    if (buttonId === "ingredient") {
      addFormData({ ...formData, ingredients: [...formData.ingredients, ""] });
    } else if (buttonId === "instruction") {
      addFormData({
        ...formData,
        instructions: [...formData.instructions, ""],
      });
    }
  };
  const validate = (event) => {
    for (const element in formData) {
      if (formData[element] === "") {
        return;
      }
    }

    handleFormSubmit(event);
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    const token = Auth.loggedIn() ? Auth.getToken() : null;

    try {
      console.log(formData);

      console.log(user);
      const response = await editFavourites(formData, user, token);

      if (!response.ok) {
        throw new Error("Unable to finish request");
      }
      const newRecipe = await response.json();

      console.log(newRecipe);
    } catch (err) {
      console.error(err);
    }

    addFormData({
      name: "",
      description: "",
      prepTime: "",
      cookTime: "",
      ingredients: [""],
      instructions: [""],
      img: "",
      user: "",
    });

    addFormError({
      name: false,
      description: false,
      prepTime: false,
      cookTime: false,
      ingredients: false,
      instructions: false,
      img: false,
    });

    window.location.assign("/favs");
  };

  return (
    <>
      <Form
        formData={formData}
        handleOnChange={handleOnChange}
        handleOnBlur={handleOnBlur}
        formError={formError}
        handleIngredientChange={handleIngredientChange}
        handleAddClick={handleAddClick}
        handleInstructionChange={handleInstructionChange}
        validate={validate}
      />
    </>
  );
}
