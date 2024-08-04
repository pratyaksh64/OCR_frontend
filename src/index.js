import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import Navbar from "./components/Navbar";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Browse from "./pages/Browse";
import { Toaster } from "react-hot-toast";
import SampleForm from "./pages/SampleForm";
import EditSampleForm from "./pages/EditSampleForm";
// import { ConfigProvider } from 'antd';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/browse",
    element: <Browse />,
  },
  {
    path: "/browse/:licenseNumber",
    element: <SampleForm />,
  },
  {
    path: "/edit/:licenseNumber",
    element: <EditSampleForm />,
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    {/* <ConfigProvider> */}
    <div className="lg:mx-72 border-r border-l min-h-screen px-2 py-4 bg-slate-50">
      <Toaster />
      <Navbar />
      <RouterProvider router={router} />
    </div>
    {/* </ConfigProvider> */}
  </React.StrictMode>,
);
