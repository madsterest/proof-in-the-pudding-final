import React, { useState, useEffect } from "react";
import Form from "../components/Form";
import Auth from "../utils/auth";
import { addNewRecipe } from "../utils/API";

export default function AddRecipe() {
  const [formData, addFormData] = useState({
    name: "",
    description: "",
    prepTime: "",
    cookTime: "",
    img: "",
    ingredients: [""],
    instructions: [""],
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

  console.log(formError);

  useEffect(() => {
    const token = Auth.loggedIn() ? Auth.getToken() : null;

    if (!token) {
      return false;
    }

    const userId = Auth.getUserId(token);
    addFormData({ ...formData, user: userId });
    console.log(formData);
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
  };

  const onPictureChange = (event) => {
    const image = URL.createObjectURL(event.target.files[0]);
    console.log(image);
    const list = { ...formData, img: event.target.files[0] };
    addFormData(list);
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

    if (!token) {
      return false;
    }

    const userId = Auth.getUserId(token);
    console.log(userId);
    addFormData({ ...formData, user: userId });

    try {
      console.log(formData);
      const response = await addNewRecipe(formData, token);

      if (!response.ok) {
        throw new Error("Unable to finish request");
      }
      const newRecipe = await response.json();

      console.log(newRecipe);
    } catch (err) {
      console.error(err);
    }

    console.log(formData);
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
        onPictureChange={onPictureChange}
        validate={validate}
      />
    </>
  );
}
