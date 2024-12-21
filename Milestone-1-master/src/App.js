import { lazy, Suspense, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NavBar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";
import Loader from "./components/Loader/Loader";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import NotFound from "./pages/404";
import { useEffect } from "react";
import axios from "axios";
const Home = lazy(() => import("./pages/Home"));

const Shop = lazy(() => import("./pages/Shop"));
const Cart = lazy(() => import("./pages/Cart"));
const Product = lazy(() => import("./pages/Product"));
const Login = lazy(() => import("./pages/Login"));
const Register = lazy(() => import("./pages/Register"));
const Checkout = lazy(() => import("./pages/Checkout"));
const Thanks = lazy(() => import("./pages/thankyou"));
const ViewOrders = lazy(() => import("./pages/ViewOrders"));
const ViewOrderDetails = lazy(() => import("./pages/ViewOrderDetails"));
function App() {
  const [nav, setNav] = useState(true);
  const [loggedIn, setLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [state, setState] = useState(true);
  const [cartList, setCartList] = useState([]);
  useEffect(() => {
    if (localStorage.getItem("Token") != null) {
      setLoggedIn(JSON.parse(localStorage.getItem("Token")));
      setUser(JSON.parse(localStorage.getItem("user")));
      window.scrollTo(0, 0);
      let customer = JSON.parse(localStorage.getItem("user"));
      let customer_id = customer?._id;
      axios
        .get("http://localhost:7000/customer/viewCart/" + customer_id)
        .then((res) => {
          console.log(res.data);
          setCartList(res.data);
        })
        .catch((err) => console.log(err));
    } else {
      setLoggedIn(false);
    }
  }, [state]);
  return (
    <Suspense fallback={<Loader />}>
      <Router>
        <ToastContainer
          position="top-right"
          autoClose={1000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />
        {nav && (
          <>
            <NavBar
              loggedIn={loggedIn}
              user={user}
              state={state}
              cartList={cartList}
              setState={setState}
            />
          </>
        )}

        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/login"
            element={
              <Login state={state} setState={setState} setNav={setNav} />
            }
          />
          <Route path="/Register" element={<Register setNav={setNav} />} />
          <Route path="/shop" element={<Shop />} />
          <Route
            path="/shop/:id"
            element={
              <Product cartList={cartList} state={state} setState={setState} />
            }
          />
          <Route
            path="/cart"
            element={
              <Cart state={state} cartList={cartList} setState={setState} />
            }
          />
          <Route path="/Checkout" element={<Checkout />} />
          <Route path="/thankyou" element={<Thanks />} />
          <Route path="/viewOrders" element={<ViewOrders />} />
          <Route path="/viewOrderDetails/:id" element={<ViewOrderDetails />} />
          <Route path="/*" element={<NotFound />} />
        </Routes>
        <Footer loggedIn={loggedIn} />
      </Router>
    </Suspense>
  );
}

export default App; 