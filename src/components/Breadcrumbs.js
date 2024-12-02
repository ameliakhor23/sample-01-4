import React from "react";
import { Breadcrumbs, Link, Typography } from "@mui/material";
import { useLocation, Link as RouterLink } from "react-router-dom";

const BreadcrumbNav = () => {
  const location = useLocation();
  const pathnames = location.pathname.split("/").filter((x) => x);

  return (
    <Breadcrumbs aria-label="breadcrumb" sx={{ mt: 2, mb: 2 }}>
      <Link underline="hover" color="inherit" component={RouterLink} to="/">
        Home
      </Link>
      {pathnames.map((value, index) => {
        const to = `/${pathnames.slice(0, index + 1).join("/")}`;
        const isLast = index === pathnames.length - 1;
        
        return isLast ? (
          <Typography color="text.primary" key={to}>
            {value.charAt(0).toUpperCase() + value.slice(1)}
          </Typography>
        ) : (
          <Link
            underline="hover"
            color="inherit"
            component={RouterLink}
            to={to}
            key={to}
          >
            {value.charAt(0).toUpperCase() + value.slice(1)}
          </Link>
        );
      })}
    </Breadcrumbs>
  );
};

export default BreadcrumbNav;
