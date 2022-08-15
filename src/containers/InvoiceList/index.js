import { Box, Grid } from "@mui/material";
import React, { useEffect, useState } from "react";
import InvoiceListComp from "../../components/InvoiceList";
import SideBar from "../../components/SideBar";
import NavBar from "../NavBar";
import axios from "axios";
import { useHistory } from "react-router-dom";
import { BACKEND_URL } from "../../config";

const InvoiceList = (props) => {
  const { userInfo } = props;

  const [data, setData] = useState([]);
  const [deleteRes, setDeleteRes] = useState("");
  const [editRes, setEditRes] = useState("");
  const history = useHistory();
  const fetchData = () => {
    const api = `${BACKEND_URL}/fetchInvoice?userID=${userInfo.email}`;
    axios
      .get(api)
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleDelete = (invoiceNumber) => {
    axios
      .get(`${BACKEND_URL}/deleteInvoice?invoiceNumber=${invoiceNumber}`)
      .then((response) => {
        setDeleteRes(response.data.body);
        if (response.data.body === "success") {
          fetchData(); // reload data after deleting invoice
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleEdit = (invoiceNumber) => {
    axios
      .get(`${BACKEND_URL}/editInvoice?invoiceNumber=${invoiceNumber}`)
      .then((response) => {
        setEditRes(response.data.data);
        if (response.data.data === "success") {
          fetchData(); // reload data after deleting invoice
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleViewInvoice = (invoiceNumber) => {
    history.push(`/readInvoice/${invoiceNumber}`);
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
          <InvoiceListComp
            data={data}
            handleDelete={handleDelete}
            handleEdit={handleEdit}
            handleViewInvoice={handleViewInvoice}
          />
        </Box>
      </Grid>
    </Grid>
  );
};

export default InvoiceList;
