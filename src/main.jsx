import React from "react";
import { Provider } from "react-redux";
import ReactDOM from "react-dom/client";
import { GoogleOAuthProvider } from "@react-oauth/google";

import Router from "./Router.jsx";
import store from "./redux/store";

import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <GoogleOAuthProvider clientId="977631068082-4kid5kvcltm85oqj43s3b445me4vc0vs.apps.googleusercontent.com">
      <Provider store={store}>
        <Router />
      </Provider>
    </GoogleOAuthProvider>
  </React.StrictMode>
);
