import './App.css';
import Auth from "./pages/auth";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Home from './pages/home';
import Compose from './pages/compose';
import MyPost from './pages/mypost';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

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
  },
  {
    path : "/mypost",
    element : <MyPost></MyPost>
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
