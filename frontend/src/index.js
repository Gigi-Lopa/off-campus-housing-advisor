import React from 'react';
import ReactDOM from 'react-dom/client';
import "./styles/css/index.css"
import "./styles/bootstrap/css/bootstrap.css"
import "./styles/bootstrap-icons/bootstrap-icons.min.css"
import Index from './screens/index';
import reportWebVitals from './reportWebVitals';
import {createBrowserRouter,  RouterProvider} from "react-router-dom"
import ListingScreen from './screens/ListingScreen';
import Host from './screens/Host';

const root = ReactDOM.createRoot(document.getElementById('root'));
let router = createBrowserRouter([
  {
    path: "/",
    element : <Index/>
  },
  {
    path : "*",
    element  :<div>Not Found</div>
  },
  {
    path :"/listing/:id",
    element : <ListingScreen/>
  },
  {
    path:"/host/:id", 
    element :<Host/>
  }
])

root.render(
  <React.StrictMode>
    <RouterProvider router  = {router}/>
  </React.StrictMode>
);

reportWebVitals();
