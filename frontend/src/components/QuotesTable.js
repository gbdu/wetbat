import React from "react";
import Popup from "reactjs-popup";

// Material UI components
import { makeStyles } from "@material-ui/core/styles";
import Assignment from "@material-ui/icons/Assignment";
import Button from "@material-ui/core/Button";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";

// components
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js";
import CardIcon from "components/Card/CardIcon.js";
import CardHeader from "components/Card/CardHeader.js";

import CreateQuote from "components/CreateQuote";

// ReactTable
import ReactTable from "components/ReactTable/ReactTable.js";

// Style
import quotesTableStyle from "assets/jss/quotesTableStyle";
const useStyles = makeStyles(quotesTableStyle);

// A table to display quotes and edit/delete actions
// with filtering/sorting, and pagination.

// Our featherJS api pagination by default, and so do our tables, the
// next step would be to cache only a few rows at a time, until the
// user actually clicks through to the next page

// *
export default function QuotesTable(props) {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);

  if (!props || !props.data || props.data == "" ) {
    return <div>No data passed to QuotesTable</div>;
  }
  else {
    console.log(props.data);
  }

  const handleClick = (event) => {
    console.log(props.data[event.target.value]);
  };

  props.data.forEach(function (element) {
    // Note: Pop up only appears when the trigger is triggered
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
          <CreateQuote simple data={element} />
        </Popup>
        <Button color="secondary" value={element.id} onClick={handleClick}>
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
