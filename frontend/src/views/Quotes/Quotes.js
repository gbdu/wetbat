import React, { useContext, useEffect, useState } from "react";
import Popup from "reactjs-popup";
import axios from "axios";
import { QuoteContext } from "context/QuoteContext";

// UI components
import { makeStyles } from "@material-ui/core/styles";
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import Button from "components/CustomButtons/Button.js";
// My components
import CreateQuote from "components/CreateQuote";
import QuotesTable from "components/QuotesTable";
import FlashMessage, { flashErrorMessage } from "components/FlashMessage";

import SweetAlert from "react-bootstrap-sweetalert";

import styles from "assets/jss/material-dashboard-pro-react/views/sweetAlertStyle.js";
const useStyles = makeStyles(styles);

export default function Quotes() {
  const classes = useStyles();
  const [state, dispatch] = useContext(QuoteContext);

  const [alert, setAlert] = useState(null); // Stores sweet alert component
  const [alertConfirmed, setAlertConfirmed] = useState(null);

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

  const hideAlert = () => {
    setAlert(null);
    dispatch({
      type: "CLEAR_MESSAGE",
      payload: {},
    });
  };

  const messageAlert = (message) => {
    setAlert(
      <SweetAlert
        type={message.type == "error" ? "error" : "success"}
        style={{ display: "block", marginTop: "-100px" }}
        title={message.title}
        onConfirm={() => {
          hideAlert();
        }}
        onCancel={() => hideAlert()}
        confirmBtnCssClass={classes.button + " " + classes.success}
      >
        {message.content}
      </SweetAlert>
    );
    console.log(message);
  };

  if (state.message.content && !alert) {
    messageAlert(state.message);
  }
  return (
    <div>
      {alert}

      <QuotesTable data={state.quotes} />
      <Popup
        contentStyle={{ width: "60%" }}
        trigger={<button> Trigger</button>}
        modal
      >
        <CreateQuote />
      </Popup>
    </div>
  );
}
