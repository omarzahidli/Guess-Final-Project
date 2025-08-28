import { createBrowserRouter, createRoutesFromElements, Navigate, Route } from "react-router";
import Home from "../user/Pages/Homepage";
import Admin from "../admin/Admin";
import Auth from "./Auth";
import Categories from "../admin/adminUI/Category/Categories";
import Error from "../Error";
import Login from "../user/Pages/Login";
import Products from "../admin/adminUI/Products/Products";
import Women from "../user/Pages/Women";
import Men from "../user/Pages/Men";
import Kids from "../user/Pages/Kids";
import HomeGuess from "../user/Pages/Home";
import List from "../user/Pages/List";
import Product from "../user/Pages/Product";
import Basket from "../user/Pages/Basket";
import Account from "../user/Pages/Account";
import Wishlist from "../user/Pages/Wishlist";
import SearchProducts from "../user/Pages/SearchProducts";

export const route = createBrowserRouter(
    createRoutesFromElements(
        <>
            <Route path="/login" element={<Login />} />
            <Route path="/" element={<Navigate to="/home" />} />
            <Route path="/home" element={<Home />} />
            <Route path="/guess">
                <Route index element={<Navigate to="women" />} />
                <Route path="women" element={<Women />} />
                <Route path="men" element={<Men />} />
                <Route path="kids" element={<Kids />} />
                <Route path="home" element={<HomeGuess />} />
                <Route path="cart" element={<Basket />} />
                <Route path="account" element={<Account />} />
                <Route path="wishlist" element={<Wishlist />} />
                <Route path="search-products" element={<SearchProducts />} />
                <Route path=":category/:subCategoryName" element={<List />} />
                <Route path=":category/:subCategoryName/:productSlug" element={<Product />} />
            </Route>
            <Route path="/admin" element={
                <Auth>
                    <Admin />
                </Auth>
            }>
                <Route path="categories" element={<Categories />} />
                <Route path="products" element={<Products />} />
            </Route>
            <Route path="*" element={<Error />} />
        </>
    )
)