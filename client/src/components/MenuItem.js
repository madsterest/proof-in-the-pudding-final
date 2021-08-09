import React from "react";

import { Link, Text } from "@chakra-ui/react";

import { Link as ReachLink } from "react-router-dom";

export default function MenuItem({ href, children }) {
  return (
    <Link
      py="2"
      px="5"
      border="1px"
      borderColor="#5ce1e6"
      borderRadius="10px"
      color=" #36454f"
      _hover={{
        borderColor: "#dfb3f2",
        textDecoration: "none",
      }}
      as={ReachLink}
      to={href}
    >
      <Text display="block">{children}</Text>
    </Link>
  );
}
