import React from "react";
import { Flex } from "@chakra-ui/react";

export default function NavBarContainer({ children }) {
  return (
    <Flex
      align="center"
      justify="space-between"
      w="100%"
      pl="8"
      pr="8"
      mb="10"
      borderBottom="2px"
      borderBottomColor="#dfb3f2"
    >
      {children}
    </Flex>
  );
}
