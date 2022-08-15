import React from "react";
import ReadInvoice from "../ReadInvoice";

export default function SpecificInvoice(props) {
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
        <ReadInvoice />
      </Grid>
    </Grid>
  );
}
