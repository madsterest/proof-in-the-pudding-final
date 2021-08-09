export const getRecipes = () => {
  return fetch("/api/recipes", {
    headers: {
      "Content-Type": "application/json",
    },
  });
};

export const getUserRecipes = (token, id) => {
  return fetch(`/api/user/${id}`, {
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    },
  });
};

export const newUser = (newUser) => {
  return fetch("/api/user/new", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newUser),
  });
};

export const userLogin = (userData) => {
  return fetch("/api/user/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userData),
  });
};

export const addNewRecipe = (recipeData, token) => {
  var data = new FormData();
  for (const key in recipeData) {
    data.append(key, recipeData[key]);
  }

  return fetch("/api/recipes/new", {
    method: "POST",
    headers: {
      authorization: `Bearer ${token}`,
    },
    body: data,
  });
};

export const getIndividualRecipe = (recipeId) => {
  return fetch(`/api/recipes/${recipeId}`, {
    headers: {
      "Content-Type": "application/json",
    },
  });
};

export const editRecipe = (formData, token) => {
  return fetch(`/api/recipes/edit`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(formData),
  });
};

export const deleteRecipe = (recipeId, userId, token) => {
  return fetch(`/api/recipes/delete/${recipeId}/${userId}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    },
  });
};

export const addToFavourites = (recipeId, userId, token) => {
  return fetch(`/api/recipes/favourites/${recipeId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ userId }),
  });
};

export const getFavourites = (userId, token) => {
  return fetch(`/api/recipes/favourites/${userId}`, {
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    },
  });
};

export const editFavourites = (formData, userId, token) => {
  return fetch(`/api/recipes/editfavourites/${userId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(formData),
  });
};

export const deleteFavourite = (recipeId, user, token) => {
  return fetch(`/api/recipes/deletefavourite/${user}/${recipeId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    },
  });
};

export const addComment = (recipeId, commentValue, token) => {
  return fetch(`/api/recipes/comment/${recipeId}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(commentValue),
  });
};
