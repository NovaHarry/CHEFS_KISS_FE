import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { BE_URL } from "../utils.js/config";
import { Card, CardFooter, Col, Container, Row } from "react-bootstrap";

const Home = () => {
  let navigate = useNavigate();

  const [recipeData, setRecipeData] = useState([]);

  useEffect(() => {
    let userInfo = JSON.parse(localStorage.getItem("userInfo"));
    if (userInfo && userInfo.token.length > 140) {
      fetchUserData(userInfo.token);
    }
  }, []);

  const fetchUserData = async (token) => {
    const config = {
      headers: {
        Authorization: token,
      },
    };
    const res = await axios.get(`${BE_URL}/home`, config);

    localStorage.setItem("userInfo", JSON.stringify(res.data));

    fetchRecipes();
  };

  const fetchRecipes = async () => {
    const recipeData = await axios.get(`${BE_URL}`);
    setRecipeData(recipeData.data);
  };

  return (
    <div className="container d-flex justify-content-center">
      <Container className="m-5 w-4">
        <Row className="gap-3">
          {recipeData.map((data) => (
            <Col>
              <Card
                style={{ width: "18rem", height: "24rem" }}
                key={data._id}
                className="recipeCards shadow-sm rounded-lg rounded-top-4"
              >
                <Link
                  to={`/recipe/${data._id}`}
                  className="text-decoration-none card-links"
                >
                  <Card.Img
                    variant="top"
                    src={data.recipeImage}
                    className="rounded-top-4"
                    height={200}
                    width={90}
                  />
                  <Card.Body className="p-4">
                    <Card.Title className="recipeTitle fw-bolder">
                      {data.recipeTitle}
                    </Card.Title>
                    <Card.Text className="fw-bold">
                      Ratings: {data.ratings}/5
                    </Card.Text>
                    <Card.Text className="fw-bold">
                      Preparation Time: {data.preparationTime}
                    </Card.Text>
                  </Card.Body>
                </Link>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    </div>
  );
};

export default Home;
