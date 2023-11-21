import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Login from "./components/Login";
import Register from "./components/Register";
import Error from "./components/Error";
import Home from "./components/Home";
import About from "./components/About";
import Profile from "./components/Profile";
import Recipe from "./components/Recipe";
import FogotPassword from "./components/ForgotPassword";
import UpdatePassword from "./components/UpdatePassword";
import AddRecipes from "./components/AddRecipes";

const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Login />,
      },
      {
        path: "/register",
        element: <Register />,
      },
      {
        path: "/forgot-password",
        element: <FogotPassword />,
      },
      {
        path: "/update-password/:token",
        element: <UpdatePassword />,
      },
      {
        path: "/home",
        element: <Home />,
      },
      {
        path: "/about",
        element: <About />,
      },
      {
        path: "/recipe/:id",
        element: <Recipe />,
      },
      {
        path: "/profile",
        element: <Profile />,
      },
      {
        path: "/addrecipes",
        element: <AddRecipes />,
      },
    ],
    errorElement: <Error />,
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<RouterProvider router={appRouter} />);

reportWebVitals();
