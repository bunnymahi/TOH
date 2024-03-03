import React from 'react';
import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

const ContactUs = () => {
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
        <Card>
          <Card.Body>
            <h1 className="text-center">Contact TiresOnHighways</h1>
            <p className="lead text-center">
              Got a question? We're here to help! Whether it's about your tires or the TiresOnHighways app,
              we're available to assist you. Choose the method that suits you best:
            </p>

            <Row className="mb-3">
              <Col>
                <i className="bi bi-envelope-fill"></i> Email: Toh@gmail.com
              </Col>
              {/* <Col>
                email address
              </Col> */}
            </Row>

            <Row className="mb-3">
              <Col>
                <i className="bi bi-telephone-fill"></i> Phone: 0000-0000-00
              </Col>
              <Col>
                {/* toll-free number */}
              </Col>
            </Row>
            <hr />

            <p className="text-center">For general inquiries:</p>

            <Row className="mb-3">
              <Col>
                Send us a message on social media:
              </Col>
            </Row>
            <Row>
              <Col>
                <a href="https://www.instagram.com">
                  <i className="bi bi-instagram"></i> Instagram
                </a>
              </Col>
            </Row>
            <Row>
              <Col>
                <a href="https://www.facebook.com">
                  <i className="bi bi-facebook"></i> Facebook
                </a>
              </Col>
            </Row>
            <Row>
              <Col>
                <a href="https://twitter.com/">
                <i class="bi bi-twitter-x"></i> Twitter
                </a>
              </Col>
            </Row>
          </Card.Body>
        </Card>
      </Container>
    </div>
  );
};

export default ContactUs;
