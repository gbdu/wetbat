import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Assignment from "@material-ui/icons/Assignment";

// core components
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js";
import CardIcon from "components/Card/CardIcon.js";
import CardHeader from "components/Card/CardHeader.js";
import ReactTable from "components/ReactTable/ReactTable.js";

import CustomDropdown from "components/CustomDropdown/CustomDropdown.js";

import quotesTableStyle from "assets/jss/quotesTableStyle";

const useStyles = makeStyles(quotesTableStyle);

export default function QuotesTable(props) {
  const classes = useStyles();
  // const [active, setActive] = React.useState(props.active);
  // const handleChange = (event, active) => {
  //   setActive(active);
  // };
  // const handleChangeIndex = (index) => {
  //   setActive(index);
  // };
  // console.log(dataTable.dataRows);
  // console.log(props.data);

  // const [data, setData] = React.useState(
  //   props.data.map((prop, key) => {
  //     console.log("A: " + prop);

  //     return {
  //       id: key,
  //       price: prop.price,
  //       name: prop.contact.firstName,
  //       destination: prop.destination,
  //       departure: prop.departure,
  //       departureDate: prop.departureDate,
  //       destinationDate: prop.destinationDate,
  //     };
  //   })
  // );
  // console.log(data);
  props.data.forEach(function (element) {
    element.actions = (
      <div className="actions-right">
        <CustomDropdown
          hoverColor="info"
          buttonText="Actions"
          buttonProps={{
            round: false,
            fullWidth: false,
            color: "info",
          }}
          dropdownHeader="Customer Actions"
          dropdownList={[
            "Convert to service",
            "Contact",
            { divider: true },
            "Edit quote",
          ]}
        />
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
                  accessor: "departure",
                },
                {
                  Header: "Departure",
                  accessor: "destination",
                },

                // {
                //   Header: "Depart Date",
                //   accessor: "departureDate",
                // },
                // {
                //   Header: "Arrival Date",
                //   accessor: "destinationDate",
                // },

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
