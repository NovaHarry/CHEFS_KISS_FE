import React, { useState } from "react";
import { Button, Col, Container, Form } from "react-bootstrap";

const AddRecipes = () => {
  const [count, setCount] = useState(1);

  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [image, setImage] = useState("");
  const [preparation, setPreparation] = useState("");
  const [cooking, setCooking] = useState("");
  const [servings, setServings] = useState("");
  const [directions, setDirections] = useState("");
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
              <Form.Group
                className="mb-3 d-grid "
                controlId="exampleForm.ControlInput1"
              >
                <Form.Label>Cooking Ingredients</Form.Label>

                <Form.Control type="text" placeholder="Number of Servings" />
              </Form.Group>
              <div className="d-flex justify-content-center py-2">
                <Button
                  className="fw-bold search-btn "
                  size="xs"
                  onClick={() => setCount(count + 1)}
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
          </Form>
        </Col>
      </div>
    </Container>
  );
};

export default AddRecipes;
