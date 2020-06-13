import Dashboard from "views/Dashboard/Dashboard.js";
import Quotes from "views/Quotes/Quotes.js";
import Contacts from "views/Contacts/Contacts.js";

import CreateContact from "mycomponents/CreateContact";

import DashboardIcon from "@material-ui/icons/Dashboard";
import MonetizationOnIcon from "@material-ui/icons/MonetizationOn";
import ContactMailIcon from "@material-ui/icons/ContactMail";

var dashRoutes = [
  {
    path: "/dashboard",
    name: "Dashboard",
    icon: DashboardIcon,
    component: Dashboard,
    layout: "/admin",
  },
  {
    path: "/quotes",
    name: "Quotes",
    icon: MonetizationOnIcon,
    component: Quotes,
    layout: "/admin",
  },
  {
    path: "/contacts",
    name: "Customers",
    icon: ContactMailIcon,
    component: Contacts,
    layout: "/admin",
  },
];
export default dashRoutes;
