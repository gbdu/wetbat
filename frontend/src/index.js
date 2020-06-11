import React from "react";
import ReactDOM from "react-dom";
import { createBrowserHistory } from "history";
import { Router, Route, Switch, Redirect } from "react-router-dom";

import AdminLayout from "layouts/Admin.js";

import "assets/scss/material-dashboard-pro-react.scss?v=1.9.0";

import { ContactContextProvider } from "./context/ContactContext";
import { QuoteContextProvider } from "./context/QuoteContext";

const hist = createBrowserHistory();

ReactDOM.render(
  <ContactContextProvider>
    <QuoteContextProvider>
      <Router history={hist}>
        <Switch>
          <Route path="/admin" component={AdminLayout} />
          <Redirect from="/" to="/admin/dashboard" />
        </Switch>
      </Router>
    </QuoteContextProvider>
  </ContactContextProvider>,

  document.getElementById("root")
);
