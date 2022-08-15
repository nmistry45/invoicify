import { Box, Grid } from "@mui/material";
import React, { useEffect, useState } from "react";
import InvoiceComp from "../../components/Invoice";
import SideBar from "../../components/SideBar";
import NavBar from "../NavBar";
import axios from "axios";
import { BACKEND_URL } from "../../config";

const Invoice = (props) => {
  const { userInfo } = props;

  const [data, setData] = useState([]);
  const [customerData, setCustomerData] = useState([]);
  const api = `${BACKEND_URL}/addInvoice/`;

  const handleSubmit = (invoiceData) => {
    axios
      .post(api, invoiceData)
      .then((response) => {})
      .catch((error) => {
        console.log(error);
      });
  };

  const getCustomerAPI = `${BACKEND_URL}/fetchCustomer?userID=${userInfo.email}`;

  useEffect(() => {
    axios
      .get(getCustomerAPI)
      .then((response) => {
        setCustomerData(response.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <Grid container>
      <Grid item xs={12}>
        <NavBar userInfo={userInfo} />
      </Grid>
      <Grid item xs={12} lg={3}>
        <SideBar />
      </Grid>
      <Grid item xs={12} lg={9}>
        <Box pl={2} pr={4}>
          <InvoiceComp
            userInfo={userInfo}
            handleSubmit={handleSubmit}
            customerData={customerData}
          />
        </Box>
      </Grid>
    </Grid>
  );
};

export default Invoice;
