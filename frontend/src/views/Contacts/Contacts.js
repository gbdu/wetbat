import React, { useContext, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";

import { flashErrorMessage } from "mycomponents/FlashMessage";
import SimpleContactList from "mycomponents/SimpleContactList";
import CreateContact from "mycomponents/CreateContact";
import { ContactContext } from "context/ContactContext";

import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import Table from "components/Table/Table.js";

import apiurl from "api/url";

import axios from "axios";
import styles from "assets/jss/material-dashboard-pro-react/views/dashboardStyle.js";

const useStyles = makeStyles(styles);

export default function Contacts() {
  const [state, dispatch] = useContext(ContactContext);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${apiurl}/contacts`);
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

  console.log(
    state.contacts.map((c) => [c.firstName, c.lastName, c.email, c.phone])
  );
  return (
    <div>
      <GridContainer>
        <GridItem xs={12} sm={7}>
          <h1>List of Contacts</h1>
          <Table
            tableData={state.contacts.map((c) => [
              c.firstName,
              c.lastName,
              c.email,
              c.phone,
            ])}
          />
        </GridItem>
        <GridItem xs={12} sm={4}>
          <h1>New Contact</h1>
          <CreateContact />
        </GridItem>
      </GridContainer>
    </div>
  );
}
