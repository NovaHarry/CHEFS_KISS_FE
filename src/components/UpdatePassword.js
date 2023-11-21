import { Button, Container, Form } from "react-bootstrap";
import React, { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { BE_URL } from "../utils.js/config";

const UpdatePassword = () => {
  const [password, setPassword] = useState("");

  let navigate = useNavigate();

  const { token } = useParams();

  const handleUpdatePassword = async (e) => {
    e.preventDefault();

    let payload = { password };
    try {
      let res = await axios.put(
        `${BE_URL}/login/update-password/${token}`,
        payload
      );

      if (res.data.message === "Password Updated Successfully") {
        alert("Password Updated Successfully");
        navigate("/");
      }
    } catch (error) {
      alert(error.response.data.message);
    }
  };

  return (
    <div className="container d-flex justify-content-center">
      <Container className="m-5 w-50">
        <h1 className="fw-bold py-3">
          New{" "}
          <span>
            <span className="red-black">Password</span>
          </span>
        </h1>
        <Form className="fw-bold">
          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Control
              type="password"
              placeholder="Enter new password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Group>

          <Button
            className="fw-bold search-btn"
            type="submit"
            onClick={(e) => handleUpdatePassword(e)}
          >
            Update Password
          </Button>
        </Form>
      </Container>
    </div>
  );
};

export default UpdatePassword;
