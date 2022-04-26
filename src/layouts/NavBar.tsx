import React from "react";
import { Link } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";

import routes from "routes/routes";

type Page = {
  name: string;
  path: string;
};

const pages = [
  {
    name: "Home",
    path: routes.root(),
  },
  {
    name: "Table",
    path: routes.table(),
  },
  {
    name: "Chart",
    path: routes.chart(),
  },
];

const NavBar = () => (
  <AppBar position="static">
    <Container maxWidth="xl">
      <Toolbar
        disableGutters
        sx={{ display: "flex", flexDirection: { xs: "column", md: "row" } }}
      >
        <Typography
          variant="h6"
          noWrap
          component="div"
          sx={{ mt: { xs: 2, md: 0 }, mr: { xs: 0, md: 2 }, display: "flex" }}
        >
          Genshin Table and Chart App
        </Typography>
        <Box
          sx={{
            flexGrow: 1,
            display: "flex",
            flexDirection: "row",
          }}
        >
          {pages.map((page: Page) => (
            <Link
              key={page.path}
              to={page.path}
              style={{ textDecoration: "none" }}
            >
              <Button
                sx={{ my: { xs: 0, md: 2 }, color: "white", display: "block" }}
              >
                {page.name}
              </Button>
            </Link>
          ))}
        </Box>
      </Toolbar>
    </Container>
  </AppBar>
);

export default NavBar;
