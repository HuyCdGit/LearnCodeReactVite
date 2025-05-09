// import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
// import LoginPage from "./pages/login.jsx";
import RegisterPage from "./pages/register.jsx";
import UserPage from "./pages/user.jsx";
import Bookpage from "./pages/books.jsx";
import "./components/layout/global.css";
import TodoApp from "./components/todo/todoapp.jsx";
import ErrorPage from "./pages/error.jsx";
import LoginPage from "./pages/login.jsx";
import { AuthWrapper } from "./components/context/auth.context.jsx";
import { App as AppAntd } from "antd";
import PrivateRouter from "./pages/private.router.jsx";
import "nProgress/nprogress.css";
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <TodoApp />,
      },
      {
        path: "/users",
        element: (
          <PrivateRouter>
            <UserPage />
          </PrivateRouter>
        ),
      },
      {
        path: "/books",
        element: (
          <PrivateRouter>
            <Bookpage />
          </PrivateRouter>
        ),
      },
    ],
  },
  {
    path: "/login",
    element: <LoginPage />,
  },

  {
    path: "/register",
    element: <RegisterPage />,
  },
]);
createRoot(document.getElementById("root")).render(
  // <StrictMode>
  //   {/* <App /> */}
  //   <RouterProvider router={router} />
  // </StrictMode>
  <AppAntd>
    <AuthWrapper>
      <RouterProvider router={router} />
    </AuthWrapper>
  </AppAntd>
);
