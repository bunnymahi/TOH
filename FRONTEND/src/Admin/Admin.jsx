import React from 'react'
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
const Admin = () => {
        const handleDownload = async () => {
          try {
            await fetch('/download-images'); // Send GET request to backend endpoint
            // if (response.ok) {
            //   // If response is successful, initiate file download
            //   const blob = await response.blob();
            //   const url = window.URL.createObjectURL(blob);
            //   const a = document.createElement('a');
            //   a.href = url;
            //   a.download = 'images.zip'; // Set the default download filename
            //   document.body.appendChild(a);
            //   a.click();
            //   window.URL.revokeObjectURL(url);
            //   a.remove();
            // } else {
            //   // Handle error response
            //   console.error('Error downloading zip file:', response.statusText);
            // }
          } catch (error) {
            console.error('Error downloading zip file:', error);
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
              <h1>Admin</h1>
              <p className="lead">
                Your tires: The silent guardians of your journey.
              </p>
              <button onClick={handleDownload}>Download Zip</button>
            </Col>
          </Row>
        </Container>
      </div>
    );
  };
  

export default Admin