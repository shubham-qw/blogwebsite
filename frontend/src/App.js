import './App.css';
import Auth from "./pages/auth";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Home from './pages/home';
import Compose from './pages/compose';
import MyPost from './pages/mypost';
import SearchProvider from './components/searchContext';

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
    <SearchProvider>
    <RouterProvider router={router} />
    </SearchProvider>
    </>
  );
}

export default App;
