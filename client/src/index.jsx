import React from 'react';
import ReactDOM from 'react-dom/client';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom"

import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import '@fontsource/roboto/900.css';
import './index.css';

import App from './components/App';
import reportWebVitals from './reportWebVitals';
// import SocketPoC from "./SocketPoC"

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  }
])

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
   <RouterProvider router={router}/>
    {/* <SocketPoC /> */}
  </React.StrictMode>
);


// *** currently, StrictMode is causing:
// "Warning: Using UNSAFE_componentWillReceiveProps..."
// which I believe is due to the current (new) version of
// "react-swipeable-views": "^0.14.0"
// this is a normal error, apprently. We can confirm


// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
