import React from "react";
import ReactDOM from "react-dom/client";
import reportWebVitals from "./reportWebVitals";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import WeatherDashboard from "./pages/weather/WeatherDashboard";
import ErrorPage from "./pages/error";
import RootPage from "./RootPage";

import "semantic-ui-css/semantic.min.css";
import "./index.css";

const router = createBrowserRouter([
  {
    path: "/",
    element: <WeatherDashboard />,
    errorElement: <ErrorPage />,
  },
]);

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <RootPage>
      <RouterProvider router={router} />
    </RootPage>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
