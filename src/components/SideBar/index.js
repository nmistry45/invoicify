import React, { useState } from "react";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import ArticleIcon from "@mui/icons-material/Article";
import AddBoxIcon from "@mui/icons-material/AddBox";
import StackedBarChartIcon from "@mui/icons-material/StackedBarChart";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import MuiDrawer from "@mui/material/Drawer";
import { Box, Paper } from "@mui/material";
import { useHistory } from "react-router-dom";
import { useStyles } from "./style";

export default function SideBar() {
  const [open, setOpen] = useState(true);
  const classes = useStyles();
  const routePath = ["dashboard", "invoiceList", "invoice", "customers"];
  const history = useHistory();
  const handleClick = (i) => {
    history.push(`/${routePath[i]}`);
  };
  return (
    <Paper elevation={2} sx={{ height: "100%" }}>
      <List
        sx={{ width: "100%", bgcolor: "background.paper" }}
        className={classes.root}
      >
        {["Dashboard", "All Invoices", "Create Invoice", "Customers"].map(
          (text, index) => (
            <ListItem
              key={text}
              disablePadding
              sx={{ display: "block" }}
              onClick={() => handleClick(index)}
            >
              <ListItemButton
                sx={{
                  minHeight: 48,
                  justifyContent: open ? "initial" : "center",
                  px: 2.5,
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : "auto",
                    justifyContent: "center",
                  }}
                >
                  {index == 0 && <StackedBarChartIcon />}
                  {index == 1 && <ArticleIcon />}
                  {index == 2 && <AddBoxIcon />}
                  {index == 3 && <PeopleAltIcon />}
                </ListItemIcon>
                <ListItemText primary={text} sx={{ opacity: open ? 1 : 0 }} />
              </ListItemButton>
            </ListItem>
          )
        )}
      </List>
    </Paper>
  );
}
