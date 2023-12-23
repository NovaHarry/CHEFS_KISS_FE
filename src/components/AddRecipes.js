import axios from "axios";
import React, { useState } from "react";
import { Button, Col, Container, Form } from "react-bootstrap";
import { BE_URL } from "../utils.js/config";
import { Navigate, useNavigate } from "react-router-dom";

const AddRecipes = () => {
  const Input = (props) => {
    const [name, setName] = useState("");
    const [quantity, setQuantity] = useState("");
    const [unit, setUnit] = useState("");

    const data = {
      name: name,
      qty: quantity,
      unit: unit,
    };

    props.data(data);

    return (
      <div className="d-flex gap-2 py-1 w-50">
        <input placeholder="name" onChange={(e) => setName(e.target.value)} />
        <input
          placeholder="quantity"
          onChange={(e) => setQuantity(e.target.value)}
        />
        <input
          placeholder="unit (gms, ml, kgs etc.,)"
          onChange={(e) => setUnit(e.target.value)}
        />
      </div>
    );
  };

  const Tags = (props) => {
    const [tag, setTag] = useState("");

    props.data(tag);
    return (
      <div className="d-flex gap-2 py-1 w-50">
        <input placeholder="name" onChange={(e) => setTag(e.target.value)} />
      </div>
    );
  };

  const [ingredientsList, setIngredientsList] = useState([]);

  const [tagsList, setTagsList] = useState([]);

  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [image, setImage] = useState("");
  const [preparation, setPreparation] = useState("");
  const [cooking, setCooking] = useState("");
  const [servings, setServings] = useState("");
  const [directions, setDirections] = useState("");
  const [ingredients, setIngredients] = useState([]);
  const [tags, setTags] = useState([]);

  let navigate = useNavigate();

  const fetchIngredients = (data) => {
    if (data.name !== "") {
      setIngredients([...ingredients, data]);
    }
  };

  const handleAddIngredients = () => {
    setIngredientsList([
      ...ingredientsList,
      <Input key={ingredientsList.length} data={fetchIngredients} />,
    ]);
  };

  const fetchTags = (data) => {
    if (data.length > 0) {
      setTags([...tags, data]);
    }
  };

  const handleAddTags = () => {
    setTagsList([...tagsList, <Tags key={tagsList.length} data={fetchTags} />]);
  };

  const handleRecipeSubmit = async (e) => {
    e.preventDefault();
    const email = await JSON.parse(localStorage.getItem("userInfo"));
    try {
      let payload = {
        email: email.email,
        recipeTitle: title,
        recipeDescription: desc,
        recipeImage: image,
        preparationTime: preparation,
        cookingTime: cooking,
        numberOfServings: servings,
        ingredients: ingredients,
        directions: directions,
        tags: tags,
      };
      if (payload.email) {
        console.log(payload);
        const res = await axios.post(`${BE_URL}/addrecipe`, payload);
        alert(res.data.message);
        navigate(`/profile`);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Container className="d-flex justify-content-center">
      <div className="w-50">
        <Col>
          <Form>
            <Form.Group
              className="mb-3 d-flex"
              controlId="exampleForm.ControlInput1 "
            >
              <Form.Label>Recipe Title :</Form.Label>
              <Form.Control
                type="text"
                placeholder="Recipe Title"
                onChange={(e) => setTitle(e.target.value)}
              />
            </Form.Group>
            <Form.Group
              className="mb-3 d-flex"
              controlId="exampleForm.ControlInput1"
            >
              <Form.Label>Recipe Description :</Form.Label>
              <Form.Control
                type="text"
                placeholder="Recipe Description"
                onChange={(e) => setDesc(e.target.value)}
              />
            </Form.Group>
            <Form.Group
              className="mb-3 d-flex"
              controlId="exampleForm.ControlInput1"
            >
              <Form.Label>Recipe Image URL :</Form.Label>
              <Form.Control
                type="text"
                placeholder="Recipe Image URL"
                onChange={(e) => setImage(e.target.value)}
              />
            </Form.Group>
            <Form.Group
              className="mb-3 d-flex"
              controlId="exampleForm.ControlInput1"
            >
              <Form.Label>Recipe Prepartion Time</Form.Label>
              <Form.Control
                type="text"
                placeholder="Recipe Prepartion Time"
                onChange={(e) => setPreparation(e.target.value)}
              />
            </Form.Group>
            <Form.Group
              className="mb-3 d-flex"
              controlId="exampleForm.ControlInput1"
            >
              <Form.Label>Recipe Cooking Time</Form.Label>
              <Form.Control
                type="text"
                placeholder="Recipe Cooking Time"
                onChange={(e) => setCooking(e.target.value)}
              />
            </Form.Group>
            <Form.Group
              className="mb-3 d-flex"
              controlId="exampleForm.ControlInput1"
            >
              <Form.Label>Number of Servings</Form.Label>
              <Form.Control
                type="text"
                placeholder="Number of Servings"
                onChange={(e) => setServings(e.target.value)}
              />
            </Form.Group>
            <div>
              <Form.Label>Cooking Ingredients : </Form.Label>
              {ingredientsList}
              <div className="d-flex justify-content-center py-2">
                <Button
                  className="fw-bold search-btn "
                  size="xs"
                  onClick={() => handleAddIngredients()}
                >
                  + Add Ingredients
                </Button>
              </div>
            </div>
            <Form.Group
              className="mb-3 d-flex"
              controlId="exampleForm.ControlInput1"
            >
              <Form.Label>Cooking Directions</Form.Label>
              <Form.Control
                type="text"
                placeholder="Cooking Directions"
                onChange={(e) => setDirections(e.target.value)}
              />
            </Form.Group>
            <div>
              <Form.Label>Food Tags : </Form.Label>
              {tagsList}
              <div className="d-flex justify-content-center py-2">
                <Button
                  className="fw-bold search-btn "
                  size="xs"
                  onClick={() => handleAddTags()}
                >
                  + Add Tags
                </Button>
              </div>
            </div>
          </Form>
          <Button
            className="fw-bold search-btn "
            size="xs"
            onClick={(e) => handleRecipeSubmit(e)}
          >
            Submit
          </Button>
        </Col>
      </div>
    </Container>
  );
};

export default AddRecipes;
