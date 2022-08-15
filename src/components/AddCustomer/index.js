import * as React from "react";
import { useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { Box, Divider } from "@mui/material";
import axios from "axios";
import { SettingsPowerRounded } from "@material-ui/icons";
import { BACKEND_URL } from "../../config";

export default function AddCustomerComp(props) {
  // const [open, setOpen] = React.useState(false);
  const userInfo = props.userInfo;
  console.log("userInfo on addcustomer.....", userInfo.email);
  const [clientData, setClientData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    creator: "",
  });

  const { handleClickOpen, handleClose, open } = props;

  // const handleClickOpen = () => {
  //   setOpen(true);
  // };

  // const handleClose = () => {
  //   setOpen(false);
  // };

  const api = `${BACKEND_URL}/addCustomer`;

  const handleCreate = () => {
    axios
      .post(api, { ...clientData, creator: `${userInfo.email}` })
      .then((response) => {
        console.log(response);
        alert("Customer Created Successfully");
        handleClose();
        window.location.reload(false);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <Box pt={16}>
      {/* <Button variant="outlined" onClick={handleClickOpen}>
        Create Customer
      </Button> */}
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Add New Customer</DialogTitle>
        <Divider />
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Name"
            fullWidth
            variant="standard"
            onChange={(e) =>
              setClientData({ ...clientData, name: e.target.value })
            }
            value={clientData.name}
          />
          <TextField
            margin="dense"
            id="name"
            label="Email Address"
            type="email"
            fullWidth
            variant="standard"
            onChange={(e) =>
              setClientData({ ...clientData, email: e.target.value })
            }
            value={clientData.email}
          />
          <TextField
            margin="dense"
            id="phone"
            label="Phone Number"
            fullWidth
            variant="standard"
            onChange={(e) =>
              setClientData({ ...clientData, phone: e.target.value })
            }
            value={clientData.phone}
          />
          <TextField
            margin="dense"
            id="address"
            label="Address"
            fullWidth
            variant="standard"
            onChange={(e) =>
              setClientData({ ...clientData, address: e.target.value })
            }
            value={clientData.address}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleCreate}>Create</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
