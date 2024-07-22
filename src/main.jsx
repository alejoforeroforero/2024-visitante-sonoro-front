import React from "react";
import { Provider } from "react-redux";
import ReactDOM from "react-dom/client";
import { GoogleOAuthProvider } from "@react-oauth/google";

import Router from "./Router.jsx";
import store from "./redux/store";

import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <GoogleOAuthProvider clientId='40425782780-tbn9kte2rn355q67jouqs4165vs6shre.apps.googleusercontent.com'>
      <Provider store={store}>
        <Router />
      </Provider>
    </GoogleOAuthProvider>

    {/* <Provider store={store}>
      <Router />
    </Provider> */}
  </React.StrictMode>
);
