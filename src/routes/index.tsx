import React from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";

function Routes() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <></>,
    },
  ]);

  return <RouterProvider router={router} />;
}

export default Routes;
