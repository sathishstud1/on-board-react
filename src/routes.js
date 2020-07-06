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
const Businesses = React.lazy(() => import("./views/Businesses/Businesses"));
const Business = React.lazy(() => import("./views/Businesses/Business"));
const Products = React.lazy(() => import("./views/Products/Products"));
//const Product = React.lazy(() => import("./views/Products/Product"));
const UWpage = React.lazy(() => import("./views/Products/Product"));
const Bureau = React.lazy(() => import("./views/Bureau/Bureau"));

const routes = [
  { path: "/", exact: true, name: "Home" },
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
  { path: "/customers", exact: true, name: "Customer", component: Customers },
  /*{
    path: "/customers/:id",
    exact: true,
    name: "Customer Details",
    component: Customer,
  },*/
  {
    path: "/businesses",
    exact: true,
    name: "Businesses",
    component: Businesses,
  },
  {
    path: "/businesses/:id",
    exact: true,
    name: "Business Details",
    component: Business,
  },
  { path: "/products", exact: true, name: "Products", component: Products },
  /*{
    path: "/products/:id",
    exact: true,
    name: "Product Details",
    component: Product,
  },*/
  { path: "/search", exact: true, name: "Search", component: Search },
  { path: "/uwpage", exact: true, name: "UWpage", component: UWpage },
  { path: "/bureau", exact: true, name: "Bureau", component: Bureau },
  /*  --------------------------------------  */
];

export default routes;
