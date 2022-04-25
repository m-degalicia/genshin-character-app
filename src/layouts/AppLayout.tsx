import React, { FunctionComponent } from "react";

import NavBar from "./NavBar";

export interface LayoutProps {
  children: React.ReactNode;
}

const Layout: FunctionComponent<LayoutProps> = ({ children }) => {
  return (
    <div>
      <div>Header</div>
      <NavBar />
      <div>{children}</div>
    </div>
  );
};

export default Layout;
