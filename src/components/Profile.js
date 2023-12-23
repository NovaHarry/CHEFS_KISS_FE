import React, { useEffect, useState } from "react";
import { Button, Card, Col, Container, Row } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { BE_URL } from "../utils.js/config";
import axios from "axios";

const Profile = () => {
  let navigate = useNavigate();

  const [user, setUser] = useState("");

  const [profile, setProfile] = useState([]);

  useEffect(() => {
    myProfile();
  }, []);

  const myProfile = async () => {
    const data = await JSON.parse(localStorage.getItem("userInfo"));
    setUser(data);
    const res = await axios.get(`${BE_URL}/recipe/${user.email}`);
    setProfile([...res?.data]);
  };

  return (
    <div className="container d-flex justify-content-center">
      <Container className="m-5 w-4">
        <Button
          className="fw-bold search-btn"
          onClick={(e) => navigate("/addrecipes")}
        >
          Add Recipe
        </Button>
        <Row className="gap-3">
          {profile.map((data) => (
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

export default Profile;
