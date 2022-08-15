import React, { useContext, useEffect } from "react";
import { Grid } from "@mui/material";
import NavBar from "../containers/NavBar";
import AddCustomer from "../containers/AddCustomer";
import SideBar from "../components/SideBar";
import { AccountContext } from "../components/Account";
import UserPoolData from "../config/aws";

const HomePage = (props) => {
  const { userInfo } = props;
  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <NavBar userInfo={userInfo} />
      </Grid>
      <Grid item xs={12} lg={3}>
        <SideBar />
      </Grid>
      <Grid item xs={12}>
        <AddCustomer />
      </Grid>
    </Grid>
  );
};

export default HomePage;
