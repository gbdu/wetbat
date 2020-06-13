import React, { useContext, useEffect } from "react";

import { VectorMap } from "react-jvectormap";

import axios from "axios";
import apiurl from "api/url";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";

// @material-ui/icons
// import ContentCopy from "@material-ui/icons/ContentCopy";
// import InfoOutline from "@material-ui/icons/InfoOutline";
import Language from "@material-ui/icons/Language";

// core components
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import Table from "components/Table/Table.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardIcon from "components/Card/CardIcon.js";
import CardBody from "components/Card/CardBody.js";

import styles from "assets/jss/material-dashboard-pro-react/views/dashboardStyle.js";

import CreateOrEditQuote from "mycomponents/CreateOrEditQuote";
import { QuoteContext } from "context/QuoteContext";
import QuotesTable from "mycomponents/QuotesTable";

const us_flag = require("assets/img/flags/US.png");
const de_flag = require("assets/img/flags/DE.png");
const au_flag = require("assets/img/flags/AU.png");
const gb_flag = require("assets/img/flags/GB.png");
const ro_flag = require("assets/img/flags/RO.png");
const br_flag = require("assets/img/flags/BR.png");

var mapData = {
  AU: 760,
  BR: 550,
  CA: 120,
  DE: 1300,
  FR: 540,
  GB: 690,
  GE: 200,
  IN: 200,
  RO: 600,
  RU: 300,
  US: 2920,
};

const useStyles = makeStyles(styles);

export default function Dashboard() {
  const [state, dispatch] = useContext(QuoteContext);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          // TODO: pageinate/fetch more quotes as user goes through pages
          `${apiurl}/quotes?$limit=5`
        );
        dispatch({
          type: "FETCH_QUOTES",
          payload: response.data.data || response.data, // in case pagination is disabled
        });
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [dispatch]);

  const getMarkers = () => {
    if (state.quotes) {
      let markers = {};
      state.quotes.map((q) => {
        markers[q.destination.code] = {
          latLng: [q.destination.lat, q.destination.lon],
          name: q.destination.city,
        };
        //  US: { latLng: [38.9, -98.45], name: "Name of City" },
      });
      console.log(markers);
      return markers;
    }
  };

  console.log(getMarkers());
  const classes = useStyles();
  return (
    <div>
      <GridContainer>
        <GridItem xs={12} sm={6}>
          <CreateOrEditQuote />
        </GridItem>
        <GridItem sm={6}>
          <Card>
            <CardHeader color="success" icon>
              <CardIcon color="success">
                <Language />
              </CardIcon>
              <h4 className={classes.cardIconTitle}>
                Last 5 destinations and quotes
              </h4>
            </CardHeader>
            <CardBody>
              <GridContainer justify="space-between">
                <GridItem xs={12} sm={12} md={12}>
                  <Table
                    tableData={[
                      [
                        <img src={us_flag} alt="us_flag" key={"flag"} />,
                        "USA",
                        "2.920",
                        "53.23%",
                      ],
                      [
                        <img src={de_flag} alt="us_flag" key={"flag"} />,
                        "Germany",
                        "1.300",
                        "20.43%",
                      ],
                      [
                        <img src={au_flag} alt="us_flag" key={"flag"} />,
                        "Australia",
                        "760",
                        "10.35%",
                      ],
                      [
                        <img src={gb_flag} alt="us_flag" key={"flag"} />,
                        "United Kingdom",
                        "690",
                        "7.87%",
                      ],
                      [
                        <img src={ro_flag} alt="us_flag" key={"flag"} />,
                        "Romania",
                        "600",
                        "5.94%",
                      ],
                      [
                        <img src={br_flag} alt="us_flag" key={"flag"} />,
                        "Brasil",
                        "550",
                        "4.34%",
                      ],
                    ]}
                  />
                </GridItem>
              </GridContainer>
              <VectorMap
                map={"world_mill"}
                backgroundColor="transparent"
                zoomOnScroll={true}
                containerStyle={{
                  width: "100%",
                  height: "280px",
                }}
                containerClassName="map"
                regionStyle={{
                  initial: {
                    fill: "#e4e4e9",
                    "fill-opacity": 0.9,
                    stroke: "none",
                    "stroke-width": 0,
                    "stroke-opacity": 0,
                  },
                }}
                markers={getMarkers()}
              />
            </CardBody>
          </Card>
        </GridItem>
      </GridContainer>
      <QuotesTable />
    </div>
  );
}
