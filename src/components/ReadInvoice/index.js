import Button from "@mui/material/Button";
import {
  Box,
  Divider,
  Grid,
  Paper,
  Typography,
  Table,
  TableCell,
  TableBody,
  TableHead,
  TableRow,
  TableContainer,
} from "@mui/material";
import React from "react";
import { withStyles } from "@mui/styles";
import { useStyles } from "../Invoice/style";
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

const ReadInvoiceComp = (props) => {
  const data = props.data;
  const dueDateNew =
    Object.keys(data).length !== 0 &&
    moment(data.dueDate.substring(0, 10)).format("MM/DD/yyyy");

  const classes = useStyles();
  const handleDelete = (invoiceNumber) => {
    props.handleDelete(invoiceNumber);
  };

  const handlePayment = (invoiceNumber) => {
    props.handlePayment(invoiceNumber);
  };

  const handleDownload = (invoiceNumber) => {
    props.handleDownload(invoiceNumber);
  };

  const handleEmail = (data) => {
    props.handleEmail(data);
  };

  const displayTable = () => {
    return (
      <Box pl={3} pr={3} pt={3}>
        <TableContainer component={Paper} className="tb-container">
          <Table className={classes.table} aria-label="simple table">
            <TableHeader>
              <TableRow>
                <TableHeaderCell>Item</TableHeaderCell>
                <TableHeaderCell>Qty</TableHeaderCell>
                <TableHeaderCell>Price</TableHeaderCell>
                <TableHeaderCell>Discount (%)</TableHeaderCell>
                <TableHeaderCell>Amount</TableHeaderCell>
              </TableRow>
            </TableHeader>
            <TableBody>
              {Object.keys(data).length !== 0 &&
                data.products.map((item, index) => (
                  <TableRow key={index}>
                    <TableCell scope="row" style={{ width: "40%" }}>
                      {item.itemName}
                    </TableCell>
                    <TableCell align="left">{item.quantity}</TableCell>
                    <TableCell align="left">{item.unitPrice}</TableCell>
                    <TableCell align="left">{item.discount}</TableCell>
                    <TableCell align="left">
                      {item.quantity * item.unitPrice -
                        (item.quantity * item.unitPrice * item.discount) / 100}
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    );
  };

  const displaySummaryTable = () => {
    return (
      <TableContainer component={Paper} className="tb-container">
        <Table className={classes.table} aria-label="simple table">
          <TableHeader>
            <TableRow>
              <TableHeaderCell>Invoice Summary</TableHeaderCell>
              <TableHeaderCell></TableHeaderCell>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow key={1}>
              <TableCell scope="row" style={{ width: "20%" }}>
                Sub Total:
              </TableCell>
              <TableCell scope="row" style={{ width: "20%" }}>
                {data.subTotal}
              </TableCell>
            </TableRow>
            <TableRow key={1}>
              <TableCell scope="row" style={{ width: "20%" }}>
                VAT(%):
              </TableCell>
              <TableCell scope="row" style={{ width: "20%" }}>
                {data.vat}
              </TableCell>
            </TableRow>
            <TableRow key={3}>
              <TableCell scope="row" style={{ width: "20%" }}>
                Total:
              </TableCell>
              <TableCell scope="row" style={{ width: "20%" }}>
                {data.total}
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    );
  };

  return (
    <Box pt={2} pl={3}>
      <Box display="inline-flex" justifyContent="center" pb={3}>
        <Box pt={2} pl={3} pr={10}>
          <Button
            variant="outlined"
            onClick={(e) => handleDelete(data.invoiceNumber)}
          >
            Delete
          </Button>
        </Box>
        <Box pt={2} pr={10}>
          <Button
            variant="outlined"
            onClick={(e) => handlePayment(data.invoiceNumber)}
          >
            Record Payment
          </Button>
        </Box>
        <Box pt={2} pr={10}>
          <Button
            variant="outlined"
            onClick={(e) => handleDownload(data.invoiceNumber)}
          >
            Download Invoice
          </Button>
        </Box>
        <Box pt={2}>
          <Button variant="outlined" onClick={(e) => handleEmail(data)}>
            Send Invoice in Email
          </Button>
        </Box>
      </Box>

      <Paper elevation={1}>
        <Grid container>
          <Grid item xs={12}>
            <Box pt={2}>
              <Typography fontWeight={600} variant="h4" textAlign="center">
                INVOICE
              </Typography>
            </Box>
          </Grid>

          <Grid item xs={12}>
            <Box display="flex" justifyContent="flex-end" pr={3}>
              <Typography> Invoice #</Typography>
              <Typography>{data.invoiceNumber}</Typography>
            </Box>
          </Grid>
          <Grid item xs={12}>
            <Box pb={2} pl={2} pr={2}>
              <Divider />
            </Box>
          </Grid>
          <Grid item xs={12}>
            <Box pt={3}>
              <Grid container>
                <Grid item xs={6}>
                  <Box display="flex" flexDirection="column" pl={3}>
                    <Typography> BILL TO</Typography>
                  </Box>
                  <Box display="flex" flexDirection="column" pl={3}>
                    {Object.keys(data).length !== 0 && (
                      <>
                        <Typography>{data.client.name}</Typography>
                        <Typography>{data.client.address}</Typography>
                        <Typography>{data.client.email}</Typography>
                        <Typography>{data.client.phone}</Typography>
                      </>
                    )}
                  </Box>
                </Grid>
                <Grid item xs={3}>
                  <Box display="flex" flexDirection="column">
                    <Typography>Payment Status</Typography>
                    <Typography
                      fontWeight={600}
                      variant="h6"
                      color={data.payment_status === "Paid" ? "green" : "red"}
                    >
                      {data.payment_status}
                    </Typography>
                  </Box>
                </Grid>
                <Grid item xs={3}>
                  <Box display="flex" flexDirection="column">
                    <Box>
                      <Typography>Date</Typography>
                      <Typography>
                        {moment(data.createdAt).format("MM/DD/yyyy")}
                      </Typography>
                    </Box>
                    <Box>
                      <Typography>Due Date</Typography>
                      <Typography>{dueDateNew}</Typography>
                    </Box>
                    <Typography>Amount</Typography>
                    <Typography>{data.total}</Typography>
                  </Box>
                </Grid>
              </Grid>
            </Box>
          </Grid>
          <Grid item xs={12}>
            <Box>{displayTable()}</Box>
          </Grid>
          <Grid item xs={6}></Grid>
          <Grid item xs={6}>
            <Box pr={3} pt={4}>
              {displaySummaryTable()}
            </Box>
          </Grid>
          <Grid item xs={3}>
            <Box pl={6} pt={5}>
              <Typography fontWeight={600}> Tax (%) </Typography>
              <Typography> {data.taxRate} </Typography>
            </Box>
          </Grid>
          <Grid item xs={3}>
            <Box pl={3} pt={4}>
              <Typography fontWeight={600}> Due Date </Typography>
              <Typography>{dueDateNew}</Typography>
            </Box>
          </Grid>
          <Grid item xs={6}>
            <Box pl={6} pt={3} pr={5}>
              <Typography fontWeight={600}> Currency </Typography>
              <Typography> {data.currency} </Typography>
            </Box>
          </Grid>
          <Grid item xs={8}></Grid>
          <Grid item xs={12}>
            <Box pl={6} pt={5} pr={6}>
              <Typography fontWeight={600}> Additional Notes</Typography>
              {data.notes}
            </Box>
          </Grid>
        </Grid>
      </Paper>
    </Box>
  );
};
export default ReadInvoiceComp;
