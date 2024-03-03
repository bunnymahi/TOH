// src/components/AboutUsPage.js
import React from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

const About = () => {
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
            <h1>TiresOnHighways: Driving Safer for All</h1>
            <p className="lead">
              Your tires: The silent guardians of your journey.
            </p>

            <p>
              On the vast network of highways, safety is our top priority. Yet,
              one often overlooked element can hold immense power over your
              journey: your tires. Worn-out or damaged tires pose a significant
              risk, jeopardizing not just your own safety but that of everyone
              on the road.
            </p>

            <p>
              Introducing TiresOnHighways, your tire safety partner. This
              innovative initiative leverages cutting-edge technology to ensure
              optimal tire health for every vehicle passing through toll plazas.
            </p>

            <h4>How It Works:</h4>

            <ul>
              <li>
                Smart tire inspection: Advanced cameras at toll plazas takes photos of
                tires, analyzing tread, cracks, and overall condition.
              </li>
              <li>
                Instant feedback: Receive a clear assessment of your tire status
                within seconds through SMS.
              </li>
              <li>
                Proactive care: If your tires show signs of concern, you&apos;ll
                be notified with recommended courses of action.
              </li>
            </ul>

            <h4>Data for a Safer Future:</h4>

            <p>
              TiresOnHighways aims to build a safer driving ecosystem for
              everyone. Your tire data contributes to valuable insights,
              allowing us to track tire health trends, target preventive
              measures, and invest in infrastructure improvements for optimal
              tire safety.
            </p>

            {/* <p>
              Together, let&apos;s make our highways a model for tire safety.
            </p> */}
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default About;
