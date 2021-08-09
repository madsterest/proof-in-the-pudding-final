import React from "react";
import { Input } from "@chakra-ui/react";

export default function FormInput(props) {
  return <Input placeholder={props.holder}></Input>;
}
