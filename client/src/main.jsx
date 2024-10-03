import React, { Suspense } from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { store } from "@app/services/store.js";
import Model from "@components/Model.jsx";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import App from "./pages/App";

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <Suspense fallback={<Model type="loading" />}>
      <ToastContainer position="top-right" autoClose={1500} />
      <App />
    </Suspense>
  </Provider>
);
