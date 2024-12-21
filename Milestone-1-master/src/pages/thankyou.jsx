import React from "react";
import SVG from "./thankyou.svg";
import { Box, Button } from "@mui/material";
import { Link } from "react-router-dom";

export default function thankyou() {
  return (
    <>
      <div
        style={{ display: "flex", justifyContent: "center", padding: "90px" }}
      >
        <img src={SVG} alt="Your SVG" />
      </div>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          gap: "20%",

          padding: 4,
        }}
      >
        <Link to={"/shop"}>
          <Button variant="contained">Continue Shopping</Button>
        </Link>
        <Link to={"/viewOrders"}>
          <Button variant="contained">View Orders</Button>
        </Link>
      </Box>
    </>
  );
}
