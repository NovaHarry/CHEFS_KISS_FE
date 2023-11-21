import { Button, Container, Form } from "react-bootstrap";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { BE_URL } from "../utils.js/config";

const FogotPassword = () => {
  const [email, setEmail] = useState("email");

  let navigate = useNavigate();

  const handleForgotPassword = async (e) => {
    e.preventDefault();
    try {
      let res = await axios.get(`${BE_URL}/login/forgot-password/${email}`);
      if (res.data.message === "User data for the ID fetched successfully") {
        alert("Password rest link sent to your mail. Kindly check it.");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="container d-flex justify-content-center">
      <Container className="m-5 w-50">
        <h1 className="fw-bold py-3">
          Forgot{" "}
          <span>
            <span className="red-black">Password</span> ?
          </span>
        </h1>
        <Form className="fw-bold">
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>
              Email <span className="red-black">address</span>
            </Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              onChange={(e) => setEmail(e.target.value)}
            />
          </Form.Group>

          <Button
            className="fw-bold search-btn"
            type="submit"
            onClick={(e) => handleForgotPassword(e)}
          >
            Forgot Password
          </Button>
        </Form>
      </Container>
    </div>
  );
};

export default FogotPassword;
