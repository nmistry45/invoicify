import React, { useState, useContext } from "react";
import {
  Avatar,
  Box,
  Button,
  Grid,
  TextField,
  Typography,
  Container,
  Paper,
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { AccountContext } from "../Account";
import { Link, useHistory } from "react-router-dom";

function LoginComp(props) {
  const [userName, setUserName] = useState("");
  // const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { authenticate, getSession } = useContext(AccountContext);

  const history = useHistory();

  const handleSubmit = (e) => {
    e.preventDefault();
    authenticate(userName, password)
      .then((data) => {
        alert("Logged In Successfully");
        getSession()
          .then((session) => {
            console.log("session:", session);
          })
          .catch((err) => {
            console.log("Session error: ", err);
          });
        props.handleLogin();
        history.push("/dashboard");
      })
      .catch((err) => {
        console.log(err);
        alert("Login Failure");
      });

    console.log();
  };

  return (
    <Container maxWidth="sm">
      <Paper>
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            paddingTop: 5,
            paddingLeft: 8,
            paddingRight: 8,
            paddingBottom: 12,
          }}
        >
          <Avatar sx={{ m: 1 }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Log In
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="userName"
                label="User Name"
                name="userName"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                autoComplete="userName"
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="password"
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            onClick={handleSubmit}
          >
            Log In
          </Button>
          <Grid item xs={12}>
            <Link
              onClick={() => {
                history.push("/register");
              }}
            >
              {" "}
              New user? Sign up
            </Link>
          </Grid>
        </Box>
      </Paper>
    </Container>
  );
}

export default LoginComp;
