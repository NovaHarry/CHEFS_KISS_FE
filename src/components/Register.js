import React, { useState } from "react";
import { Button, Container, Form } from "react-bootstrap";
import { validateRegisteration } from "../utils.js/validate";
import { BE_URL } from "../utils.js/config";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const Register = () => {
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [errorMessage, setErrorMessage] = useState(null);

  let navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();

    const message = validateRegisteration(email, password, userName);

    setErrorMessage(message);

    if (message) return;

    let payload = { userName, email, password };
    try {
      let res = await axios.post(`${BE_URL}/signup/verify`, payload);
      if (res?.data === true) {
        alert("Registeration link sent to your mail Id.");
        navigate(`/`);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <div className="container d-flex justify-content-center">
        <Container className="m-5 w-50">
          <h1 className="fw-bold py-3">
            Register{" "}
            <span>
              <span className="red-black">Here</span> !
            </span>
          </h1>
          <Form className="fw-bold">
            <Form.Group className="mb-3" controlId="formBasicUserName">
              <Form.Label>
                User <span className="red-black">name</span>
              </Form.Label>
              <Form.Control
                type="userName"
                placeholder="Enter your name"
                onChange={(e) => setUserName(e.target.value)}
              />
            </Form.Group>
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
            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>
                Email <span className="red-black">password</span>
              </Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                onChange={(e) => setPassword(e.target.value)}
              />
            </Form.Group>

            <p>{errorMessage}</p>

            <p className="text-decoration-none">
              Already an User?{" "}
              <Link to="/" className="links">
                <span className="red-black">Login now.</span>
              </Link>
            </p>

            <div className="d-flex gap-2">
              <Button
                className="fw-bold search-btn"
                type="submit"
                onClick={(e) => handleRegister(e)}
              >
                Register
              </Button>

              <Button
                className="fw-bold search-btn"
                onClick={(e) => navigate("/forgot-password")}
              >
                Forgot Password ?
              </Button>
            </div>
          </Form>
        </Container>
      </div>
    </div>
  );
};

export default Register;
