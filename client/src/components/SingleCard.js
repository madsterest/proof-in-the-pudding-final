import React, { useState, useEffect } from "react";
import {
  HStack,
  Center,
  Text,
  Image,
  Container,
  Textarea,
  FormLabel,
  Button,
} from "@chakra-ui/react";

export default function SingleCard(props) {
  return (
    <>
      <Center color="#009797" fontSize="xl">
        {props.name}
      </Center>
      <Center mb="3">{props.description}</Center>
      <Center>Prep Time: {props.prepTime}</Center>
      <Center mb="8">Cook Time: {props.cookTime}</Center>

      <HStack px="15%" align="flex-start" mb="20">
        <Container>
          <Image
            src={props.img}
            mx="auto"
            objectFit="cover"
            boxSize="400px"
            alt="Recipe Photo"
          />
        </Container>

        <Container>
          <Text mb="1">Ingredients:</Text>
          {props.ingredients.map((ingredient, index) => {
            return <Text key={index}>{ingredient}</Text>;
          })}
          <Text mt="5" mb="1">
            Instructions:
          </Text>
          {props.instructions.map((instruction, index) => {
            return (
              <Text key={index}>
                {index + 1}. {instruction}
              </Text>
            );
          })}
        </Container>
      </HStack>

      <Container>
        <FormLabel>Leave a Comment:</FormLabel>
        <Textarea
          placeholder="Yummo!"
          value={props.commentvalue}
          onChange={(e) => props.onChange(e)}
        ></Textarea>
        {props.loggedIn ? (
          <Button mb="5" onClick={(e) => props.onClick(e)}>
            Submit
          </Button>
        ) : (
          <Text mb="10">Please Sign In to Add Comment</Text>
        )}
      </Container>

      {props.comments?.map((comment) => {
        return (
          <Container
            border="1px"
            borderRadius="20"
            borderColor="#80c0c0"
            p="4"
            mb="2"
            key={comment._id}
          >
            <Text>{comment.comment}</Text>
            <Text fontSize="sm" color="#009797" mt="2">
              Submitted by {comment.username}
            </Text>
          </Container>
        );
      })}
    </>
  );
}
