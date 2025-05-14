import React, { useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import "./styles/css/index.css"
import "./styles/bootstrap/css/bootstrap.css"
import "./styles/bootstrap-icons/bootstrap-icons.min.css"
import Index from './screens/index';
import reportWebVitals from './reportWebVitals';
import {createBrowserRouter,  RouterProvider} from "react-router-dom"
import ListingScreen from './screens/ListingScreen';
import Host from './screens/Host';
import Signup from './screens/Signup';
import Signin from './screens/Signin';
import Cookie from "js-cookie"

const root = ReactDOM.createRoot(document.getElementById('root'));
let router = createBrowserRouter([
  {
    path: "/",
    element : <Index/>
  },
  {
    path :"/listing/:id",
    element : <ListingScreen/>
  },
  {
    path:"/host/:id", 
    element :<Host/>
  },
  {
    path: "/login/:mode",
    element : <Signin/>
  },
  {
    path : "/signup/:mode",
    element : <Signup/>
  },
  {
    path : "*",
    element  :<div>Not Found</div>
  },
])

root.render(
  <React.StrictMode>
    <RouterProvider router  = {router}/>
  </React.StrictMode>
);

reportWebVitals();
