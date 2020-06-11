import customSelectStyle from "assets/jss/material-dashboard-pro-react/customSelectStyle.js";

import {
  primaryColor,
  primaryBoxShadow,
  whiteColor,
  blackColor,
  grayColor,
  hexToRgb,
  cardTitle,
  successColor,
  dangerColor,
} from "assets/jss/material-dashboard-pro-react.js";

const quoteFormStyle = {
  ...customSelectStyle,
  addCustomerButton: {},
  selectedContactName: {
    color: "#4BcFcA",
    fontWeight: "bold",
    fontSize: "18px",
    borderBottom: "2px solid currentColor",
  },
  select: {
    minWidth: "100px",
  },
  formContainer: {
    paddingBottom: "80px",
  },
  formRow: {
    padding: "20px",
  },
  formCard: {
    paddingBottom: "40px",
    textAlign: "left",
  },
  formCardSimple: {
    paddingBottom: "40px",
    boxShadow: "none",
    textAlign: "left",
    padding: "0",
    margin: "0",
  },
  label: {
    cursor: "pointer",
    paddingLeft: "0",
    color: "rgba(" + hexToRgb(blackColor) + ", 0.26)",
    fontSize: "10px",
    lineHeight: "1.428571429",
    fontWeight: "400",
    display: "inline-flex",
  },
  selectLabel: {
    fontSize: "12px",
    textTransform: "uppercase",
    top: "8px",
  },
  selectMenu: {
    "& > div > ul": {
      border: "0",
      padding: "5px 0",
      margin: "0",
      boxShadow: "none",
      minWidth: "100%",
      borderRadius: "4px",
      boxSizing: "border-box",
      display: "block",
      fontSize: "14px",
      listStyle: "none",
      backgroundClip: "padding-box",
    },
    selectMenuItem: {
      fontSize: "13px",
      padding: "10px 20px",
      margin: "0 5px",
      borderRadius: "2px",
      transition: "all 150ms linear",
      display: "block",
      clear: "both",
      fontWeight: "400",
      lineHeight: "2",
      whiteSpace: "nowrap",
      color: grayColor[7],
      paddingRight: "30px",
      "&:hover": {
        backgroundColor: primaryColor[0],
        color: whiteColor,
        ...primaryBoxShadow,
      },
    },
    selectMenuItemSelected: {
      backgroundColor: primaryColor[0] + "!important",
      color: whiteColor,
    },
    selectMenuItemSelectedMultiple: {
      backgroundColor: "transparent !important",
      "&:hover": {
        backgroundColor: primaryColor[0] + "!important",
        color: whiteColor,
        ...primaryBoxShadow,
        "&:after": {
          color: whiteColor,
        },
      },
      "&:after": {
        top: "16px",
        right: "12px",
        width: "12px",
        height: "5px",
        borderLeft: "2px solid currentColor",
        transform: "rotate(-45deg)",
        opacity: "1",
        color: grayColor[2],
        position: "absolute",
        content: "''",
        borderBottom: "2px solid currentColor",
        transition: "opacity 90ms cubic-bezier(0,0,.2,.1)",
      },
    },
  },
  cardTitle: {
    ...cardTitle,
    color: whiteColor,
  },
  cardIconTitle: {
    ...cardTitle,
    marginTop: "15px",
    marginBottom: "0px",
  },
  formCategory: {
    marginBottom: "0",
    color: grayColor[0],
    fontSize: "14px",
    padding: "10px 0 10px",
  },
  center: {
    textAlign: "center",
  },
  formFooter: {
    justifyContent: "center",
    paddingTop: "30px",
  },
  registerButton: {
    float: "right",
  },
  danger: {
    color: dangerColor[0] + "!important",
  },
  underlineError: {
    borderBottom: "3px solid #ff0000",
  },
  underlineSuccess: {
    borderBottom: "3px solid #0000ee",

    "&:after": {
      borderColor: successColor[0],
    },
  },
};

export default quoteFormStyle;
