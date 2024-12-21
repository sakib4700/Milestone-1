import React from "react";
import "./style.css";
import { Col, Container, Row } from "react-bootstrap";
import { useState } from "react";
import { useEffect } from "react";
import { Link } from "react-router-dom";

const Footer = ({ loggedIn }) => {
  return (
    <footer>
      <Container>
        <Row className="footer-row">
          <Col md={3} sm={5} className="box">
            <div className="logo">
              <ion-icon name="bag"></ion-icon>
              <h1>Zwigato</h1>
            </div>
            <p>
            At Zwigato, we understand the importance of quality, freshness, and convenience when it comes to your grocery shopping. We are dedicated to providing you with a seamless online shopping experience, bringing the best of fresh produce, pantry essentials, and specialty items right to your doorstep.
            </p>
          </Col>
          <Col md={3} sm={5} className="box">
            <h2>Quick links</h2>
            <ul>
              <li><Link style={{textDecoration:'none',color:'white'}} to={'/'}>Home</Link></li>
              <li><Link style={{textDecoration:'none',color:'white'}} to={'/shop'}>Shop</Link></li>
              {!loggedIn && (
                <>
                  <li>Login</li>
                  <li>Register</li>
                </>
              )}
            </ul>
          </Col>
          <Col md={3} sm={5} className="box">
            {/* <h2>Customer Care</h2>
            <ul>
              <li>Help Center </li>
              <li>How to Buy </li>
              <li>Track Your Order </li>
              <li>Corporate & Bulk Purchasing </li>
              <li>Returns & Refunds </li>
            </ul> */}
          </Col>
          <Col md={3} sm={5} className="box">
            <h2>Contact Us</h2>
            <ul>
              {/* <li>
                70 Washington Square South, New York, NY 10012, United States{" "}
              </li> */}
              <li>zwigato@gmail.com</li>
            <li>Phone: +91 9148192442 </li>
            </ul>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
