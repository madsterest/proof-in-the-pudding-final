import React, { useState } from "react";
import { Center, Stack, Input, Button, Text } from "@chakra-ui/react";
import { userLogin } from "../utils/API";
import Auth from "../utils/auth";

export default function Login() {
  const [userData, setUserData] = useState({ username: "", password: "" });
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUserData({ ...userData, [name]: value });
  };

  const [formError, addFormError] = useState({
    username: false,
    password: false,
  });

  const handleOnBlur = (event) => {
    const { name, value } = event.target;
    if (!value) {
      addFormError({ ...formError, [name]: true });
    } else {
      addFormError({ ...formError, [name]: false });
    }
  };

  const validate = (event) => {
    for (const element in userData) {
      if (userData[element] === "") {
        return;
      }
    }
    handleFormSubmit(event);
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    console.log(userData);

    try {
      const response = await userLogin(userData);

      if (!response.ok) {
        throw new Error("Unable to perform request");
      }

      const { token, user } = await response.json();
      console.log(user);
      Auth.login(token);
    } catch (err) {
      console.error(err);
    }

    setUserData({ username: "", password: "" });
  };
  return (
    <form>
      <Center mb="6" fontSize="20px">
        Welcome Back!
      </Center>
      <Stack w="500px" align="center" mx="auto">
        <Input
          name="username"
          value={userData.username}
          onChange={handleInputChange}
          placeholder="Username"
        />
        <Input
          name="password"
          value={userData.password}
          onChange={handleInputChange}
          placeholder="Password"
        />
        <Button
          onClick={validate}
          fontWeight="light"
          fontSize="lg"
          align="center"
          bg="#dfb3f2"
          _hover={{ bg: "#f0f8fe" }}
        >
          Come on In!
        </Button>
      </Stack>
    </form>
  );
}
