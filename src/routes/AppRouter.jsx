import React from "react";
import { BrowserRouter, Route, Routes } from "react-router";
import MainLayout from "../layouts/MainLayout";
import LoginPage from "../pages/LoginPage";
import HomePage from "../pages/HomePage";
import RegisterPage from "../pages/RegisterPage";
import CreatePostPage from "../pages/CreatePostPage";
import MarketPage from "../pages/MarketPage";


function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/"element={<MainLayout/>}>
        <Route index element={<HomePage/>}/>
        <Route path="/login" element={<LoginPage/>}/>
        <Route path="/register" element={<RegisterPage/>}/>
        <Route path="/post" element={<CreatePostPage/>}/>
        <Route path="/market" element={<MarketPage/>}/>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default AppRouter;
