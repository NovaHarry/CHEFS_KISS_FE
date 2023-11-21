import React from "react";
import { Button, Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  let navigate = useNavigate();
  return (
    <Container>
      <Button
        className="fw-bold search-btn"
        onClick={(e) => navigate("/addrecipes")}
      >
        Add Recipe
      </Button>
    </Container>
  );
};

export default Profile;
