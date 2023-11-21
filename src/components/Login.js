import { Button, Container, Form } from "react-bootstrap";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { validateLogin } from "../utils.js/validate";
import axios from "axios";
import { BE_URL } from "../utils.js/config";

const Login = () => {
  const [email, setEmail] = useState("email");
  const [password, setPassword] = useState("pass");

  const [errorMessage, setErrorMessage] = useState(null);

  let navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    const message = validateLogin(email, password);

    setErrorMessage(message);

    if (message) return;

    let payload = { email, password };
    try {
      let res = await axios.post(`${BE_URL}/login`, payload);

      if (res?.data?.token?.length > 140) {
        localStorage.setItem("userInfo", JSON.stringify(res.data));
        navigate(`/home`);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="container d-flex justify-content-center">
      <Container className="m-5 w-50">
        <h1 className="fw-bold py-3">
          Login{" "}
          <span>
            <span className="red-black">Here</span> !
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

          <p className="">
            New to Chef's Kiss?{" "}
            <Link to="/" className="links">
              <span className="red-black ">Register now.</span>
            </Link>
          </p>

          <Button
            className="fw-bold search-btn"
            type="submit"
            onClick={(e) => handleLogin(e)}
          >
            Login
          </Button>
        </Form>
      </Container>
    </div>
  );
};

export default Login;
