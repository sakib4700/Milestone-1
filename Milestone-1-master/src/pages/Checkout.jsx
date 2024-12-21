import { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";

import { toast } from "react-toastify";
import axios from "axios";
import { styled } from "@mui/material/styles";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import { TextField, Card, Button } from "@mui/material";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import { useNavigate } from "react-router-dom";


const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));
const Cart = () => {
  const navigate = useNavigate();
  const [selectPay, setSelectPay] = useState("");
  const [details, setDetails] = useState({});
  const [cartData, setCartData] = useState([]);
  const [Token, setToken] = useState("");
  const HandleChange = (e) => {
    if (e?.target?.value == "upi") {
      setSelectPay(e?.target?.value);
    } else if (e?.target?.value == "cash") {
      setSelectPay(e?.target?.value);
    }
    setDetails({ ...details, [e.target.name]: e?.target?.value });
  };
  const HandleDetails = (e) => {
    setDetails({ ...details, [e.target.name]: e?.target?.value });
  };
  console.log(details);
  useEffect(() => {
    if (localStorage.getItem("Token") == null) {
      navigate("/login");
    }
    const token = JSON.parse(localStorage.getItem("Token"));
    const user = JSON.parse(localStorage.getItem("user"));
    setToken(token);
    axios
      .get("http://localhost:7000/customer/viewCart/" + user?._id)
      .then((res) => {
        console.log(res.data);
        if (res.data.length > 0) {
          setCartData(res.data);
        } else {
          navigate("/shop");
          toast.warning("No Products in your cart!");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  console.log(cartData);
  const totalPrice = cartData.reduce(
    (price, item) => price + item.quantity * item.product_id.price,
    0
  );
  const HandleOrder = () => {
    console.log(details);
    if (
      details?.trans_id == "" ||
      (details?.trans_id == null && details?.paymethod != "cash" )
    ) {
      alert("Please fill the transaction id!");
    }else if(!details.name || !details.email || !details.phone || !details.address || !details.state || !details.pincode){
      alert('fill The Form')
    }else{
    
    var total;
    let order = cartData.map((data) => {
      return (total = data.quantity * data.product_id.price);
    });
    console.log(total);
    console.log(order);
    console.log(cartData);
    let updated = {
      cartData,
      order,
      details,
    };
    axios
      .post("http://localhost:7000/customer/insertorder", updated, {
        headers: { "auth-token": Token },
      })

      .then((res) => {
        console.log(res.data);
        if (res.data.success == true) {
          
        }
        navigate("/thankyou");
        // respond=res.data
      })
      .catch((err) => {
        console.log(err);
        navigate("/thankyou"); 
      });
    }
  };
  return (
    <section className="cart-items">
      <Box sx={{ width: "100%", padding: 5 }}>
        <Card style={{ padding: "20px" }}>
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <h5 style={{ fontFamily: "fantasy" }}>CheckOut</h5>
            <h6 style={{ fontFamily: "fantasy" }}>
              Total Payable Amount : ₹{totalPrice}
            </h6>
          </Box>
          <Grid
            sx={{
              padding: 5,
              display: "flex",
              justifyContent: "center",
            }}
            container
            rowSpacing={1}
            columnSpacing={{ xs: 1, sm: 2, md: 3 }}
          >
            <Grid item xs={6}>
              <TextField
                style={{ width: "100%" }}
                variant="outlined"
                onChange={HandleDetails}
                name="name"
                label="Name"
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                style={{ width: "100%" }}
                type="email"
                name="email"
                onChange={HandleDetails}
                variant="outlined"
                label="Email"
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                style={{ width: "100%" }}
                type="number"
                name="phone"
                onChange={HandleDetails}
                variant="outlined"
                label="Phone number"
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                style={{ width: "100%" }}
                variant="outlined"
                name="address"
                onChange={HandleDetails}
                label="Address"
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                style={{ width: "100%" }}
                variant="outlined"
                name="state"
                onChange={HandleDetails}
                label="State"
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                style={{ width: "100%" }}
                type="number"
                name="pincode"
                onChange={HandleDetails}
                variant="outlined"
                label="Pincode"
              />
            </Grid>
          </Grid>
          <h4 style={{ textAlign: "center", fontFamily: "fantasy" }}>
            Payment
          </h4>
          <hr />
          <Box sx={{ display: "flex", justifyContent: "center" }}>
            <FormControl>
              <RadioGroup
                aria-labelledby="demo-radio-buttons-group-label"
                defaultValue="female"
                name="radio-buttons-group"
              >
                <FormControlLabel
                  value="upi"
                  name="paymethod"
                  onChange={HandleChange}
                  control={<Radio />}
                  label="Upi"
                />
                {selectPay == "upi" && (
                  <Grid
                    item
                    xs={12}
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                      padding: 5,
                    }}
                  >
                    <Box sx={{ display: "flex", flexDirection: "column" }}>
                      <img
                        src="https://img.freepik.com/premium-vector/qr-code_578229-236.jpg?size=626&ext=jpg&ga=GA1.1.91097837.1700988374&semt=ais"
                        alt=""
                      />
                      <TextField
                        sx={{ mt: 2 }}
                        name="trans_id"
                        onChange={HandleChange}
                        variant="outlined"
                        label="Transaction Id"
                      />
                    </Box>
                  </Grid>
                )}
                <Box>
                  <Box>
                    <FormControlLabel
                      value="cash"
                      name="paymethod"
                      control={<Radio />}
                      onChange={HandleChange}
                      label="Cash"
                    />
                    {selectPay == "cash" && (
                      <small
                        style={{
                          fontWeight: "bolder",
                          fontSize: "10px",
                          color: "green",
                        }}
                      >
                        Pay After delivery
                      </small>
                    )}
                  </Box>
                </Box>
              </RadioGroup>
            </FormControl>
          </Box>

          <Grid
            item
            xs={12}
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Button
              variant="outlined"
              style={{ width: "30%" }}
              onClick={HandleOrder}
              color="success"
            >
              Submit
            </Button>
          </Grid>
        </Card>
      </Box>
    </section>
  );
};

export default Cart;
