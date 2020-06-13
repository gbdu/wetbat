import React, { useContext, useState } from "react";
import Popup from "reactjs-popup";
import axios from "axios";

// Material UI components
import { makeStyles } from "@material-ui/core/styles";
import Assignment from "@material-ui/icons/Assignment";
import Button from "@material-ui/core/Button";

// components
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js";
import CardIcon from "components/Card/CardIcon.js";
import CardHeader from "components/Card/CardHeader.js";

import { flashErrorMessage } from "mycomponents/FlashMessage";
import CreateOrEditQuote from "mycomponents/CreateOrEditQuote";
import { QuoteContext } from "../context/QuoteContext";

import PropTypes from "prop-types";
import apiurl from "api/url";

// ReactTable
import ReactTable from "components/ReactTable/ReactTable.js";

// Style
import quotesTableStyle from "assets/jss/quotesTableStyle";
const useStyles = makeStyles(quotesTableStyle);

// A table to display quotes and edit/delete actions
// with filtering/sorting, and pagination.

// Our featherJS api has pagination by default, and so do our tables, the
// next step would be to cache only a few rows at a time, until the
// user actually clicks through to the next page
export default function QuotesTable(props) {
  const classes = useStyles();

  // Quote context to display alert
  const [state, dispatch] = useContext(QuoteContext);

  if (!props || !props.data) {
    return <div>No data passed to QuotesTable</div>;
  }

  const deleteQuote = async (id) => {
    if (id > 0) {
      try {
        const response = await axios.delete(`${apiurl}/quotes/${id}`);
        dispatch({
          type: "DELETE_QUOTE",
          payload: response.data,
        });
      } catch (error) {
        flashErrorMessage(dispatch, error);
      }
    }
  };

  const handleClick = (event) => {
    console.log(props.data[event.target.value]);
  };

  props.data.forEach(function (element) {
    // Note: Pop up only appears when button is triggered
    // TODO: Figure out how to stop multiple Popups from happening
    element.actions = (
      <div className="actions-right">
        <Popup
          position="left center"
          trigger={
            <Button color="primary" value={element.id} onClick={handleClick}>
              Edit
            </Button>
          }
          contentStyle={{ width: "60%" }}
        >
          <CreateOrEditQuote simple data={element} />
        </Popup>
        <Button
          color="secondary"
          value={element.id}
          onClick={(e) => {
            deleteQuote(element.id);
          }}
        >
          Delete
        </Button>
      </div>
    );
  });
  return (
    <GridContainer>
      <GridItem xs={12}>
        <Card className={classes.tableCard}>
          <CardHeader color="primary" icon>
            <CardIcon color="primary">
              <Assignment />
            </CardIcon>
            <h4 className={classes.cardIconTitle}>Quotes</h4>
          </CardHeader>
          <CardBody>
            <ReactTable
              columns={[
                {
                  Header: "Customer",
                  accessor: (row) =>
                    `${row.contact.firstName}  ${row.contact.lastName}`,
                },
                {
                  Header: "Destination",
                  accessor: (row) =>
                    `${row.destination.city} (${row.destination.code}) `,
                },
                {
                  Header: "Departure",
                  accessor: (row) =>
                    `${row.departure.city} (${row.departure.code}) `,
                },
                {
                  Header: "Price",
                  accessor: "price",
                },
                {
                  Header: "Actions",
                  accessor: "actions",
                },
              ]}
              data={props.data}
            />
          </CardBody>
        </Card>
      </GridItem>
    </GridContainer>
  );
}

QuotesTable.propTypes = {
  data: PropTypes.object,
};
