// src/components/AboutUsPage.js
import React from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Link } from "react-router-dom";

const Text = () => {
  return (
    <div
      style={{
        backgroundColor: "#f8f9fa",
        minHeight: "100vh",
        padding: "20px",
      }}
      className="mt-5"
    >
      <Container>
        <Row>
          <Col
            md={{ span: 8, offset: 2 }}
            className="text-center"
            style={{
              backgroundColor: "white",
              padding: "20px",
              borderRadius: "8px",
            }}
          >
            <h1>Dealer Cracked Tire Reports</h1>
            <p className="lead">
              As a dealer, you play a crucial role in ensuring the safety and
              satisfaction of our customers. Here’s how it works:
            </p>
            <ul>
              <li>
                <p>
                  View Reports: Check out cracked tire reports – essential
                  details at your fingertips.
                </p>
              </li>
              <li>
                <p>
                  Assessment: Expertly evaluate the severity. Minor surface
                  crack or critical issue
                </p>
              </li>
              <li>

              <p>Request Service</p>
              </li>
              <li>
                <p>Keep owners informed. Safety first!</p>
              </li>
            </ul>
            <Link to="/reports" className="btn btn-danger">
              View Reports
            </Link>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Text;
