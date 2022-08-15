import { Box, Grid } from "@mui/material";
import React, { useEffect, useState } from "react";
import SideBar from "../../components/SideBar";
import NavBar from "../NavBar";
import axios from "axios";
import EditInvoiceComp from "../../components/EditInvoice";
import { BACKEND_URL } from "../../config";

const Invoice = (props) => {
  const { userInfo } = props;

  const [data, setData] = useState([]);
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
        setData(response);
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
          <EditInvoiceComp handleSubmit={handleSubmit} data={data} />
        </Box>
      </Grid>
    </Grid>
  );
};

export default Invoice;
