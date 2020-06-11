import React, { useContext, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";

import { flashErrorMessage } from "components/FlashMessage";

import { ContactContext } from "context/ContactContext";
import SimpleContactList from "components/SimpleContactList";

import axios from "axios";

import styles from "assets/jss/material-dashboard-pro-react/views/dashboardStyle.js";

const useStyles = makeStyles(styles);

// const fakedata = [
//   {
//     _id: "1",
//     firstName: "Ghadeer",
//     lastName: "Abdul2",
//     email: "john@gmail.com",
//     phone: "5879697422",
//   },
// ];

export default function Contacts() {
  const [state, dispatch] = useContext(ContactContext);
  // const classes = useStyles();

  // useEffect(() => {
  //   dispatch({
  //     type: "FETCH_CONTACTS",
  //     payload: fakedata,
  //   });
  // }, [dispatch]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:3030/contacts");
        dispatch({
          type: "FETCH_CONTACTS",
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
      <h1>List of Contacts</h1>
      <SimpleContactList contacts={state.contacts} />
    </div>
  );
}
