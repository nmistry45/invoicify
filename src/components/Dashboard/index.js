import { Box, Grid, Paper, Typography } from "@mui/material";
import React from "react";
import PaidOutlinedIcon from "@mui/icons-material/PaidOutlined";
import AccountBalanceOutlinedIcon from "@mui/icons-material/AccountBalanceOutlined";
import CheckCircleOutlineRoundedIcon from "@mui/icons-material/CheckCircleOutlineRounded";
import AccessTimeRoundedIcon from "@mui/icons-material/AccessTimeRounded";
import ReceiptOutlinedIcon from "@mui/icons-material/ReceiptOutlined";
import SentimentVeryDissatisfiedOutlinedIcon from "@mui/icons-material/SentimentVeryDissatisfiedOutlined";
import TimelapseOutlinedIcon from "@mui/icons-material/TimelapseOutlined";
const DashboardComp = (props) => {
  const { data } = props;
  const keys = [];
  for (const [key, value] of Object.entries(data)) {
    keys.push(key);
  }

  const status = [
    { label: "Payment Received", bColor: "" },
    { label: "Pending Amount", bColor: "" },
    { label: "Overdue", bColor: "" },
    { label: "Total Invoices", bColor: "" },
    { label: "Unpaid Invoices", bColor: "" },
    { label: "Total Amount", bColor: "" },
    { label: "Paid Invoices", bColor: "" },
  ];
  const icons = [
    <CheckCircleOutlineRoundedIcon
      sx={{ color: "#558b2f" }}
      fontSize="large"
    />,
    <TimelapseOutlinedIcon sx={{ color: "#ff8f00" }} fontSize="large" />,
    <SentimentVeryDissatisfiedOutlinedIcon
      sx={{ color: "#dd2c00" }}
      fontSize="large"
    />,
    <ReceiptOutlinedIcon sx={{ color: "#00838f" }} fontSize="large" />,
    <AccessTimeRoundedIcon
      sx={{ color: "#d84315" }}
      color="error"
      fontSize="large"
    />,
    <AccountBalanceOutlinedIcon sx={{ color: "#4527a0" }} fontSize="large" />,
    <PaidOutlinedIcon color="success" fontSize="large" />,
  ];
  return (
    <Grid container spacing={2}>
      {status.map((item, index) => {
        return (
          <Grid item xs={12} lg={3}>
            <Paper elevation={1}>
              <Box display="flex" sx={{ bgcolor: `${item.bColor} ` }}>
                <Box
                  pt={3}
                  pl={2}
                  pb={3}
                  flexDirection="column"
                  sx={{ width: "75%" }}
                >
                  <Typography fontWeight={600} variant="h5">
                    {data[keys[index]]}
                  </Typography>
                  <Typography fontWeight={500} variant="body1" color="#757575">
                    {item.label}
                  </Typography>
                </Box>
                <Box
                  display="flex"
                  justifyContent="center"
                  alignItems="center"
                  sx={{ width: "25%" }}
                >
                  {icons[index]}
                </Box>
              </Box>
            </Paper>
          </Grid>
        );
      })}
    </Grid>
  );
};

export default DashboardComp;
