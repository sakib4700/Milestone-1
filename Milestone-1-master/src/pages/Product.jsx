import { Fragment, useEffect, useState } from "react";
import Banner from "../components/Banner/Banner";
import { Container } from "react-bootstrap";
import ShopList from "../components/ShopList";
import { products } from "../utils/products";
import { useParams } from "react-router-dom";
import ProductDetails from "../components/ProductDetails/ProductDetails";
import ProductReviews from "../components/ProductReviews/ProductReviews";
import useWindowScrollToTop from "../hooks/useWindowScrollToTop";
import axios from "axios";
const Product = ({ state, setState, cartList }) => {
  const { id } = useParams();
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);

  useEffect(() => {
    window.scrollTo(0, 0);
    axios
      .get("http://localhost:7000/customer/viewAllProducts")
      .then((response) => {
        let allProducts = response.data;
        // let filteredProducts = allProducts.filter((product) => product.isAvailable === true);
        setProducts(response.data);
        console.log(response.data);
        let singleProducts = response.data.filter(
          (product) => product._id === id
        );
        setSelectedProduct(
          ...response.data.filter((product) => product._id === id)
        );
        console.log(singleProducts);
        setRelatedProducts(
          response.data.filter(
            (product) =>
              product?.category_id?._id ===
                singleProducts[0]?.category_id?._id && product?._id != id
          )
        );
      })
      .catch((error) => {
        console.log(error);
      });
  }, [id]);

  console.log(selectedProduct);
  // useEffect(() => {
  //   setSelectedProduct(
  //     products.filter((item) => parseInt(item.id) === parseInt(id))[0]
  //   );
  //   setRelatedProducts(
  //     products.filter(
  //       (item) =>
  //         item.category === selectedProduct?.category &&
  //         item.id !== selectedProduct?.id
  //     )
  //   );
  // }, [selectedProduct, id]);

  useWindowScrollToTop();

  return (
    <Fragment>
      <Banner title={selectedProduct?.title} />
      <ProductDetails
        cartList={cartList}
        state={state}
        setState={setState}
        selectedProduct={selectedProduct}
      />
      {/* <ProductReviews selectedProduct={selectedProduct} /> */}
      <section className="related-products">
        <Container>
          <h3>You might also like</h3>
        </Container>
        <ShopList productItems={relatedProducts} />
      </section>
    </Fragment>
  );
};

export default Product;
