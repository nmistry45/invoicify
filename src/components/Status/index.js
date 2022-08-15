import { useContext, useEffect, useState } from "react";
import { AccountContext } from "../Account";
import { Box, Button, Typography, Container } from "@mui/material";

const Status = () => {
  const [status, setStatus] = useState(false);
  const { getSession, logout } = useContext(AccountContext);

  useEffect(() => {
    getSession()
      .then((session) => {
        setStatus(true);
      })
      .catch((err) => {
        console.log("Session error: ", err);
        setStatus(false);
      });
  }, [status]);

  return (
    <Container maxWidth="xs">
      {status ? (
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography>You are logged in.</Typography>
          <Button onClick={logout}>Logout</Button>
        </Box>
      ) : (
        <Typography>Please Login</Typography>
      )}
    </Container>
  );
};

export default Status;
