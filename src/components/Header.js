import React, { useEffect, useState } from "react";
import { BE_URL, LOGO_URL } from "../utils.js/config";
import axios from "axios";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Offcanvas from "react-bootstrap/Offcanvas";
import { Button, Container, Form } from "react-bootstrap";
import { Link } from "react-router-dom";

const Header = () => {
  useEffect(() => {
    let userInfo = JSON.parse(localStorage.getItem("userInfo"));

    if (!userInfo.token) {
    } else {
      fetchData(userInfo.token);
    }
  }, []);

  const fetchData = async (token) => {
    const config = {
      headers: {
        Authorization: token,
      },
    };
    const res = await axios.get(`${BE_URL}/home`, config);

    localStorage.setItem("userInfo", JSON.stringify(res.data));

    console.log(res);
  };
  return (
    <div>
      <>
        <Navbar
          sticky="top"
          expand="lg"
          className="bg-body-tertiary mb-3 shadow-lg px-4 rounded-bottom"
        >
          <Container fluid>
            <Link to="/home" className="text-decoration-none">
              <Navbar.Brand className="d-flex justify-content-center align-items-center gap-2 logo">
                <img
                  src={LOGO_URL}
                  width="80"
                  height="80"
                  className="d-inline-block rounded-circle align-top logo-img"
                  alt="Chef's Kiss logo"
                />
                <h1 className="fw-bold black-red">
                  Chef's <span className="red-black">Kiss</span>
                </h1>
              </Navbar.Brand>
            </Link>
            <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-lg`} />
            <Navbar.Offcanvas
              id={`offcanvasNavbar-expand-lg`}
              aria-labelledby={`offcanvasNavbarLabel-expand-lg`}
              placement="end"
            >
              <Offcanvas.Header closeButton>
                <Offcanvas.Title id={`offcanvasNavbarLabel-expand-lg`}>
                  <img
                    src={LOGO_URL}
                    width="50"
                    height="50"
                    className="d-inline-block rounded-circle align-top logo-img"
                    alt="Chef's Kiss logo"
                  />
                </Offcanvas.Title>
              </Offcanvas.Header>
              <Offcanvas.Body>
                <Nav className="justify-content-end flex-grow-1 pe-3 gap-2">
                  <Nav.Link
                    as={Link}
                    to="/home"
                    className="fw-bold nav-link rounded-2"
                  >
                    Home
                  </Nav.Link>
                  <Nav.Link
                    as={Link}
                    to="/about"
                    className="fw-bold nav-link rounded-2"
                  >
                    About
                  </Nav.Link>
                  <Nav.Link
                    as={Link}
                    to="/login"
                    className="fw-bold nav-link rounded-2"
                  >
                    Login
                  </Nav.Link>
                </Nav>
                <Form className="d-flex">
                  <Form.Control
                    type="search"
                    placeholder="Search"
                    className="me-2 search-field"
                    aria-label="Search"
                  />
                  <Button className="fw-bold search-btn">Search</Button>
                </Form>
              </Offcanvas.Body>
            </Navbar.Offcanvas>
          </Container>
        </Navbar>
      </>
    </div>
  );
};

export default Header;
