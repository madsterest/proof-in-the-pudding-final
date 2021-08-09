import React, { useState, useEffect } from "react";
import { HStack, Link } from "@chakra-ui/react";
import MenuItem from "./MenuItem.js";
import Auth from "../utils/auth";

export default function MenuLink() {
  const [hasToken, setHasToken] = useState(true);

  useEffect(() => {
    const token = Auth.loggedIn() ? Auth.getToken() : null;
    if (!token) {
      setHasToken(false);
    }
  }, []);

  return (
    <HStack>
      <MenuItem href="/">Home</MenuItem>
      <MenuItem href="/dashboard">Your Recipes</MenuItem>
      <MenuItem href="/favs">Favourites</MenuItem>
      {hasToken ? (
        <Link
          py="2"
          px="5"
          border="1px"
          borderColor="#5ce1e6"
          borderRadius="10px"
          color="#36454f"
          _hover={{
            borderColor: "#dfb3f2",
            textDecoration: "none",
          }}
          onClick={Auth.logout}
        >
          Logout
        </Link>
      ) : (
        <>
          <MenuItem href="/signup">Create Account</MenuItem>
          <MenuItem href="/login">Log In</MenuItem>
        </>
      )}
    </HStack>
  );
}
