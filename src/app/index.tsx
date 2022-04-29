import React from "react";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";

import { store } from "./store";
import AppRoutes from "routes";

const App = () => (
  <Provider store={store}>
    <BrowserRouter basename={`/${process.env.PUBLIC_URL}`}>
      <AppRoutes />
    </BrowserRouter>
  </Provider>
);

export default App;
