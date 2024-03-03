import React, { useState } from "react";
import axios from "axios";
import "./CSS/home.css";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

const Feedback = () => {
  const [email, setEmail] = useState("");
  const [feedback, setFeedback] = useState("");

  const submitForm = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:8000/feedback", // Replace with your actual backend API endpoint
        { email, feedback }
      );

      console.log("Feedback submitted:", response.data);

      // Clear the fields
      setEmail("");
      setFeedback("");

      // You can handle success feedback or redirection here
    } catch (error) {
      console.error("Error submitting feedback:", error);
      // You can handle error feedback here
    }
  };

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
            <h1 className="text-center">Provide Your Feedback</h1>
            <p className="lead text-center">
              We value your feedback! Your insights help us improve our services and make your experience on highways Safer.
            </p>
            <form onSubmit={submitForm}>
              <div className="mb-3">
                <label htmlFor="exampleFormControlInput1" className="form-label">
                  Email address:
                </label>
                <input
                  type="email"
                  className="form-control"
                  id="exampleFormControlInput1"
                  placeholder="name@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="exampleFormControlTextarea1" className="form-label">
                  Feedback:
                </label>
                <textarea
                  className="form-control"
                  id="exampleFormControlTextarea1"
                  rows="3"
                  placeholder="Enter feedback here!!"
                  value={feedback}
                  onChange={(e) => setFeedback(e.target.value)}
                ></textarea>
                <button type="submit" className="btn btn-danger mt-3">
                  SUBMIT
                </button>
              </div>
            </form>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Feedback;
