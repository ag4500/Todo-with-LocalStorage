import React from "react";
import App from "./App";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { Switch } from "react-router-dom";
import All from "./all";
import Active from "./active";
import Complete from "./complete";
import { LinkContainer } from "react-router-bootstrap";
import { Navbar, Nav, Container } from "react-bootstrap";
const Routing = () => (
  <div className="container">
    
    <Router>
      <Navbar>
        <Container>
          <Navbar.Brand>Todo</Navbar.Brand>
          <Nav className="me-auto">
            <LinkContainer to="/">
              <Nav.Link>Add Todo</Nav.Link>
            </LinkContainer>
            <LinkContainer to="/all">
              <Nav.Link>All</Nav.Link>
            </LinkContainer>
            <LinkContainer to="/active">
              <Nav.Link>Active</Nav.Link>
            </LinkContainer>
            <LinkContainer to="/completed">
              <Nav.Link>completed</Nav.Link>
            </LinkContainer>
          </Nav>
        </Container>
      </Navbar>
      <Switch>
        <Route exact path="/" component={App} />
        <Route path="/all" component={All} />
        <Route path="/active" component={Active}/>
        <Route path="/completed" component={Complete} />
      </Switch>
    </Router>
  </div>
);
export default Routing;
