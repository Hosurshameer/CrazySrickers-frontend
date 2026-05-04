import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import {
  createBrowserRouter,
  RouterProvider,
  createRoutesFromElements,
  Route,
} from "react-router-dom";
import Contact from "./components/Contact.jsx";
import Login from "./components/Login.jsx";
import Cart from "./components/Cart.jsx";
import About from "./components/About.jsx";
import Home from "./components/Home.jsx";
import ErrorPage from "./components/ErrorPage.jsx";
import { productsLoader } from "./components/Home.jsx";
import { contactAction } from "./components/Contact.jsx";
import { ToastContainer, Bounce } from "react-toastify";
import ProductDetail from "./components/ProductDetail.jsx";
// import { CartProvider } from "./store/cart-context.jsx";
import store from "./store/store.js";
import { Provider } from "react-redux";
import { loginAction } from "./components/Login.jsx";
import "react-toastify/dist/ReactToastify.css";
// import { AuthProvider } from "./store/auth-context.jsx";
import Checkout from "./components/checkout.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";
import Orders from "./components/Orders.jsx";
import Profile from "./components/Profile.jsx";
import AdminOrders from "./components/admin/AdminOrders.jsx";
import Messages from "./components/admin/Messages.jsx";
import Register from "./components/Register.jsx";
import OrderSuccess from "./components/OrderSuccess.jsx";
import { registerAction } from "./components/Register.jsx";
import { profileLoader } from "./components/Profile.jsx";
import { profileAction } from "./components/Profile.jsx";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { ordersLoader } from "./components/Orders.jsx";
import { adminOrdersLoader } from "./components/admin/AdminOrders.jsx";
import { messagesLoader } from "./components/admin/Messages.jsx";
import AdminOrderAfterClick from "./components/AdminOrderAfterClick.jsx";
import UserOrdersAfterClick from "./components/UserOrdersAfterClick.jsx";
import { contactLoader } from "./components/Contact.jsx";
import Customize from "./components/customize.jsx";
import LandingPage from "./components/LandingPage.jsx";
import Upload from "./components/upload.jsx";
import CapturePage from "./components/CapturePage.jsx";
import DisplaySticker from "./components/DisplaySticker.jsx";
import AnimeDisplaySticker from "./components/AnimeDisplaySticker.jsx";


const stripePromise=loadStripe("pk_test_51SwbPv2OhKYF21eMjvcsEM6g1ivgO5JKi1SEcumFH9Hm4c5VGa9hBr1S2nEvnqqEVb8wUHZrzQVLYkluBhLbheq200uG3hHJVL");


const routeDefinations = createRoutesFromElements(
  <Route path="/" element={<App />} errorElement={<ErrorPage />}>
    <Route index element={<LandingPage />} />
    <Route path="/home" element={<Home />} loader={productsLoader} />
    <Route path="/about" element={<About />} />
    <Route path="/contact" element={<Contact />} action={contactAction} loader={contactLoader} />
    <Route path="/login" element={<Login />} action={loginAction} />
    <Route path="/cart" element={<Cart />} />
    <Route path="/capture" element={<CapturePage />} />
    <Route path="/displaysticker" element={< DisplaySticker/>} />
    <Route path="/anime-sticker" element={<AnimeDisplaySticker />} />
    
    <Route path="/upload" element={<Upload/>}/>
    <Route path="/customize" element={<Customize/>}/>
    <Route path="/register" element={<Register />} action={registerAction} />

    <Route path="/products/:productId" element={<ProductDetail />} />
    <Route path="/item/:productId" element={<AdminOrderAfterClick />} />
    <Route path="/user/item/:productId" element={<UserOrdersAfterClick/>} />
    

    <Route element={<ProtectedRoute />}>
      <Route path="/checkout" element={<Checkout />} />
      <Route path="/order-success" element={<OrderSuccess />} />

      <Route path="/orders" element={<Orders />} loader={ordersLoader} />
      <Route path="/profile" element={<Profile /> } action={profileAction}  loader={profileLoader}  shouldRevalidate={({actionResult})=>{return !actionResult?.success;}}/>
      <Route path="/admin/orders" element={<AdminOrders />} loader={adminOrdersLoader} />
      <Route path="/admin/messages" element={<Messages />} loader={messagesLoader}/>
    </Route>
  </Route>
);

const appRouter = createBrowserRouter(routeDefinations);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Elements stripe={stripePromise}>
   
      <Provider store={store}>
        <RouterProvider router={appRouter} />
      </Provider>
    

    <ToastContainer
      position="top-center"
      autoClose={3000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick={false}
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      theme={localStorage.getItem("theme") === "drak" ? "dark" : "light"}
      transition={Bounce}
    />
    </Elements>
  </StrictMode>
);
