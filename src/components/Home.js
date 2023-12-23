import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { BE_URL } from "../utils.js/config";
import { Button, Card, Col, Container, Form, Row } from "react-bootstrap";

const Home = () => {
  const [recipeData, setRecipeData] = useState([]);
  const [renderRecipeData, setRenderRecipeData] = useState([]);

  const [search, setSearch] = useState("");

  const [searchMessage, setSearchMessage] = useState(false);

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

  useEffect(() => {
    if (!search && renderRecipeData !== recipeData) {
      setRenderRecipeData(recipeData);
      setSearchMessage(false);
    }
  }, [search, renderRecipeData, recipeData]);

  const fetchRecipes = async () => {
    const recipeData = await axios.get(`${BE_URL}`);
    setRecipeData(recipeData.data);
    setRenderRecipeData(recipeData.data);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    const filteredData = recipeData.filter(
      (item) =>
        item.recipeTitle.toLowerCase().includes(search.toLowerCase()) ||
        item.tags.some((tag) =>
          tag.toLowerCase().includes(search.toLowerCase())
        )
    );

    if (filteredData.length === 0) {
      setSearchMessage(true);
    } else {
      setRenderRecipeData(filteredData);
    }
  };

  const debounce = (func, delay) => {
    let timeoutId;

    return (...args) => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        func.apply(this, args);
      }, delay);
    };
  };

  const debouncedFunction = debounce(handleSearch, 500);

  const handleOnchange = (e) => {
    setSearch(e.target.value);
    debouncedFunction(e);
  };

  return (
    <div className="container d-grid justify-content-center">
      <Container fluid>
        <Row>
          <Col xs={12}>
            <div className={`d-grid justify-content-end`}>
              <Form className="d-flex">
                <Form.Control
                  type="search"
                  placeholder="Search"
                  className="me-2 search-field"
                  aria-label="Search"
                  //onFocus={handleClick}
                  onChange={(e) => handleOnchange(e)}
                />
                <Button
                  onClick={(e) => debouncedFunction(e)}
                  className="fw-bold search-btn"
                >
                  Search
                </Button>
              </Form>
            </div>
          </Col>
        </Row>
      </Container>

      <Container className="m-5 w-4">
        <Row className="gap-3">
          {searchMessage
            ? "No recipe found"
            : renderRecipeData.map((data) => (
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
