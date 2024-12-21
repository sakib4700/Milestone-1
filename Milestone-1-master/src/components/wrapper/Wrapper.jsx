import React from "react";
import "./style.css";
import { Col, Container, Row } from "react-bootstrap";
import { serviceData } from "../../utils/products";
import { Link } from "react-router-dom";

const Wrapper = ({ categories }) => {
  return (
    <section className="wrapper background">
      <Container>
        <Link style={{ textDecoration: "none" }} to={"/shop"}>
          {" "}
          <Row>
            {categories.map((val, index) => {
              return (
                <Col
                  md={3}
                  sm={5}
                  xs={9}
                  // style={{ backgroundColor: "#f6f9fc" }}
                  className="feature"
                  key={index}
                >
                  <div className="">
                    <img
                      style={{
                        width: "100px",
                        height: "100px",
                        objectFit: "cover",
                        borderRadius: "10px", // Adjust the border radius as needed
                        // boxShadow: "0 0 10px rgba(0, 0, 0, 0.5)", // Add a box shadow for the blur effect
                      }}
                      src={`http://localhost:7000/uploads/category/${val.picture}`}
                      alt="category"
                    />
                  </div>
                  <h3>{val.title}</h3>
                  {/* <p>{val.}</p> */}
                </Col>
              );
            })}
          </Row>
        </Link>
      </Container>
    </section>
  );
};

export default Wrapper;
