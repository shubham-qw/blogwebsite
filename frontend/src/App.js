import './App.css';
import Auth from "./pages/auth";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Home from './pages/home';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Auth/>,
  },
  {
    path : "/home",
    element : <Home/>
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
