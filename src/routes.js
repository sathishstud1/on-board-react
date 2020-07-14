import React from "react";
import Search from "./views/Search/Search";
//import Bureau from "./views/Bureau/Bureau";

const Dashboard = React.lazy(() => import("./views/Dashboard/Dashboard"));
const Applications = React.lazy(() =>
  import("./views/Applications/Applications")
);
const Application = React.lazy(() =>
  import("./views/Applications/Application")
);
const Customers = React.lazy(() => import("./views/Customers/Customers"));
//const Customer = React.lazy(() => import("./views/Customers/Customer"));
//const Businesses = React.lazy(() => import("./views/Businesses/Businesses"));
const Business = React.lazy(() => import("./views/Businesses/Business"));
const Products = React.lazy(() => import("./views/Products/Products"));
//const Product = React.lazy(() => import("./views/Products/Product"));
const UWPage = React.lazy(() => import("./views/UWPage/UWPage"));
const Bureau = React.lazy(() => import("./views/Bureau/Bureau"));
const Booking = React.lazy(() => import("./views/Booking/Booking"));
const ErrorPage = React.lazy(() => import("./views/Pages/Error/Error"));

const routes = [
  { path: "/dashboard", name: "Dashboard", component: Dashboard },
  {
    path: "/manage-applications",
    exact: true,
    name: "Applications",
    component: Applications,
  },
  {
    path: "/manage-applications/:id",
    exact: true,
    name: "Application Details",
    component: Application,
  },
  {
    path: "/customers",
    exact: true,
    name: "Customer 360",
    component: Customers,
  },
  /*{
    path: "/customers/:id",
    exact: true,
    name: "Customer Details",
    component: Customer,
  },*/
  {
    path: "/businesses",
    exact: true,
    name: "Business 360",
    component: Business,
  },
  /*{
    path: "/businesses/:id",
    exact: true,
    name: "Business Details",
    component: Business,
  },*/
  { path: "/products", exact: true, name: "Product 360", component: Products },
  /*{
    path: "/products/:id",
    exact: true,
    name: "Product Details",
    component: Product,
  },*/
  { path: "/search", exact: true, name: "Search", component: Search },
  { path: "/uwpage", exact: true, name: "UW Decision", component: UWPage },
  /*{ path: "/uwpage/:id", exact: true, name: "UWpage", component: UWpage },*/
  { path: "/bureau", exact: true, name: "Bureau", component: Bureau },
  { path: "/booking", exact: true, name: "Book Product", component: Booking },
  { path: "/error", exact: true, name: "ERROR", component: ErrorPage },
  /*  --------------------------------------  */
];

export default routes;
