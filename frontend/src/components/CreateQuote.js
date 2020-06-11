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

import { QuoteContext } from "../context/QuoteContext";
import { flashErrorMessage } from "components/FlashMessage";

// * Styles
import { makeStyles } from "@material-ui/core/styles";

import quoteFormStyle from "assets/jss/quoteFormStyle.js";
const useStyles = makeStyles(quoteFormStyle);

// * Create quote form component
export default function CreateQuote() {
  // contact
  const [contact, setContact] = useState("");
  const [contactValid, setContactValid] = useState("");

  // arrival airport
  const [arrivalAirport, setArrivalAirport] = useState("");
  const [arrivalAirportValid, setArrivalAirportValid] = useState("");

  // departure airport
  const [departureAirport, setDepartureAirport] = useState("");
  const [departureAirportValid, setDepartureAirportValid] = useState("");

  // arrival time
  const [arrivalDate, setArrivalDate] = useState("");
  const [arrivalDateValid, setArrivalDateValid] = useState("");

  // departure time
  const [departureDate, setDepartureDate] = useState("");
  const [departureDateValid, setDepartureDateValid] = useState("");

  // number of people
  const [numberOfTravellers, setNumberOfTravellers] = useState("1");

  // transportation type
  const [transportation, setTransportation] = useState("None");

  // Passed to react-datetime for arrival date validation
  const getValidArrivalDate = function (currentDate) {
    let today = moment().subtract(1, "day");

    // Make sure our arrival date is after today and after departure
    return departureDate
      ? currentDate.isAfter(departureDate) && currentDate.isAfter(today)
      : currentDate.isAfter(today);
  };

  // Passed to react-datetime for departure date validation
  const getValidDepartureDate = function (currentDate) {
    let today = moment().subtract(1, "day");

    // Make sure our departure date is after today and before arrival
    return arrivalDate
      ? currentDate.isBefore(arrivalDate) && currentDate.isAfter(today)
      : currentDate.isAfter(today);
  };

  // Quote context for storing state
  const [state, dispatch] = useContext(QuoteContext);

  // Post the quote to the API
  const postQuote = async (data) => {
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

  // Set validation state for fields so we can style them red/blue
  // after submission
  const validateAllForms = () => {
    // All the fields are selection only, so we only need to worry about
    // whether they're filled or not.
    setContactValid(!contact ? "error" : "valid");
    setArrivalAirportValid(!arrivalAirport ? "error" : "valid");
    setDepartureAirportValid(!departureAirport ? "error" : "valid");
    setArrivalDateValid(!arrivalDate ? "error" : "valid");
    setDepartureDateValid(!departureDate ? "error" : "valid");

    // Only return true if all fields have been filled
    return (
      contact &&
      arrivalAirport &&
      departureAirport &&
      arrivalAirport &&
      departureDate
    );
  };

  const typeClick = (e) => {
    if (validateAllForms()) {
      let postData = {
        departure: departureAirport.code,
        destination: arrivalAirport.code,
        departureDate: departureDate,
        destinationDate: arrivalDate,
        price: "100",
        contactId: contact.id,
        numberOfTravellers: numberOfTravellers,
        transport: transportation,
      };
      console.log(postData);
      postQuote(postData);
    }
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
                    valueChangeCallback={(e) => {
                      setContact(e);
                      setContactValid("valid");
                    }}
                    className={classNames({
                      [classes.underlineError]: contactValid === "error",
                      [classes.underlineSuccess]: contactValid === "valid",
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
                    valueChangeCallback={(e) => {
                      setDepartureAirport(e);
                      setDepartureAirportValid("valid");
                    }}
                    className={classNames({
                      [classes.underlineError]:
                        departureAirportValid === "error",
                      [classes.underlineSuccess]:
                        departureAirportValid === "valid",
                    })}
                  />
                </GridItem>

                <GridItem xs={12} sm={6}>
                  <AirportSelect
                    label="Destination Airport"
                    valueChangeCallback={(e) => {
                      setArrivalAirport(e);
                      setArrivalAirportValid("valid");
                    }}
                    className={classNames({
                      [classes.underlineError]: arrivalAirportValid === "error",
                      [classes.underlineSuccess]:
                        arrivalAirportValid === "valid",
                    })}
                  />
                </GridItem>
              </GridContainer>

              <GridContainer className={classes.formRow}>
                <GridItem xs={12} sm={6}>
                  <Datetime
                    isValidDate={getValidDepartureDate}
                    className={classNames({
                      [classes.underlineError]: departureDateValid === "error",
                      [classes.underlineSuccess]:
                        departureDateValid === "valid",
                    })}
                    onChange={(date) => {
                      setDepartureDate(date);
                      setDepartureDateValid("valid");
                    }}
                    inputProps={{
                      placeholder: "Departure",
                      readOnly: true,
                    }}
                  />
                </GridItem>
                <GridItem xs={12} sm={6}>
                  <Datetime
                    className={classNames({
                      [classes.underlineError]: arrivalDateValid === "error",
                      [classes.underlineSuccess]: arrivalDateValid === "valid",
                    })}
                    isValidDate={getValidArrivalDate}
                    onChange={(date) => {
                      setArrivalDate(date);
                      setArrivalDateValid("valid");
                    }}
                    inputProps={{ placeholder: "Arrival", readOnly: true }}
                  />
                </GridItem>
              </GridContainer>
              <GridContainer className={classes.formRow}>
                <GridItem xs={12} sm={6}>
                  <InputLabel className={classes.selectLabel}>
                    People
                  </InputLabel>

                  <Select
                    MenuProps={{
                      className: classes.selectMenu,
                    }}
                    classes={{
                      select: classes.select,
                    }}
                    value={numberOfTravellers === "" ? "1" : numberOfTravellers}
                    onChange={(event) => {
                      setNumberOfTravellers(event.target.value);
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
                  <InputLabel className={classes.selectLabel}>
                    Transportation
                  </InputLabel>
                  <Select
                    onChange={(event) => setTransportation(event.target.value)}
                    value={transportation}
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
