import { Fragment } from "react";
import Wrapper from "../components/wrapper/Wrapper";
import Section from "../components/Section";
import { discoutProducts } from "../utils/products";
import SliderHome from "../components/Slider";
import useWindowScrollToTop from "../hooks/useWindowScrollToTop";
import { useState, useEffect } from "react";
import axios from "axios";
const Home = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  useEffect(() => {
    axios
      .get("http://localhost:7000/customer/viewAllProducts")
      .then((response) => {
        setProducts(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
    axios
      .get("http://localhost:7000/customer/viewAllCategories")
      .then((response) => {
        setCategories(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  const newArrivalData = products.filter(
    (item) =>
      item?.category_id?.title === "Mobiles" ||
      item?.category_id?.title === "Laptops"
  );
  console.log(newArrivalData);
  console.log(products);
  const bestSales = products.filter(
    (item) => item?.category_id?.title === "Cloths"
  );
  useWindowScrollToTop();
  return (
    <Fragment>
      <SliderHome />
      <Wrapper categories={categories} />
      {/* <Section
        title="Big Discount"
        bgColor="#f6f9fc"
        productItems={discoutProducts}
      /> */}
      {/* <Section
        title="New Arrivals"
        bgColor="white"
        productItems={newArrivalData}
      /> */}
      {/* <Section title="Best Sales" bgColor="#f6f9fc" productItems={bestSales} /> */}
    </Fragment>
  );
};

export default Home;
