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
import AirportSelect from "mycomponents/AirportSelect";
import ContactSelect from "mycomponents/ContactSelect";
import { flashErrorMessage } from "mycomponents/FlashMessage";

import { QuoteContext } from "../context/QuoteContext";

// * Styles
import { makeStyles } from "@material-ui/core/styles";

import quoteFormStyle from "assets/jss/quoteFormStyle.js";
const useStyles = makeStyles(quoteFormStyle);

// * Create/edit quote form component, takes props:
// - "data" for form data
// - "simple" (boolean for  popup)
//
export default function CreateQuote(props) {
  // contact
  const [contact, setContact] = useState(props.data ? props.data.contact : "");
  const [contactValid, setContactValid] = useState("");

  // arrival airport, use prop if we're editting
  const [arrivalAirport, setArrivalAirport] = useState(
    props?.data?.destination ? props.data.destination : ""
  );
  const [arrivalAirportValid, setArrivalAirportValid] = useState("");

  // departure airport, use prop if we're editting
  const [departureAirport, setDepartureAirport] = useState(
    props?.data?.departure ? props.data.departure : ""
  );
  const [departureAirportValid, setDepartureAirportValid] = useState("");

  // arrival datetime
  const [arrivalDate, setArrivalDate] = useState(
    props?.data?.arrivalDate ? props.date.arrivalDate : ""
  );
  const [arrivalDateValid, setArrivalDateValid] = useState("");

  // departure datetime
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
  const validateAllForms = (dispatch) => {
    // All the fields are selection only, so we only need to worry about
    // whether their state is filled (falsy) or not.

    // These are set out this way to style the input components
    setContactValid(!contact ? "error" : "valid");
    setArrivalAirportValid(!arrivalAirport ? "error" : "valid");
    setDepartureAirportValid(!departureAirport ? "error" : "valid");
    setArrivalDateValid(!arrivalDate ? "error" : "valid");
    setDepartureDateValid(!departureDate ? "error" : "valid");

    // Make sure arrival and departure are filled and that they are
    // not the same airport
    if (arrivalAirport && departureAirport) {
      if (arrivalAirport.code === departureAirport.code) {
        setDepartureAirportValid("error");
        setArrivalAirportValid("error");
        flashErrorMessage(dispatch, {
          type: "error",
          name: "Error",
          message: "Arrival and departure airports cannot be the same!",
        });
        return false;
      }
      // Only return true if all other fields have been filled
      return contact && arrivalDate && departureDate;
    }
  };

  const typeClick = (e) => {
    if (validateAllForms(dispatch)) {
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

  // Don't render a card header if we're simple (in popup)
  const renderCardHeader = () => {
    if (!props.simple) {
      return (
        <CardHeader color="rose" text>
          <CardText color="rose">
            <h4 className={classes.cardTitle}>Create Quote</h4>
          </CardText>
        </CardHeader>
      );
    }
    return null;
  };

  // Render contact name and quote if they're passed
  const renderContactNameHeader = () => {
    if (props.data && props.data.contact) {
      return (
        <div className={classes.selectedContactName}>
          {props.data.id && <>Quote # {props.data.id} for:</>}
          <h4>
            {props.data.contact.firstName} {props.data.contact.lastName}
          </h4>
        </div>
      );
    }
    return null;
  };

  // Render contact selection if contact is not passed
  const renderContactSelect = () => {
    if (!props?.data?.contact) {
      return (
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
      );
    }
    return null;
  };

  // render new contact button if we don't have a contact
  const renderNewContactButton = () => {
    if (!props?.data?.contact) {
      return (
        <GridItem xs={12} sm={6}>
          <Button
            color="primary"
            onClick={typeClick}
            className={classes.addCustomerButton}
          >
            <AddCircleIcon />
            New customer
          </Button>
        </GridItem>
      );
    }
    return null;
  };

  return (
    <GridContainer className={classes.formContainer}>
      <GridItem xs={12} sm={12} md={12}>
        <Card
          className={props.simple ? classes.formCardSimple : classes.formCard}
        >
          {renderCardHeader()}
          <CardBody>
            <form onSubmit={typeClick}>
              <GridContainer spacing={4} className={classes.formRow}>
                {renderContactSelect()}
                {renderContactNameHeader()}
                {renderNewContactButton()}
              </GridContainer>

              <GridContainer className={classes.formRow}>
                <GridItem xs={12} sm={6}>
                  <AirportSelect
                    label="Departure Airport"
                    value={departureAirport}
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
                    value={arrivalAirport}
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
              Validate Inputs and {props.data ? "Modify" : "Create"}
            </Button>
          </CardFooter>
        </Card>
      </GridItem>
    </GridContainer>
  );
}
