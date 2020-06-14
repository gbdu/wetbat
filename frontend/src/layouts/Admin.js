/* eslint-disable no-unused-vars */
import React, { useState, useContext } from "react";
import cx from "classnames";
import { Switch, Route, Redirect } from "react-router-dom";
// creates a beautiful scrollbar
import PerfectScrollbar from "perfect-scrollbar";
import "perfect-scrollbar/css/perfect-scrollbar.css";

// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";

// core components
import AdminNavbar from "components/Navbars/AdminNavbar.js";
import Footer from "components/Footer/Footer.js";
import Sidebar from "components/Sidebar/Sidebar.js";

import routes from "routes.js";

import adminStyle from "assets/jss/material-dashboard-pro-react/layouts/adminStyle.js";

import buttonStyle from "assets/jss/material-dashboard-pro-react/components/buttonStyle.js";

import { ContactContext } from "../context/ContactContext";
import { QuoteContext } from "../context/QuoteContext";
import mylogo from "../assets/mylogo.png";

import SweetAlert from "react-bootstrap-sweetalert";

var ps;

const useStyles = makeStyles(adminStyle);

export default function Dashboard(props) {
  const { ...rest } = props;
  const classes = useStyles();
  // states and functions
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [miniActive, setMiniActive] = React.useState(true);

  const [color, setColor] = React.useState("blue");
  const [bgColor, setBgColor] = React.useState("black");
  // const [hasImage, setHasImage] = React.useState(true);

  const [logo, setLogo] = React.useState(require("assets/img/logo.png"));

  const [quoteState, quoteDispatch] = useContext(QuoteContext);
  const [contactState, contactDispatch] = useContext(ContactContext);

  const [alert, setAlert] = useState(null); // Stores sweet alert component
  // styles
  const mainPanelClasses =
    classes.mainPanel +
    " " +
    cx({
      [classes.mainPanelSidebarMini]: miniActive,
      [classes.mainPanelWithPerfectScrollbar]:
        navigator.platform.indexOf("Win") > -1,
    });
  // ref for main panel div
  const mainPanel = React.createRef();
  // effect instead of componentDidMount, componentDidUpdate and componentWillUnmount
  React.useEffect(() => {
    if (navigator.platform.indexOf("Win") > -1) {
      ps = new PerfectScrollbar(mainPanel.current, {
        suppressScrollX: true,
        suppressScrollY: false,
      });
      document.body.style.overflow = "hidden";
    }
    window.addEventListener("resize", resizeFunction);

    // Specify how to clean up after this effect:
    return function cleanup() {
      if (navigator.platform.indexOf("Win") > -1) {
        ps.destroy();
      }
      window.removeEventListener("resize", resizeFunction);
    };
  });

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };
  const getRoute = () => {
    return window.location.pathname !== "/admin/full-screen-maps";
  };
  const getActiveRoute = (routes) => {
    let activeRoute = "Default Brand Text";
    for (let i = 0; i < routes.length; i++) {
      if (routes[i].collapse) {
        let collapseActiveRoute = getActiveRoute(routes[i].views);
        if (collapseActiveRoute !== activeRoute) {
          return collapseActiveRoute;
        }
      } else {
        if (
          window.location.href.indexOf(routes[i].layout + routes[i].path) !== -1
        ) {
          return routes[i].name;
        }
      }
    }
    return activeRoute;
  };
  const getRoutes = (routes) => {
    return routes.map((prop, key) => {
      if (prop.collapse) {
        return getRoutes(prop.views);
      }
      if (prop.layout === "/admin") {
        return (
          <Route
            path={prop.layout + prop.path}
            component={prop.component}
            key={key}
          />
        );
      } else {
        return null;
      }
    });
  };
  const sidebarMinimize = () => {
    setMiniActive(!miniActive);
  };
  const resizeFunction = () => {
    if (window.innerWidth >= 960) {
      setMobileOpen(false);
    }
  };

  const hideAlert = (dispatch) => {
    setAlert(null);
    dispatch({
      type: "CLEAR_MESSAGE",
      payload: {},
    });
  };

  const messageAlert = (message, dispatch) => {
    setAlert(
      <SweetAlert
        type={message.type === "error" ? "error" : "success"}
        style={{ display: "block", marginTop: "-100px" }}
        title={message.title}
        onConfirm={() => {
          hideAlert(dispatch);
        }}
        onCancel={() => hideAlert(dispatch)}
        confirmBtnCssClass={classes.button + " " + classes.success}
      >
        {message.content}
      </SweetAlert>
    );
    console.log(message);
  };

  if (quoteState.message.content && !alert) {
    messageAlert(quoteState.message, quoteDispatch);
  }

  if (contactState.message.content && !alert) {
    messageAlert(contactState.message, contactDispatch);
  }

  return (
    <div className={classes.wrapper}>
      {alert}
      <Sidebar
        routes={routes}
        logoText={"WetBat"}
        logo={mylogo}
        handleDrawerToggle={handleDrawerToggle}
        open={mobileOpen}
        color={color}
        bgColor={bgColor}
        miniActive={miniActive}
        {...rest}
      />
      <div className={mainPanelClasses} ref={mainPanel}>
        <AdminNavbar
          sidebarMinimize={sidebarMinimize.bind(this)}
          miniActive={miniActive}
          brandText={getActiveRoute(routes)}
          handleDrawerToggle={handleDrawerToggle}
          {...rest}
        />
        {/* On the /maps/full-screen-maps route we want the map to be on full screen - this is not possible if the content and conatiner classes are present because they have some paddings which would make the map smaller */}
        {getRoute() ? (
          <div className={classes.content}>
            <div className={classes.container}>
              <Switch>
                {getRoutes(routes)}
                <Redirect exact from="/admin" to="/admin/dashboard" />
              </Switch>
            </div>
          </div>
        ) : (
          <div className={classes.map}>
            <Switch>
              {getRoutes(routes)}
              <Redirect exact from="/admin" to="/admin/dashboard" />
            </Switch>
          </div>
        )}
        {getRoute() ? <Footer fluid /> : null}
      </div>
    </div>
  );
}
