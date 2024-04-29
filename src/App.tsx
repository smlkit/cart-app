import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Layout from "./pages/Layout";
import Catalog from "./pages/catalog/Catalog";
import Cart from "./pages/cart/Cart";
import Favorites from "./pages/favorites/Favorites";
import "./globals.scss";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Catalog />,
      },
      {
        path: "/cart",
        element: <Cart />,
      },
      {
        path: "/favorites",
        element: <Favorites />,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
