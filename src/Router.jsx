import { createBrowserRouter, RouterProvider, redirect } from "react-router-dom";

import App from "./App";
import RecordDetailsPage from "./pages/RecordDetailsPage";
import AuthorDetailsPage from "./pages/AuthorDetailsPage";
import NotFoundPage from "./pages/NotFoundPage";
import ChatPage from "@/pages/ChatPage";
import RecordingsPage from "./pages/RecordingsPage";
import AuthorsPage from "./pages/AuthorsPage";
import LandingPage from "./pages/LandingPage";
import MapPage from "./pages/MapPage";
import CategoryPage from "./pages/CategoryPage";
import AuthPage from "./pages/AuthPage";

const isAuthenticated = () => {
  return localStorage.getItem('token') !== null;
};

const authLoader = () => {
  if (isAuthenticated()) {
    return redirect("/");
  }
  return null;
};

const protectedLoader = () => {
  if (!isAuthenticated()) {
    return redirect("/auth");
  }
  return null;
};

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <NotFoundPage />,
    children: [
      {
        index: true,
        element: <LandingPage />,
      },
      {
        path: "catalogo",
        element: <RecordingsPage />,
      },
      {
        path: "catalogo/:category",
        element: <CategoryPage />
      },
      {
        path: "perfiles",
        element: <AuthorsPage />,
      },
      {
        path: "perfil/:authorId",
        element: <AuthorDetailsPage />,
      },
      {
        path: "record/:recordId",
        element: <RecordDetailsPage />,
      },
      {
        path: "mapa",
        element: <MapPage />
      },
      {
        path: "chat",
        element: <ChatPage />,
        loader: protectedLoader,
      },
    ],
  },
  {
    path: "auth",
    element: <AuthPage />,
    errorElement: <NotFoundPage />,
    loader: authLoader
  },
]);

const Router = () => <RouterProvider router={router} />;

export default Router;