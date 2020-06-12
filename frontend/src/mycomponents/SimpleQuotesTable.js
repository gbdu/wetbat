import React from "react";

// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// @material-ui/icons
import Assignment from "@material-ui/icons/Assignment";
import Dvr from "@material-ui/icons/Dvr";
import Favorite from "@material-ui/icons/Favorite";
import Close from "@material-ui/icons/Close";
// core components
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import Button from "components/CustomButtons/Button.js";
import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js";
import CardIcon from "components/Card/CardIcon.js";
import CardHeader from "components/Card/CardHeader.js";
import ReactTable from "components/ReactTable/ReactTable.js";

import CustomDropdown from "components/CustomDropdown/CustomDropdown.js";
import { dataTable } from "variables/general.js";

import { cardTitle } from "assets/jss/material-dashboard-pro-react.js";
import {
  successColor,
  tooltip,
  grayColor,
} from "assets/jss/material-dashboard-pro-react.js";

const styles = {
  cardIconTitle: {
    ...cardTitle,
    marginTop: "10px",
    marginBottom: "0px",
  },
  tableCard: {
    border: "0px solid #4A90E2",
    boxShadow: "none",
  },
  tableContainer: {},
  DropdownButton: {
    padding: "0px",

    marginTop: "10px",
    marginBottom: "0px",
  },
};

const useStyles = makeStyles(styles);

export default function SimpleQuotesTable(props) {
  const classes = useStyles();
  const [active, setActive] = React.useState(props.active);
  const handleChange = (event, active) => {
    setActive(active);
  };
  const handleChangeIndex = (index) => {
    setActive(index);
  };

  const [data, setData] = React.useState(
    dataTable.dataRows.map((prop, key) => {
      return {
        id: key,
        uname: (
          <a
            href="javascript:void(0)"
            onClick={() => {
              let obj = data.find((o) => o.id === key);
              props.editUserCallback(obj);
            }}
          >
            {prop[0]}
          </a>
        ),
        name: prop[0],
        position: prop[1],
        office: prop[2],
        age: prop[3],
        actions: (
          // we've added some custom button actions
          <div className="actions-right">
            {/* <CustomDropdown
                className={classes.DropdownButton}
                        hoverColor="info"
                        buttonText="Bill"
                        
                        buttonProps={{
                          round: false,
                          fullWidth: false,
                          style: { marginBottom: "0", height: "10px"},
                          color: "info"
                        }}
                        dropdownHeader="Customer Actions"
                        dropdownList={[
                          "Bill",
                          "Deliver",
                          "Contact",
                          { divider: true },
                          "Separated link",
                          { divider: true },
                          "One more separated link"
                        ]}
            /> */}
            <Button
              justIcon
              round
              simple
              onClick={() => {
                let obj = data.find((o) => o.id === key);
                props.editUserCallback(obj);
                // alert(
                //   "You've clicked EDIT button on \n{ \nName: " +
                //     obj.name +
                //     ", \nposition: " +
                //     obj.position +
                //     ", \noffice: " +
                //     obj.office +
                //     ", \nage: " +
                //     obj.age +
                //     "\n}."
                // );
              }}
              color="warning"
              className="edit"
            >
              <Dvr />
            </Button>{" "}
            {/* use this button to remove the data row */}
            <Button
              justIcon
              round
              simple
              onClick={() => {
                var newData = data;
                newData.find((o, i) => {
                  if (o.id === key) {
                    // here you should add some custom code so you can delete the data
                    // from this component and from your server as well
                    newData.splice(i, 1);
                    return true;
                  }
                  return false;
                });
                setData([...newData]);
              }}
              color="danger"
              className="remove"
            >
              <Close />
            </Button>{" "}
          </div>
        ),
      };
    })
  );

  return (
    <GridContainer className={classes.tableContainer}>
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
                  Header: "ID #",
                  accessor: "id",
                },
                {
                  Header: "Name",
                  accessor: "uname",
                },
                {
                  Header: "Destination",
                  accessor: "office",
                },
                {
                  Header: "Price",
                  accessor: "age",
                },
                {
                  Header: "Actions",
                  accessor: "actions",
                },
              ]}
              data={data}
            />
          </CardBody>
        </Card>
      </GridItem>
    </GridContainer>
  );
}
