
import React from "react";
import "./CSS/home.css";
import { Link } from "react-router-dom";
import Fc from "../User/Fc";

const Home = () => {
  return (
    <>
      <div className="box">
        <div className="row g-3">
          <div className="col-md-4 mb-3">
            <div className="card h-100 d-flex flex-column">
              <div className="card-body d-flex flex-column align-items-center">
                <h5 className="card-title">Toll plaza</h5>
                <Link to="/tollplaza" className="btn btn-danger">
                  Click here!!!
                </Link>
              </div>
            </div>
          </div>
          <div className="col-md-4 mb-3">
            <div className="card h-100 d-flex flex-column">
              <div className="card-body d-flex flex-column align-items-center">
                <h5 className="card-title">Reports</h5>
                <Link to="/User-data" className="btn btn-danger">
                  Click here!!!
                </Link>
              </div>
            </div>
          </div>
          <div className="col-md-4 mb-3">
            <div className="card h-100 d-flex flex-column">
              <div className="card-body d-flex flex-column align-items-center">
                <h5 className="card-title">Dealer</h5>
                <Link to="/Dealer" className="btn btn-danger">
                  Click here!!!
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Fc />
    </>
  );
};

export default Home;
