import axios from "axios";
import React, { useEffect, useState } from "react";
import { BE_URL } from "../utils.js/config";
import { useParams } from "react-router-dom";
import { Badge, Button, Col, Container, Form, Row } from "react-bootstrap";

const Recipe = () => {
  const { id } = useParams();

  const [recipeData, setRecipeData] = useState("");

  useEffect(() => {
    fetchRecipe(id);
  }, []);

  const fetchRecipe = async () => {
    try {
      const res = await axios.get(`${BE_URL}/${id}`);

      setRecipeData(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="container d-flex justify-content-center">
      <Container className="m-5 w-70">
        <Row xs={12}>
          <Col className="py-4">
            <div className="py-3 d-flex align-items-center justify-content-center flex-column">
              <img
                src={recipeData.recipeImage}
                height={500}
                width={500}
                className="rounded-3 img-fluid"
              />
              <h1 className="py-2">{recipeData.recipeTitle}</h1>
            </div>

            <div className="d-flex justify-content-between fw-bold pl-4">
              <span>Preparation Time :{recipeData.preparationTime}</span>
              <span>Cooking Time :{recipeData.cookingTime}</span>
              <span>Servings :{recipeData.numberOfServings}</span>
            </div>
            <div className="fw-bold d-flex flex-column py-2">
              <span>Ingredients :</span>
              {recipeData?.ingredients?.map((data, idx) => (
                <div className="fw-normal d-flex py-3 gap-2" key={idx}>
                  <span>{data.name}</span>
                  <span>{data.qty}</span>
                  <span>{data.unit}</span>
                </div>
              ))}
            </div>
            <div>
              <span className="fw-bold py-4">Directions :</span>
              <p className="fw-normal py-4">{recipeData.directions}</p>
            </div>
            <div className="py-3">
              <Form>
                <Form.Group
                  className="mb-3"
                  controlId="exampleForm.ControlTextarea1"
                >
                  <Form.Label>Share your thoughts here :</Form.Label>
                  <Form.Control as="textarea" rows={3} />
                </Form.Group>
                <Button className="fw-bold comment-btn" type="submit">
                  Submit
                </Button>
              </Form>
            </div>
            <div className="badges d-flex gap-3">
              {recipeData?.tags?.map((tag, idx) => (
                <Badge bg="dark" className="p-2" key={idx}>
                  {tag}
                </Badge>
              ))}
              <span className="fw-bold">Ratings : {recipeData.ratings}/5</span>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Recipe;
