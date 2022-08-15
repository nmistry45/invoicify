import React, { Suspense, useContext, useEffect, useState } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Loader from "./components/Loader";
import Status from "./components/Status";
import { CssBaseline } from "@mui/material";
import { Account, AccountContext } from "./components/Account";
import UserPoolData from "./config/aws";
import axios from "axios";
import { BACKEND_URL } from "./config";

//imports are lazy loaded for better performance and to reduce size of bundle.
const HomePage = React.lazy(() => import("./pages/HomePage"));
const SpecificInvoicePage = React.lazy(() =>
  import("./pages/SpecificInvoicePage")
);

const RegisterUser = React.lazy(() => import("./containers/Registration"));
const LoginUser = React.lazy(() => import("./containers/Login"));
// const NavBar = React.lazy(() => import("./containers/NavBar"));
const Dashboard = React.lazy(() => import("./containers/Dashboard"));
const Invoice = React.lazy(() => import("./containers/Invoice"));
const InvoiceList = React.lazy(() => import("./containers/InvoiceList"));
const CustomerList = React.lazy(() => import("./containers/CustomerList"));

function Router() {
  const [isLoggedIn, setLoggedIn] = useState(false);
  const [userInfo, setUserInfo] = useState({});

  const handleLogin = () => {
    setLoggedIn(true);
  };
  const { getSession, logout } = useContext(AccountContext);
  useEffect(() => {
    const user = UserPoolData.getCurrentUser();
    if (user) {
      axios
        .get(`${BACKEND_URL}/fetchUser?username=${user.username}`)
        .then((res) => setUserInfo(res.data.data));
    }
  }, [isLoggedIn]);

  return (
    <Account>
      <CssBaseline />
      <BrowserRouter>
        <Suspense fallback={<Loader />}>
          <Switch>
            <Route exact path="/register" component={RegisterUser} />
            <Route
              exact
              path="/"
              render={() => {
                return <LoginUser handleLogin={handleLogin} />;
              }}
            />
            {/* <Route
              exact
              path="/home"
              render={() => {
                return <HomePage userInfo={userInfo} />;
              }}
            /> */}
            <Route
              path="/dashboard"
              exact
              render={() => {
                return <Dashboard userInfo={userInfo} />;
              }}
            />
            <Route
              path="/invoice"
              exact
              render={() => {
                return <Invoice userInfo={userInfo} />;
              }}
            />
            <Route
              path="/invoiceList"
              exact
              render={() => {
                return <InvoiceList userInfo={userInfo} />;
              }}
            />
            <Route
              path="/readInvoice/:invoiceNumber"
              exact
              render={() => {
                return <SpecificInvoicePage userInfo={userInfo} />;
              }}
            />
            <Route
              path="/customers"
              exact
              render={() => {
                return <CustomerList userInfo={userInfo} />;
              }}
            />
          </Switch>
        </Suspense>
      </BrowserRouter>
    </Account>
  );
}

export default Router;
