import { Container } from "react-bootstrap";
import { useRouteError } from "react-router-dom";

const Error = () => {
  const error = useRouteError();
  return (
    <div className="container d-flex justify-content-center">
      <Container className="m-5 w-50">
        <h1>OOPS!!!</h1>
        <h3>Something went wrong!</h3>
        <h3>{error?.error?.message}</h3>
        <h4>{error?.status + " " + error?.statusText}</h4>
      </Container>
    </div>
  );
};

export default Error;
