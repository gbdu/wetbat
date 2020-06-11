import React from "react";
// react plugin for creating charts
// react plugin for creating vector maps
import { VectorMap } from "react-jvectormap";

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

import CreateQuote from "components/CreateQuote";

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
  const classes = useStyles();
  return (
    <div>
      <CreateQuote />

      <GridContainer>
        <GridItem xs={12}>
          <Card>
            <CardHeader color="success" icon>
              <CardIcon color="success">
                <Language />
              </CardIcon>
              <h4 className={classes.cardIconTitle}>
                Global Sales by Top Locations
              </h4>
            </CardHeader>
            <CardBody>
              <GridContainer justify="space-between">
                <GridItem xs={12} sm={12} md={5}>
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
                <GridItem xs={12} sm={12} md={6}>
                  <VectorMap
                    map={"world_mill"}
                    backgroundColor="transparent"
                    zoomOnScroll={false}
                    containerStyle={{
                      width: "100%",
                      height: "280px",
                    }}
                    containerClassName="map"
                    regionStyle={{
                      initial: {
                        fill: "#e4e4e4",
                        "fill-opacity": 0.9,
                        stroke: "none",
                        "stroke-width": 0,
                        "stroke-opacity": 0,
                      },
                    }}
                    series={{
                      regions: [
                        {
                          values: mapData,
                          scale: ["#AAAAAA", "#444444"],
                          normalizeFunction: "polynomial",
                        },
                      ],
                    }}
                  />
                </GridItem>
              </GridContainer>
            </CardBody>
          </Card>
        </GridItem>
      </GridContainer>
    </div>
  );
}
