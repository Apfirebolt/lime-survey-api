import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import "react-toastify/dist/ReactToastify.css";
import App from "./App.jsx";
import { store } from "./store";
import { Provider } from "react-redux";

const rootElement = document.getElementById("root");

if (!rootElement) {
  throw new Error("Failed to find the root element in index.html");
}

const root = ReactDOM.createRoot(rootElement);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);