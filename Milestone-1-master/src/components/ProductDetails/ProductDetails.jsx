import { useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { addToCart } from "../../app/features/cart/cartSlice";
import "./product-details.css";
import axios from "axios";

const ProductDetails = ({ selectedProduct, state, setState, cartList }) => {
  const dispatch = useDispatch();

  const [quantity, setQuantity] = useState(1);
  const handleQuantityChange = (e) => {
    setQuantity(e.target.value);
  };
  const handelAdd = (selectedProduct, quantity) => {
    // dispatch(addToCart({ product: selectedProduct, num: quantity }));
    toast.success("Product has been added to cart!");
    let user = JSON.parse(localStorage.getItem("user"));
    let addTocart = {
      quantity: 1,
      product_id: selectedProduct?._id,
      customer_id: user?._id,
    };
    axios
      .post("http://localhost:7000/customer/addToCart", addTocart)
      .then((response) => {
        setState(!state);
        console.log(response.data);
      })
      .catch((error) => console.log(error.message));
  };
  // let checkProductInCart = cartList?.filter((item) => item.?.product_id?._id===selectedProduct?._id);
  // console.log(checkProductInCart)

  return (
    <section className="product-page">
      <Container>
        <Row className="justify-content-center">
          <Col md={6}>
            <img
              loading="lazy"
              src={`http://localhost:7000/uploads/product/${selectedProduct?.picture}`}
              alt=""
            />
          </Col>
          <Col md={6}>
            <h2>{selectedProduct?.title}</h2>
            {/* <div className="rate">
              <div className="stars">
                <i className="fa fa-star"></i>
                <i className="fa fa-star"></i>
                <i className="fa fa-star"></i>
                <i className="fa fa-star"></i>
                <i className="fa fa-star"></i>
              </div>
              <span>{selectedProduct?.avgRating} ratings</span>
            </div> */}
            <div className="info">
              <span className="price">₹ {selectedProduct?.price}</span>
              <span>category : {selectedProduct?.category_id?.title}</span>
            </div>
            <p>{selectedProduct?.description}</p>
            {/* <input
              className="qty-input"
              type="number"
              placeholder="Qty"
              value={quantity}
              onChange={handleQuantityChange}
            /> */}
            <button
              aria-label="Add"
              type="submit"
              className="add"
              onClick={() => handelAdd(selectedProduct, quantity)}
            >
              Add To Cart
            </button>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default ProductDetails;
