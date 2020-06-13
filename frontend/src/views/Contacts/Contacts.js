import React, { useContext, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";

import { flashErrorMessage } from "mycomponents/FlashMessage";
import SimpleContactList from "mycomponents/SimpleContactList";
import CreateContact from "mycomponents/CreateContact";
import { ContactContext } from "context/ContactContext";

import axios from "axios";
import styles from "assets/jss/material-dashboard-pro-react/views/dashboardStyle.js";

const useStyles = makeStyles(styles);

export default function Contacts() {
  const [state, dispatch] = useContext(ContactContext);

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
      <CreateContact />
    </div>
  );
}
