import React from "react";
import { Box, Image } from "@chakra-ui/react";
import logoFile from "../logo-alt.png";

export default function Logo() {
  return (
    <Box boxSize="130px" objectFit="cover" ml="5">
      <Image src={logoFile} />
    </Box>
  );
}
