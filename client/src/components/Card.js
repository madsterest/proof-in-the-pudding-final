import React from "react";

import {
  WrapItem,
  Text,
  Image,
  LinkOverlay,
  LinkBox,
  Center,
  Button,
  Container,
} from "@chakra-ui/react";

export default function Card(props) {
  return (
    <WrapItem
      key={props._id}
      w="300px"
      h="500px"
      p="5"
      border="1px"
      borderRadius="30"
      borderColor="#80c0c0"
      bg="#99d5d5"
      _hover={{
        border: "2px",
        borderColor: "#dfb3f2",
        textDecoration: "none",
      }}
    >
      <LinkBox mx="auto">
        <Image
          src={props.img}
          objectFit="cover"
          boxSize="200px"
          alt="Recipe Photo"
          align="center"
          mx="auto"
        />
        <Container height="210px">
          <Center>
            <Text fontSize="20px" fontWeight="bold" color="#ffffff">
              <LinkOverlay
                _hover={{
                  color: "#ffffff",
                  textDecoration: "none",
                }}
                href={props._id}
              >
                {props.title}
              </LinkOverlay>
            </Text>
          </Center>
          <Center>
            {props.user && (
              <Text color="#009797" fontSize="md" mb="3">
                Created by {props.user}
              </Text>
            )}
          </Center>

          <Text color="#ffffff">Prep Time: {props.prep}</Text>
          <Text mb="1" color="#ffffff">
            Cook Time: {props.cook}
          </Text>
          <Text color="#ffffff">{props.description}</Text>
        </Container>
        <Container align="center">
          {props.onEdit && (
            <Button
              borderRadius="15"
              bg="#ffffff"
              onClick={props.favourite}
              id={props._id}
              fontWeight="normal"
              _hover={{ bg: "#f0f8fe" }}
              onClick={props.onEdit}
              id={props._id}
              p="5"
            >
              Edit
            </Button>
          )}
          {props.onIndexEdit && (
            <Button
              borderRadius="15"
              bg="#ffffff"
              onClick={props.favourite}
              id={props._id}
              fontWeight="normal"
              _hover={{ bg: "#f0f8fe" }}
              onClick={props.onIndexEdit}
              id={props.index}
            >
              Edit
            </Button>
          )}

          {props.onDelete && (
            <Button
              borderRadius="15"
              bg="#ffffff"
              onClick={props.favourite}
              id={props._id}
              m="1"
              fontWeight="normal"
              _hover={{ bg: "#f0f8fe" }}
              onClick={props.onDelete}
              id={props._id}
            >
              Delete
            </Button>
          )}
          {props.favourite && (
            <Center>
              <Button
                borderRadius="15"
                bg="#ffffff"
                onClick={props.favourite}
                id={props._id}
                fontWeight="normal"
                _hover={{ bg: "#f0f8fe" }}
              >
                Add Copy to Favourites
              </Button>
            </Center>
          )}
        </Container>
      </LinkBox>
    </WrapItem>
  );
}
