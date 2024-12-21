import { Col, Container, Row } from "react-bootstrap";
import FilterSelect from "../components/FilterSelect";
import SearchBar from "../components/SeachBar/SearchBar";
import { Fragment, useState } from "react";
import ShopList from "../components/ShopList";
import Banner from "../components/Banner/Banner";
import useWindowScrollToTop from "../hooks/useWindowScrollToTop";
import { useEffect } from "react";
import axios from "axios";
const Shop = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [filterList, setFilterList] = useState([]);
  useEffect(() => {
    axios
      .get("http://localhost:7000/customer/viewAllProducts")
      .then((response) => {
        console.log(response.data);
        let allProducts = response.data;
        // let filteredProducts = allProducts.filter((product) => product.isAvailable === true);
        setProducts(response.data);
        setFilterList(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
    axios
      .get("http://localhost:7000/customer/viewAllCategories")
      .then((response) => {
        setCategories(response.data);
        // let filteredProducts = allProducts.filter((product) => product.isAvailable === true);
        // setProducts(response.data);
        // setFilterList(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  // products.filter((item) => item.category === "sofa")
  useWindowScrollToTop();
  console.log(filterList);
  return (
    <Fragment>
      <Banner title="Products" />
      <section className="filter-bar">
        <Container className="filter-bar-container">
          <Row className="justify-content-center w-100">
            <Col md={4}>
              <FilterSelect
                products={products}
                categories={categories}
                setFilterList={setFilterList}
              />
            </Col>
            {/* <Col className="w-100 bg-dark"> */}
            <SearchBar products={products} setFilterList={setFilterList} />
            {/* </Col> */}
          </Row>
        </Container>
        <Container>
          <ShopList productItems={filterList} />
        </Container>
      </section>
    </Fragment>
  );
};

export default Shop;
