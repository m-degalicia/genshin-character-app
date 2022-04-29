import React, { lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";

import Layout from "layouts/AppLayout";
import routes from "./routes";

const WelcomePage = lazy(
  () => import(/* webpackChunkName: "welcome" */ "pages/welcome")
);
const ChartPage = lazy(
  () => import(/* webpackChunkName: "chart" */ "pages/chart")
);
const TablePage = lazy(
  () => import(/* webpackChunkName: "table" */ "pages/table")
);
const TableForm = lazy(
  () => import(/* webpackChunkName: "form" */ "pages/table/TableForm")
);

const AppRoutes = () => (
  <Layout>
    <Suspense fallback={<div>Loading...</div>}>
      <Routes>
        <Route path={routes.root()} element={<WelcomePage />} />
        <Route path={routes.chart()} element={<ChartPage />} />
        <Route path={routes.table()} element={<TablePage />} />
        <Route path={routes.tableCreate()} element={<TableForm />} />
        <Route path={`${routes.tableEdit()}:id`} element={<TableForm />} />
        <Route
          path="*"
          element={
            <div>
              <p>404</p>
            </div>
          }
        />
      </Routes>
    </Suspense>
  </Layout>
);

export default AppRoutes;
