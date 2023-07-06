import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./components/Login";
import ForgotPassword from "./components/ForgotPassword";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
    children: [
      {
        path: "forgotpassword",
        element: <ForgotPassword />,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
