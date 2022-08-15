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

const TableHeader = withStyles((theme) => ({
  root: {
    backgroundColor: "#f5f5f5",
    color: "white",
  },
}))(TableHead);

const TableHeaderCell = withStyles((theme) => ({
  root: {
    fontWeight: 600,
  },
}))(TableCell);

const TableFormatCell = withStyles((theme) => ({
  root: {
    textAlign: "center",
  },
}))(TableCell);

const CustomerListComp = (props) => {
  const headerStyle = { borderBottom: "none", textAlign: "center" };
  const data = props.data;
  const classes = useStyles();

  const handleDelete = (email) => {
    props.handleDelete(email);
  };

  const displayContent = () => {
    return (
      <>
        {data.length !== 0 &&
          data.map((item, index) => {
            return (
              <>
                <TableRow className={classes.tableRow} key={index}>
                  <TableFormatCell>{index + 1}</TableFormatCell>
                  <TableFormatCell>{item.name}</TableFormatCell>
                  <TableFormatCell>{item.email}</TableFormatCell>
                  <TableFormatCell>{item.phone}</TableFormatCell>
                  {/* <TableFormatCell>
                    <EditIcon onClick={() => handleEdit(item.invoiceNumber)} />
                  </TableFormatCell> */}
                  <TableFormatCell>
                    <DeleteOutlineIcon
                      onClick={() => handleDelete(item.email)}
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
              <TableHeaderCell style={headerStyle}>Name</TableHeaderCell>
              <TableHeaderCell style={headerStyle}>Email</TableHeaderCell>
              <TableHeaderCell style={headerStyle}>Phone</TableHeaderCell>
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

export default CustomerListComp;
