import { Box, Grid } from "@mui/material";
import React, { useEffect, useState } from "react";
import SideBar from "../components/SideBar";
import NavBar from "../containers/NavBar";
import ReadInvoice from "../containers/ReadInvoice";
import { useParams } from "react-router-dom";

const SpecificInvoicePage = (props) => {
  let { invoiceNumber } = useParams();
  const { userInfo } = props;
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
          <ReadInvoice userInfo={userInfo} invoiceNumber={invoiceNumber} />
        </Box>
      </Grid>
    </Grid>
  );
};

export default SpecificInvoicePage;
