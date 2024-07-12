import React from "react";
import ReactDOM from "react-dom/client";
import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import App from "./App.jsx";
import "./index.css";
import Login from "./components/Login.jsx";
import Register from "./components/Register/Register.jsx";
import Home from "./components/Home/Home.jsx";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute.jsx";
import NotFound from "./components/NotFound/NotFound.jsx";
import store from "./store/store.js";
import { Provider } from "react-redux";
import PartnerRegister from "./components/Register/PartnerRegister.jsx";
import StepperComp from "./components/utilities/StepperComp.jsx";
import Menu from "./components/Partner/Menu.jsx";
import AddDish from "./components/Partner/AddDish.jsx";
import PartnerOrders from "./components/Partner/PartnerOrders.jsx";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route
        path=""
        element={
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>
        }
      />

      <Route
        path="partner-menu"
        element={
          <ProtectedRoute>
            <Menu />
          </ProtectedRoute>
        }
      />

      <Route
        path="partner-add-items"
        element={
          <ProtectedRoute>
            <AddDish />
          </ProtectedRoute>
        }
      />

      <Route
        path="partner-orders"
        element={
          <ProtectedRoute>
            <PartnerOrders />
          </ProtectedRoute>
        }
      />

      <Route path="login" element={<Login />} />
      <Route path="register" element={<Register />} />
      <Route path="partner-registration" element={<PartnerRegister />} />
      <Route path="stepper-com" element={<StepperComp />} />
      <Route path="*" element={<NotFound />} />
    </Route>
  )
);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);
