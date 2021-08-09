import {
  Center,
  Stack,
  Input,
  FormLabel,
  Button,
  Text,
  Textarea,
} from "@chakra-ui/react";
export default function Form(props) {
  return (
    <form encType="multipart/form-data">
      <Center mb="6" fontSize="20px">
        What are you cooking for us today?
      </Center>
      <Stack w="500px" align="center" mx="auto" mb="20">
        <FormLabel>Dish Name:</FormLabel>
        <Input
          name="name"
          value={props.formData.name}
          onChange={props.handleOnChange}
          placeholder="Wine Cream Chicken"
          onBlur={props.handleOnBlur}
        />
        {props.formError.name === true && (
          <Text color="#008080">Please input a name</Text>
        )}

        <FormLabel>Description:</FormLabel>
        <Textarea
          name="description"
          value={props.formData.description}
          onChange={props.handleOnChange}
          placeholder="Creamy chicken bake covered in breadcrumbs. Perfect for a holiday feast or a cozy night in"
          onBlur={props.handleOnBlur}
        />
        {props.formError.description === true && (
          <Text color="#008080">Please input a description</Text>
        )}
        <FormLabel>Prep Time:</FormLabel>
        <Input
          name="prepTime"
          value={props.formData.prepTime}
          onChange={props.handleOnChange}
          placeholder="20 Mins"
          onBlur={props.handleOnBlur}
        />
        {props.formError.prepTime === true && (
          <Text color="#008080">Please input a preparation time</Text>
        )}
        <FormLabel>Cook Time:</FormLabel>
        <Input
          name="cookTime"
          value={props.formData.cookTime}
          onChange={props.handleOnChange}
          placeholder="1 Hr"
          onBlur={props.handleOnBlur}
        />
        {props.formError.cookTime === true && (
          <Text color="#008080">Please input a Cook time</Text>
        )}
        <FormLabel>Ingredients:</FormLabel>
        {props.formData.ingredients.map((ingredient, i) => {
          return (
            <Input
              key={i}
              name="ingredients"
              value={ingredient}
              onChange={(e) => props.handleIngredientChange(e, i)}
              placeholder="200g Chicken Breast"
              onBlur={(e) => props.handleOnBlur(e)}
            />
          );
        })}
        {props.formError.ingredients === true ? (
          <>
            <Button id="ingredient" size="sm" bg=" #D991EE" align="center">
              Add Ingredient
            </Button>

            <Text color="#008080">Please input ingredients</Text>
          </>
        ) : (
          <Button
            id="ingredient"
            onClick={props.handleAddClick}
            size="sm"
            bg=" #D991EE"
            align="center"
          >
            Add Ingredient
          </Button>
        )}

        <FormLabel>Instructions:</FormLabel>
        {props.formData.instructions.map((instruction, i) => {
          return (
            <Input
              key={i}
              name="instructions"
              value={instruction}
              onChange={(e) => props.handleInstructionChange(e, i)}
              placeholder="Preheat Oven to 250 degrees"
              onBlur={(e) => props.handleOnBlur(e)}
            />
          );
        })}
        {props.formError.instructions === true ? (
          <>
            <Button id="instruction" size="sm" bg=" #D991EE" align="center">
              Add Step
            </Button>

            <Text color="#008080">Please input instructions</Text>
          </>
        ) : (
          <Button
            id="instruction"
            onClick={props.handleAddClick}
            size="sm"
            bg=" #D991EE"
            align="center"
          >
            Add Step
          </Button>
        )}
        {props.onPictureChange && (
          <>
            <FormLabel>
              *Warning* This cannot be changed later, so choose wisely!
            </FormLabel>
            <Input
              name="img"
              onChange={props.onPictureChange}
              type="file"
              accept="img/x-png"
            />
          </>
        )}

        <Button onClick={props.validate} size="md" bg=" #D991EE" align="center">
          Create Recipe!
        </Button>
      </Stack>
    </form>
  );
}
