import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { useUserStore } from "@/stores/useUserStore";
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
import NotAllowedPage from "./pages/NotAllowedPage";
import EditUserProfilePage from "./pages/user/EditUserProfilePage";
import UserProfilePage from "./pages/user/UserProfilePage";

function ProtectedRoute({ children }) {
  const isAuthenticated = useUserStore((state) => state.isAuthorized);
  return isAuthenticated ? children : <NotAllowedPage />;
}

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
        element: <CategoryPage />,
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
        element: <MapPage />,
      },
      {
        path: "chat",
        element: (
          <ProtectedRoute>
            <ChatPage />
          </ProtectedRoute>
        ),
      },
      {
        path: "profile",
        element: (
          <ProtectedRoute>
            <UserProfilePage />
          </ProtectedRoute>
        ),
      },
      {
        path: "edit-profile",
        element: (
          <ProtectedRoute>
            <EditUserProfilePage />
          </ProtectedRoute>
        ),
      }
    ],
  },
  {
    path: "auth",
    element: <AuthPage />,
    errorElement: <NotFoundPage />,
  },
]);

const Router = () => <RouterProvider router={router} />;

export default Router;
