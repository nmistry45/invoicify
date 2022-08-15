import React, { useState, useEffect } from "react";
import { useStyles } from "./style";
import { withStyles } from "@mui/styles";
import {
  Avatar,
  Box,
  Chip,
  Divider,
  Grid,
  Paper,
  Select,
  TextField,
  Typography,
  Table,
  TableCell,
  TableBody,
  TableHead,
  TableRow,
  TableContainer,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import moment from "moment";

const TableHeader = withStyles((theme) => ({
  root: {
    backgroundColor: "#f5f5f5",
    color: "white",
  },
}))(TableHead);

const TableHeaderCell = withStyles((theme) => ({
  root: {
    color: "black",
    fontWeight: 600,
  },
}))(TableCell);

const TableFormatCell = withStyles((theme) => ({
  root: {
    cursor: "pointer",
    textAlign: "center",
  },
}))(TableCell);

const InvoiceListComp = (props) => {
  const headerStyle = { borderBottom: "none", textAlign: "center" };
  const data = props.data.data;
  const classes = useStyles();
  const handleViewInvoice = (invoiceNumber) => {
    props.handleViewInvoice(invoiceNumber);
    console.log("invoice number", invoiceNumber);
  };

  const handleDelete = (invoiceNumber) => {
    props.handleDelete(invoiceNumber);
  };

  const handleEdit = (invoiceNumber) => {
    props.handleEdit(invoiceNumber);
  };

  const displayContent = () => {
    return (
      <>
        {data &&
          data.map((item, index) => {
            return (
              <>
                <TableRow
                  className={classes.tableRow}
                  onClick={() => handleViewInvoice(item.invoiceNumber)}
                  key={index}
                >
                  <TableFormatCell>{item.invoiceNumber}</TableFormatCell>
                  <TableFormatCell>{item.client.name}</TableFormatCell>
                  <TableFormatCell>{item.total}</TableFormatCell>
                  <TableFormatCell>
                    {moment(item.dueDate.substring(0, 10)).format("MM/DD/yyyy")}
                  </TableFormatCell>
                  <TableFormatCell>{item.payment_status}</TableFormatCell>
                  {/* <TableFormatCell>
                    <Typography color="red">Unpaid</Typography>
                  </TableFormatCell> */}

                  {/* <TableFormatCell>
                    <EditIcon onClick={() => handleEdit(item.invoiceNumber)} />
                  </TableFormatCell> */}
                  <TableFormatCell>
                    <DeleteOutlineIcon
                      onClick={() => handleDelete(item.invoiceNumber)}
                    />
                  </TableFormatCell>
                </TableRow>
              </>
            );
          })}
      </>
    );
  };

  return (
    <Box pt={2}>
      <TableContainer component={Paper} elevation={0}>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHeaderCell style={headerStyle}>Number</TableHeaderCell>
              <TableHeaderCell style={headerStyle}>Client</TableHeaderCell>
              <TableHeaderCell style={headerStyle}>Amount</TableHeaderCell>
              <TableHeaderCell style={headerStyle}>Due Date</TableHeaderCell>
              <TableHeaderCell style={headerStyle}>
                Payment Status
              </TableHeaderCell>
              {/* <TableHeaderCell style={headerStyle}>Edit</TableHeaderCell> */}
              <TableHeaderCell style={headerStyle}>Delete</TableHeaderCell>
            </TableRow>
          </TableHeader>
          <TableBody>{displayContent()}</TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default InvoiceListComp;
