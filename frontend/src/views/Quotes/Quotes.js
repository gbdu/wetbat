import React, { useContext, useEffect, useState } from "react";

import axios from "axios";
import { QuoteContext } from "context/QuoteContext";

import apiurl from "api/url";

// UI components
import { makeStyles } from "@material-ui/core/styles";
// My components

import QuotesTable from "mycomponents/QuotesTable";
import FlashMessage, { flashErrorMessage } from "mycomponents/FlashMessage";

import SweetAlert from "react-bootstrap-sweetalert";

import styles from "assets/jss/material-dashboard-pro-react/views/sweetAlertStyle.js";

const useStyles = makeStyles(styles);
export default function Quotes() {
  const classes = useStyles();
  const [state, dispatch] = useContext(QuoteContext);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          // TODO: pageinate/fetch more quotes as user goes through pages
          `${apiurl}/quotes?$limit=1000`
        );
        dispatch({
          type: "FETCH_QUOTES",
          payload: response.data.data || response.data, // in case pagination is disabled
        });
      } catch (error) {
        flashErrorMessage(dispatch, error);
      }
    };
    fetchData();
  }, [dispatch]);

  return (
    <div>
      <QuotesTable data={state.quotes} />
    </div>
  );
}
