import React from "react";
import { Route, createRoutesFromElements,Navigate } from "react-router-dom";
import "./index.css"
import { Auth } from "./AuthPage/auth.jsx";
import { Home } from "./HomePage/home.jsx";
import { PageLayout } from "./PageLayout/pagelayout.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import UserProfile from "./UserProfile/UserProfile.jsx";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "./firebase/firebaseconfig.js";
function App()
{
  const [user] = useAuthState(auth);
  console.warn(user)
    const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<PageLayout />}>
        <Route index element={ user!==null ? <Home /> : <Navigate to="/auth"/>} />
        <Route path="/auth" element={user===null ? <Auth /> :<Navigate to="/"/>} />
        <Route path="/:username" element={<UserProfile />} />
      </Route>
    )
  );
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}
export { App };
