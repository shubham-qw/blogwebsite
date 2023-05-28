import './App.css';
import Auth from "./pages/auth";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Home from './pages/home';
import Compose from './pages/compose';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Auth/>,
  },
  {
    path : "/home",
    element : <Home/>
  },
  {
    path : "/compose",
    element : <Compose/>
  }
]);

function App() {
  return (
    <>
    <RouterProvider router={router} />
    </>
  );
}

export default App;
