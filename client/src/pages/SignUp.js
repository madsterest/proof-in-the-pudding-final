import React, { useState } from "react";
import { Stack, Center, Button, Input, Text } from "@chakra-ui/react";
import { newUser } from "../utils/API";
import Auth from "../utils/auth";

export default function SignUp() {
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    username: "",
    password: "",
  });

  const [formError, addFormError] = useState({
    name: false,
    email: false,
    username: false,
    password: false,
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUserData({ ...userData, [name]: value });
  };

  const handleOnBlur = (event) => {
    const { name, value } = event.target;
    if (!value) {
      addFormError({ ...formError, [name]: true });
    } else {
      const list = { ...formError, [name]: false };
      addFormError(list);
    }
  };

  const handleEmailBlur = (event) => {
    const { value } = event.target;
    const regex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

    if (!value || !regex.exec(value)) {
      addFormError({ ...formError, email: true });
    } else {
      addFormError({ ...formError, email: false });
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
    try {
      const response = await newUser(userData);

      if (!response.ok) {
        throw new Error("No new user added");
      }

      const { token, user } = await response.json();
      console.log(user);
      Auth.login(token);
    } catch (err) {
      console.error(err);
    }
    console.log(userData);
    setUserData({
      name: "",
      email: "",
      username: "",
      password: "",
    });
  };
  return (
    <>
      <Center mb="6" fontSize="20px">
        Join the Family!
      </Center>

      <Stack w="500px" align="center" mx="auto">
        <Input
          name="name"
          value={userData.name}
          onChange={handleInputChange}
          placeholder="Full Name"
          onBlur={handleOnBlur}
        />
        {formError.name && (
          <Text color="#008080">Please input a valid name</Text>
        )}
        <Input
          name="email"
          value={userData.email}
          onChange={handleInputChange}
          placeholder="Email"
          onBlur={handleEmailBlur}
        />
        {formError.email && (
          <Text color="#008080">Please input a valid email</Text>
        )}
        <Input
          name="username"
          value={userData.username}
          onChange={handleInputChange}
          placeholder="Username"
          onBlur={handleOnBlur}
        />
        {formError.username && (
          <Text color="#008080">Please input a valid username</Text>
        )}
        <Input
          name="password"
          value={userData.password}
          onChange={handleInputChange}
          placeholder="Password"
          onBlur={handleOnBlur}
        />
        {formError.password && (
          <Text color="#008080">Please input a valid password</Text>
        )}
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
    </>
  );
}
