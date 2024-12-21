import { useEffect } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import {
  addToCart,
  decreaseQty,
  deleteProduct,
} from "../app/features/cart/cartSlice";
import axios from "axios";
import { useState } from "react";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import { Button, Typography } from "@mui/material";

const Cart = ({ state, setState }) => {
  let navigate = useNavigate();
  const [cartList, setCartList] = useState([]);
  // const [state, setState] = useState(true);
  // const { cartList } = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  // middlware to localStorage

  useEffect(() => {
    if (localStorage.getItem("user") == null) {
      navigate("/login");
    }
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
    // if(CartItem.length ===0) {
    //   const storedCart = localStorage.getItem("cartItem");
    //   setCartItem(JSON.parse(storedCart));
    // }
    let customer = JSON.parse(localStorage.getItem("user"));
    let customer_id = customer?._id;
    axios
      .get("http://localhost:7000/customer/viewCart/" + customer_id)
      .then((res) => {
        console.log(res.data);
        setCartList(res.data);
      })
      .catch((err) => console.log(err));
  }, [state]);
  const deleteProductFromCart = (cart) => {
    axios
      .delete(`http://localhost:7000/customer/deleteFromCart/${cart?._id}`)
      .then((res) => {
        console.log(res.data);
        const updatedCartList = cartList.filter(item => item._id !== cart._id);
        setCartList(updatedCartList);
        toast.error(res.data.message);
      })
      .catch((err) => console.log(err));
  };
  
  const updateCart = (cart, condition) => {
    let updatedCart = {
      cart_id: cart?._id,
      quantity: 1,
    };

    if (condition === "inc") {
      updatedCart.quantity = parseInt(cart.quantity) + 1;
    } else {
      if (parseInt(cart.quantity) > 1) {
        updatedCart.quantity = parseInt(cart.quantity) - 1;
      }
    }
    console.log(cart?._id);

    axios
      .put(
        "http://localhost:7000/customer/updateCart/" + cart?._id,
        updatedCart
      )
      .then(async (res) => {
        console.log(res.data);
        setState(!state);
        toast.success(res.data.message);
      })
      .catch((err) => console.log(err));
  };
  const totalPrice = cartList?.reduce(
    (price, item) => price + item.quantity * item?.product_id?.price,
    0
  );
  return (
    <section className="cart-items">
      <Container>
        <Row className="justify-content-center">
          <Col md={8}>
            {cartList.length === 0 && (
              <h1 className="no-items product">No Items are add in Cart</h1>
            )}
            {cartList.map((item, index) => {
              const Total = item?.product_id?.price * item.quantity;
              return (
                <div className="cart-list" key={index}>
                  <Row>
                    <Col className="image-holder" sm={4} md={3}>
                      <img
                        src={`http://localhost:7000/uploads/product/${item?.product_id?.picture}`}
                        alt=""
                      />
                    </Col>
                    <Col sm={8} md={9}>
                      <Row className="cart-content justify-content-center">
                        <Col xs={12} sm={9} className="cart-details">
                          <h3>{item?.product_id?.title}</h3>
                          <h4>
                            ₹{item?.product_id?.price}.00 * {item.quantity}
                            <span>₹{Total}.00</span>
                          </h4>
                        </Col>
                        <Col xs={12} sm={3} className="cartControl">
                          <button
                            className="incCart"
                            onClick={() => updateCart(item, "inc")}
                          >
                            <i className="fa-solid fa-plus"></i>
                          </button>
                          <Typography
                            variant="h4"
                            sx={{ marginLeft: 1, marginRight: 1 }}
                          >
                            {item.quantity}
                          </Typography>
                          {item.quantity > 1 && (
                            <button
                              className="desCart"
                              onClick={() => updateCart(item, "dec")}
                            >
                              <i className="fa-solid fa-minus"></i>
                            </button>
                          )}
                        </Col>
                      </Row>
                    </Col>
                    <button
                      className="delete"
                      onClick={() => deleteProductFromCart(item)}
                    >
                      <ion-icon name="close"></ion-icon>
                    </button>
                  </Row>
                </div>
              );
            })}
          </Col>
          <Col md={4}>
            <div className="cart-total">
              <h2>Cart Summary</h2>
              <div className=" d_flex">
                <h4>Total Price :</h4>
                <h3>₹{totalPrice}.00</h3>
              </div>
            </div>
            <Link to="/Checkout">
              {" "}
              <Button variant="contained" color="primary" fullWidth>
                Checkout
              </Button>
            </Link>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default Cart;
