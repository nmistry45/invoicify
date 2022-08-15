import { Box, Grid } from "@mui/material";
import React, { useEffect, useState } from "react";
import SideBar from "../../components/SideBar";
import NavBar from "../NavBar";
import axios from "axios";
import CustomerListComp from "../../components/CustomerList";
import { BACKEND_URL } from "../../config";

const CustomerList = (props) => {
  const [customerData, setCustomerData] = useState([]);
  const [deleteRes, setDeleteRes] = useState("");
  const { userInfo } = props;
  const fetchCustomer = () => {
    const getCustomerAPI = `${BACKEND_URL}/fetchCustomer?userID=${userInfo.email}`;

    axios
      .get(getCustomerAPI)
      .then((response) => {
        setCustomerData(response.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    fetchCustomer();
  }, []);

  const handleDelete = (email) => {
    axios
      .get(`${BACKEND_URL}/deleteCustomer?email=${email}`)
      .then((response) => {
        setDeleteRes(response.data.body);
        if (response.data.body === "success") {
          fetchCustomer(); // reload data after deleting customer
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

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
          <CustomerListComp data={customerData} handleDelete={handleDelete} />
        </Box>
      </Grid>
    </Grid>
  );
};

export default CustomerList;
