import React, { useState } from "react";
import axios from "axios";
import "./Tg.css";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

const Icheck = () => {
  const [image, setImage] = useState(null);
  const [responseMessage, setResponseMessage] = useState("");
  const [imageSelected, setImageSelected] = useState(false);

  const submitForm = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("image", image);

    try {
      const response = await axios.post("http://localhost:8000/CheckUp", formData, {
        headers: {
          "content-Type": "multipart/form-data",
        },
      });

      setResponseMessage(response.data.message);
      window.location.reload();
    } catch (error) {
      console.error("Error uploading image:", error);
    }
  };

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
    if (e.target.files.length > 0) {
      setImageSelected(true);
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
            <h1>Tire Checkup Now</h1>
            <p className="lead">Get instant insight into your tires' health.</p>
            <form onSubmit={submitForm}>
              <div>
                <div className="upload">
                  <label htmlFor="input-file" className="upload-label">
                    Upload Image
                  </label>
                  <input
                    type="file"
                    id="input-file"
                    onChange={handleImageChange}
                    style={{ display: "none" }}
                  />
                </div>
                {imageSelected && (
                  <button type="submit" id="btn">
                    Submit
                  </button>
                )}
              </div>
            </form>
            {responseMessage && (
              <div className="mt-3">
                <strong>Server Response:</strong> {responseMessage}
              </div>
            )}
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Icheck;
