import { Col } from "react-bootstrap";
import "./product-card.css";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { addToCart } from "../../app/features/cart/cartSlice";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import { IconButton } from "@mui/material";

const ProductCard = ({ title, productItem }) => {
  const dispatch = useDispatch();
  const router = useNavigate();
  const handelClick = () => {
    router(`/shop/${productItem?._id}`);
  };
  const handelAdd = (productItem) => {
    dispatch(addToCart({ product: productItem, num: 1 }));
    toast.success("Product has been added to cart!");
  };
  return (
    <Col md={3} sm={5} xs={10} className="product mtop">
      {title === "Big Discount" ? (
        <span className="discount">{productItem?.discount}% Off</span>
      ) : null}
      <img
        loading="lazy"
        onClick={() => handelClick()}
        src={`http://localhost:7000/uploads/product/${productItem?.picture}`}
        alt=""
      />
      {/* <div className="product-like">
        <ion-icon name="heart-outline"></ion-icon>
      </div> */}
      <div className="product-details">
        <h3 onClick={() => handelClick()}>{productItem?.title}</h3>
        <div className="price">
          <h4>₹{productItem?.price}</h4>
          <Link to={"/shop/" + productItem?._id}>
            <IconButton>
              <RemoveRedEyeIcon />
            </IconButton>
          </Link>
        </div>
      </div>
    </Col>
  );
};

export default ProductCard;
