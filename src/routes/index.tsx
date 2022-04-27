import React, { lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";

import Layout from "layouts/AppLayout";
import routes from "./routes";

const ChartPage = lazy(() => import("pages/chart"));
const TablePage = lazy(() => import("pages/table"));
const TableForm = lazy(() => import("pages/table/TableForm"));

const AppRoutes = () => (
  <Layout>
    <Suspense fallback={<div>loading...</div>}>
      <Routes>
        <Route path={routes.root()} element={<></>} />
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
