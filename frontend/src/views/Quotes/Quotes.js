import React, { useContext, useEffect, useState } from "react";

import axios from "axios";
import { QuoteContext } from "context/QuoteContext";

// UI components
import { makeStyles } from "@material-ui/core/styles";
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import Button from "components/CustomButtons/Button.js";
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
          "http://localhost:3030/quotes?$limit=1000"
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
