
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { NavLink } from "react-router-dom";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Button from "react-bootstrap/Button"
import "./CSS/home.css";
const AppNavbar = () => {
  const [expanded, setExpanded] = useState(false);

  const closeNavbar = () => setExpanded(false);

  return (
    <Navbar
      expanded={expanded}
      bg="danger"
      variant="dark"
      expand="lg"
      fixed="top"
    >
      <Navbar.Brand as={NavLink} to="/" onClick={closeNavbar}>
        TOH
      </Navbar.Brand>
      <Navbar.Toggle
        aria-controls="responsive-navbar-nav"
        onClick={() => setExpanded(!expanded)}
      />
      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className="mr-auto">
          <Nav.Link as={NavLink} to="/" onClick={closeNavbar}>
            Home
          </Nav.Link>
          <Nav.Link as={NavLink} to="/about" onClick={closeNavbar}>
            About
          </Nav.Link>
          <Nav.Link as={NavLink} to="/contactus" onClick={closeNavbar}>
            Contact
          </Nav.Link>
          <Nav.Link as={NavLink} to="/feedback" onClick={closeNavbar}>
            Feedback
          </Nav.Link>
          <Nav.Link as={NavLink} to="/tollplaza" onClick={closeNavbar}>
            Tollguy
          </Nav.Link>
          <Nav.Link as={NavLink} to="/User-data" onClick={closeNavbar}>
            CheckReports
          </Nav.Link>
          <Nav.Link as={NavLink} to="/Dealer" onClick={closeNavbar}>
            Dealer
          </Nav.Link>
          <Nav.Link as={NavLink} to="/admin" onClick={closeNavbar}>
            Admin
          </Nav.Link>
        </Nav>
        <Nav className="ml-auto">
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default AppNavbar;