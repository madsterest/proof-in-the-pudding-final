import React, { useState, useEffect } from "react";
import Auth from "../utils/auth";
import { editRecipe, getIndividualRecipe } from "../utils/API";
import Form from "../components/Form";

export default function AddRecipe(props) {
  const [formData, addFormData] = useState({
    name: "",
    description: "",
    prepTime: "",
    cookTime: "",
    ingredients: [""],
    instructions: [""],
    img: "",
    user: "",
  });

  const [formError, addFormError] = useState({
    name: false,
    description: false,
    prepTime: false,
    cookTime: false,
    ingredients: false,
    instructions: false,
    img: false,
  });

  const URLPath = window.location.pathname;
  console.log(URLPath);

  useEffect(() => {
    const getRecipeData = async () => {
      const recipeId = props.match.params.id;

      console.log(recipeId);

      try {
        const response = await getIndividualRecipe(recipeId);

        if (!response.ok) {
          throw new Error("Something went wrong");
        }
        const recipeData = await response.json();
        addFormData(recipeData[0]);
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
      const response = await editRecipe(formData, token);

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
    console.log("Function still running");

    window.location.assign("/dashboard");
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
