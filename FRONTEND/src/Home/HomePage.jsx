import React from 'react';
import { Link } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card';

const HomePage = () => {
  return (
    <div className="container" style={{marginTop:"10%"}}>
      <header>
        <h1>Drive safer on highways. Check your tires today!</h1>
        <p>TiresOnHighways: Your smart tire safety partner</p>
        <section id="get-started">
              <Link to="/Udata" className="btn btn-danger">Check Your Tires reports Now</Link>
            </section>
      </header>
      <br />
      <Container>
        <Card>
          <Card.Body>
            <section>
              <h2>Step-by-step process with visuals:</h2>
              <ol>
                <li>Drive through a toll.</li>
                <li>Cameras take pictures.</li>
                <li>Receive instant feedback via SMS.</li>
                <li>Connect with expert care if needed</li>
              </ol>
            </section>
          </Card.Body>
        </Card>
      </Container>
    </div>
  );
};

export default HomePage;
