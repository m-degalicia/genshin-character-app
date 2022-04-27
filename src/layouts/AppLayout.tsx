import React, { FunctionComponent } from "react";
import Box from "@mui/material/Box";

import NavBar from "./NavBar";

export interface LayoutProps {
  children: React.ReactNode;
}

const Layout: FunctionComponent<LayoutProps> = ({ children }) => {
  return (
    <>
      <NavBar />
      <Box
        sx={{
          pt: 4,
          px: 2,
          pb: 2,
          width: "100%",
          height: "100%",
          overflow: "hidden",
          margin: "auto",
        }}
        maxWidth="xl"
      >
        {children}
      </Box>
    </>
  );
};

export default Layout;
