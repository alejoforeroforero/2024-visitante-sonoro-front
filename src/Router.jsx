import { createBrowserRouter, RouterProvider } from "react-router-dom";

import App from "./App";
import HomePage from "./pages/HomePage";
import RecordDetailsPage from "./pages/RecordDetailsPage";
import AuthorDetailsPage from "./pages/AuthorDetailsPage";
import NotFoundPage from "./pages/NotFoundPage";

import UserPage from "./pages/UserPage";
import ChatPage from "@/pages/ChatPage";
import RecordingsPage from "./pages/RecordingsPage";
import AuthorsPage from "./pages/AuthorsPage";
import LandingPage from "./pages/LandingPage";
import MapPage from "./pages/MapPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <NotFoundPage />,
    children: [
      {
        path: "/",
        element: <LandingPage />,
      },
      {
        path: "/catalogo",
        element: <RecordingsPage />,
      },
      {
        path: "/perfiles",
        element: <AuthorsPage />,
      },
      {
        path: "/perfil/:authorId",
        element: <AuthorDetailsPage />,
      },
      {
        path: "/record/:recordId",
        element: <RecordDetailsPage />,
      },
      {
        path: "/mapa",
        element: <MapPage />
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
