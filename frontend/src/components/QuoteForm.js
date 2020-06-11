/* eslint-enable no-unused-vars */
// * Core imports
import React, { useState, useContext } from "react";

import Datetime from "react-datetime";
import moment from "moment";
import axios from "axios";
import classNames from "classnames";
// * UI components
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import Button from "components/CustomButtons/Button.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardText from "components/Card/CardText.js";
import CardBody from "components/Card/CardBody.js";
import CardFooter from "components/Card/CardFooter.js";

// * Material-UI core
import Select from "@material-ui/core/Select";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import AddCircleIcon from "@material-ui/icons/AddCircle";

// * My components
import AirportSelect from "components/AirportSelect";
import ContactSelect from "components/ContactSelect";

import { QuoteContext } from "../context/quote-context.js";
import { flashErrorMessage } from "components/FlashMessage";

// * Styles
import { makeStyles } from "@material-ui/core/styles";

import quoteFormStyle from "assets/jss/quoteFormStyle.js";
const useStyles = makeStyles(quoteFormStyle);

// * QuoteForm component
export default function QuoteForm() {
  // contact name field (passed to ContactSelect)
  const [contact, setContact] = useState("");
  const [contactValid, setContactValid] = useState("");

  // arrival airport name (passed to AirportSelect)
  const [arrivalAirport, setArrivalAirport] = useState("");
  const [arrivalAirportValid, setArrivalAirportValid] = useState("");

  // departure airport name (passed to AirportSelect)
  const [departureAirport, setDepartureAirport] = useState("");
  const [departureAirportValid, setDepartureAirportValid] = useState("");

  // arrival time
  const [arrivalDate, setArrivalDate] = useState("");
  const [arrivalDateValid, setArrivalDateValid] = useState("");

  // departure time
  const [departureDate, setDepartureDate] = useState("");

  // number of people
  const [numberOfTravellers, setNumberOfTravellers] = useState("");
  const [numberOfTravellersValid, setNumberOfTravellersValid] = useState("");

  // transportation type
  const [transportation, setTransportation] = useState("");
  const [transportationValid, setTransportationValid] = useState("");

  const getValidDepartureDate = function (currentDate) {
    // only allow today and future dates, if arrival date is set, make
    // sure our departure date is before it.

    let today = moment().subtract(1, "day");
    return arrivalDate
      ? currentDate.isAfter(today) && currentDate.isBefore(arrivalDate)
      : currentDate.isAfter(today);
  };
  const getValidArrivalDate = function (currentDate) {
    // only allow today and future dates, if departure date is set,
    // make sure our arrival date  is after it.

    let today = moment().subtract(1, "day");
    return departureDate
      ? currentDate.isAfter(today) && currentDate.isAfter(departureDate)
      : currentDate.isAfter(today);
  };

  // Quote context
  const [state, dispatch] = useContext(QuoteContext);

  const postNewQuote = async (data) => {
    try {
      const response = await axios.post("http://localhost:3030/quotes", data);
      dispatch({
        type: "CREATE_QUOTE",
        payload: response.data,
      });
      // setRedirect(true);
    } catch (error) {
      flashErrorMessage(dispatch, error);
    }
  };

  const typeClick = (e) => {
    let postData = {
      departure: departureAirport.code,
      destination: arrivalAirport.code,
      transport: transportation,
      departureDate: departureDate,
      destinationDate: arrivalDate,
      numberOfTravellers: numberOfTravellers,
      price: "100",
      contactId: contact.id,
    };

    setContactValid("error");
    // postNewQuote(postData);
    console.log(postData);
  };

  const classes = useStyles();

  const menuItemClass = {
    root: classes.selectMenuItem,
    selected: classes.selectMenuItemSelected,
  };

  return (
    <GridContainer className={classes.formContainer}>
      <GridItem xs={12} sm={12} md={12}>
        <Card className={classes.formCard}>
          <CardHeader color="rose" text>
            <CardText color="rose">
              <h4 className={classes.cardTitle}>Create Quote</h4>
            </CardText>
          </CardHeader>
          <CardBody>
            <form onSubmit={typeClick}>
              <GridContainer spacing={4} className={classes.formRow}>
                <GridItem xs={12} sm={6}>
                  <ContactSelect
                    label="Find Customer"
                    valueChangeCallback={setContact}
                    className={classNames({
                      [classes.underlineError]: contactValid === "error",
                    })}
                  />
                </GridItem>

                <GridItem xs={12} sm={6}>
                  <Button
                    color="rose"
                    onClick={typeClick}
                    className={classes.addCustomerButton}
                  >
                    <AddCircleIcon />
                    New customer
                  </Button>
                </GridItem>
              </GridContainer>

              <GridContainer className={classes.formRow}>
                <GridItem xs={12} sm={6}>
                  <AirportSelect
                    label="Departure Airport"
                    valueChangeCallback={setDepartureAirport}
                  />
                </GridItem>

                <GridItem xs={12} sm={6}>
                  <AirportSelect
                    label="Destination Airport"
                    valueChangeCallback={setArrivalAirport}
                  />
                </GridItem>
              </GridContainer>

              <GridContainer className={classes.formRow}>
                <GridItem xs={12} sm={6}>
                  <Datetime
                    isValidDate={getValidDepartureDate}
                    onChange={(date) => setDepartureDate(date)}
                    inputProps={{ placeholder: "Departure" }}
                  />
                </GridItem>
                <GridItem xs={12} sm={6}>
                  <Datetime
                    isValidDate={getValidArrivalDate}
                    onChange={(date) => {
                      setArrivalDate(date);
                      console.log(date);
                    }}
                    inputProps={{ placeholder: "Arrival" }}
                  />
                </GridItem>
              </GridContainer>
              <GridContainer className={classes.formRow}>
                <GridItem xs={12} sm={6}>
                  <InputLabel
                    htmlFor="simple-select"
                    className={classes.selectLabel}
                  >
                    People
                  </InputLabel>

                  <Select
                    MenuProps={{
                      className: classes.selectMenu,
                    }}
                    classes={{
                      select: classes.select,
                    }}
                    value={numberOfTravellers}
                    onChange={(event) =>
                      setNumberOfTravellers(event.target.value)
                    }
                    inputProps={{
                      name: "simpleSelect",
                      id: "simple-select",
                    }}
                  >
                    <MenuItem classes={menuItemClass} value="1">
                      1
                    </MenuItem>
                    <MenuItem classes={menuItemClass} value="2">
                      2
                    </MenuItem>
                    <MenuItem classes={menuItemClass} value="3">
                      3
                    </MenuItem>
                    <MenuItem classes={menuItemClass} value="4">
                      4
                    </MenuItem>
                  </Select>
                </GridItem>
                <GridItem xs={12} sm={6}>
                  <InputLabel
                    htmlFor="simple-select2"
                    className={classes.selectLabel}
                  >
                    Transportation
                  </InputLabel>
                  <Select
                    MenuProps={{
                      className: classes.selectMenu,
                    }}
                    classes={{
                      select: classes.select,
                    }}
                    value={transportation}
                    onChange={(event) => setTransportation(event.target.value)}
                    inputProps={{
                      name: "simpleSelect2",
                      id: "simple-select2",
                    }}
                  >
                    <MenuItem classes={menuItemClass} value="None">
                      None
                    </MenuItem>
                    <MenuItem classes={menuItemClass} value="Rental">
                      Rental
                    </MenuItem>
                    <MenuItem classes={menuItemClass} value="Taxi">
                      Taxi
                    </MenuItem>
                  </Select>
                </GridItem>
              </GridContainer>
            </form>
          </CardBody>
          <CardFooter className={classes.formFooter}>
            <Button color="rose" onClick={typeClick}>
              Validate Inputs
            </Button>
          </CardFooter>
        </Card>
      </GridItem>
    </GridContainer>
  );
}
