import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { Box, Button } from "@mui/material";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import { styled } from "@mui/material/styles";
import moment from "moment";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

export default function BasicTable() {
  const [orders, setOrders] = useState([]);
  let nav = useNavigate();
  useEffect(() => {
    if (localStorage.getItem("Token") == null) {
      nav("/login");
    }
    const token = JSON.parse(localStorage.getItem("Token"));
    axios
      .get("http://localhost:7000/customer/getUserOrder", {
        headers: { "auth-token": token },
      })
      .then((response) => {
        console.log(response.data);
        setOrders(response.data.order);
      })
      .catch((error) => {
        console.log(error.message);
      });
  }, []);
  return (
    <Box sx={{ width: "100%", padding: 5 }}>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell align="center" colSpan={6}>
                Your Orders
              </StyledTableCell>
            </TableRow>
            <TableRow>
              <StyledTableCell>Date</StyledTableCell>
              <StyledTableCell align="center">Total Amount</StyledTableCell>
              <StyledTableCell align="center">Status</StyledTableCell>
              <StyledTableCell align="center">Action</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {orders
              ?.filter((row) => row.createdAt) // Filter out invalid dates
              ?.sort((a, b) => moment(b.createdAt) - moment(a.createdAt))
              ?.map((row, index) => (
                <React.Fragment key={index}>
                  {orders.length > 0 ? (
                    <TableRow
                      sx={{
                        "&:last-child td, &:last-child th": { border: 0 },
                      }}
                    >
                      <StyledTableCell>
                        {row.createdAt
                          ? moment(row.createdAt).format("YYYY-MM-DD")
                          : "Invalid Date"}
                      </StyledTableCell>
                      <StyledTableCell align="center">
                        ₹{row.GrandTotal}
                      </StyledTableCell>
                      <StyledTableCell align="center">
                        {row.status}
                      </StyledTableCell>
                      <StyledTableCell align="center">
                        <Link to={`/viewOrderDetails/${row._id}`}>
                          <Button variant="outlined">View</Button>
                        </Link>
                      </StyledTableCell>
                    </TableRow>
                  ) : (
                    <TableRow>
                      <StyledTableCell colSpan={5}>
                        No Orders found!
                      </StyledTableCell>
                    </TableRow>
                  )}
                </React.Fragment>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}
