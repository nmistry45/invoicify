import React, { useState } from "react";
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
import { CognitoUser, CognitoUserAttribute } from "amazon-cognito-identity-js";
import UserPoolData from "../../config/aws";
import { Link, useHistory } from "react-router-dom";

function RegisterComp() {
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setconfirmPassword] = useState("");
  const [verifyProcess, setVerifyProcess] = useState(false);
  const [OTP, setOTP] = useState("");

  const history = useHistory();

  const handleSubmit = (e) => {
    e.preventDefault();
    const cognitoAttr = [];
    cognitoAttr.push(new CognitoUserAttribute({ Name: "email", Value: email }));
    UserPoolData.signUp(
      userName,
      password,
      cognitoAttr,
      null,
      (error, data) => {
        if (error) {
          alert("Could not sign up");
        } else {
          setVerifyProcess(true);
          alert("User successfully added!");
        }
      }
    );
  };

  const accountVerify = (e) => {
    e.preventDefault();
    const user = new CognitoUser({
      Username: userName,
      Pool: UserPoolData,
    });
    user.confirmRegistration(OTP, true, (err, data) => {
      if (err) {
        alert("Couldn't verify account");
      } else {
        alert("Account verification success");
        history.push("/");
      }
    });
  };

  return (
    <Container maxWidth="sm">
      <Paper>
        {verifyProcess === false ? (
          <Box
            sx={{
              marginTop: 8,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              paddingTop: 5,
              paddingLeft: 8,
              paddingRight: 8,
              paddingBottom: 5,
            }}
          >
            <Avatar sx={{ m: 1 }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign up
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  autoComplete="email"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  required
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
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="confirmPassword"
                  label="Confirm Password"
                  type="password"
                  id="confirmPassword"
                  value={confirmPassword}
                  onChange={(e) => setconfirmPassword(e.target.value)}
                  autoComplete="confirmPassword"
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
              Sign Up
            </Button>
            <Grid item xs={12}>
              <Link
                onClick={() => {
                  history.push("/");
                }}
              >
                {" "}
                Already a user? Log in
              </Link>
            </Grid>
          </Box>
        ) : (
          <Box
            sx={{
              marginTop: 8,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              padding: 4,
            }}
          >
            <Avatar sx={{ m: 1 }}>
              <LockOutlinedIcon />
            </Avatar>
            <Box pb={2}>
              <Typography component="h1" variant="h5">
                Verify Account
              </Typography>
            </Box>

            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="otp"
                  label="OTP"
                  name="otp"
                  value={OTP}
                  onChange={(e) => setOTP(e.target.value)}
                  autoComplete="otp"
                  autoFocus
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              onClick={accountVerify}
            >
              Verify Account
            </Button>
          </Box>
        )}
      </Paper>
    </Container>
  );
}

export default RegisterComp;
