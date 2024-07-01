import { createBrowserRouter, RouterProvider } from "react-router-dom";

import App from "./App";
import HomePage from "./pages/HomePage";
import RecordDetailsPage from "./pages/RecordDetailsPage";
import NotFoundPage from "./pages/NotFoundPage";

import UserPage from "./pages/UserPage";
import ChatPage from "@/pages/ChatPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <NotFoundPage />,
    children: [
      {
        path: "/",
        element: <HomePage />,
      },
      {
        path: "/record/:recordId",
        element: <RecordDetailsPage />,
      },
      {
        path: "/chat",
        element: <ChatPage />,
      },
    ],
  },
  {
    path: "/user",
    element: <UserPage />,
    errorElement: <NotFoundPage />,
  },
]);

const Router = () => <RouterProvider router={router} />;

export default Router;
