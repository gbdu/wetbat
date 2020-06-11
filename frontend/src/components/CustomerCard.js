import React from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";

// @material-ui/icons
import Divider from "@material-ui/core/Divider";

// core components
import NavPills from "components/NavPills/NavPills.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import CustomerActivityCard from "components/CustomerActivityCard.js";
import { cardTitle } from "assets/jss/material-dashboard-pro-react.js";

import CustomDropdown from "components/CustomDropdown/CustomDropdown.js";
const styles = {
  cardTitle,
  pageSubcategoriesTitle: {
    color: "#3C4858",
    textDecoration: "none",
    textAlign: "center",
  },
  cardCategory: {
    margin: "0",
    color: "#999999",
  },
  CustomerCard: {
    margin: "0",
    boxShadow: "none",
    border: "0px solid #4A90E2",
    borderWidth: "0px 0px 0px 1px",
    borderRadius: "0",
  },
};

const useStyles = makeStyles(styles);

export default function CustomerCard(props) {
  const classes = useStyles();
  if (!props.activeUser) {
    return (
      <div>
        <Card className={classes.CustomerCard}>
          <CardHeader>
            <h3>Select a customer from the left to start</h3>
          </CardHeader>
        </Card>
      </div>
    );
  }
  return (
    <div>
      <Card className={classes.CustomerCard}>
        <CardHeader>
          <h3>
            Customer: <b>{props.activeUser.name}</b>
          </h3>
        </CardHeader>
        <CardBody>
          <NavPills
            color="primary"
            tabs={[
              {
                tabButton: "Profile",
                tabContent: (
                  <span>
                    <p>
                      Position: {props.activeUser.position}
                      <br />
                      Age: {props.activeUser.age}
                      <br />
                      Address: {props.activeUser.office}
                      <br />
                    </p>
                    <br />
                    <p>
                      <CustomDropdown
                        className={classes.DropdownButton}
                        hoverColor="info"
                        buttonText="Bill"
                        buttonProps={{
                          round: false,
                          fullWidth: false,
                          style: {},
                          color: "info",
                        }}
                        dropdownHeader="Customer Actions"
                        dropdownList={[
                          "Bill",
                          "Deliver",
                          "Contact",
                          { divider: true },
                          "Separated link",
                          { divider: true },
                          "One more separated link",
                        ]}
                      />
                    </p>
                    <br />
                    <br />
                    <Divider />
                    <h4>User activity:</h4>
                    <CustomerActivityCard />
                  </span>
                ),
              },
              {
                tabButton: "Settings",
                tabContent: (
                  <span>
                    <p>
                      Efficiently unleash cross-media information without
                      cross-media value. Quickly maximize timely deliverables
                      for real-time schemas.
                    </p>
                    <br />
                    <p>
                      Dramatically maintain clicks-and-mortar solutions without
                      functional solutions.
                    </p>
                  </span>
                ),
              },
              {
                tabButton: "Options",
                tabContent: (
                  <span>
                    <p>
                      Completely synergize resource taxing relationships via
                      premier niche markets. Professionally cultivate one-to-one
                      customer service with robust ideas.{" "}
                    </p>
                    <br />
                    <p>
                      Dynamically innovate resource-leveling customer service
                      for state of the art customer service.
                    </p>
                  </span>
                ),
              },
            ]}
          />
        </CardBody>
      </Card>
    </div>
  );
}
