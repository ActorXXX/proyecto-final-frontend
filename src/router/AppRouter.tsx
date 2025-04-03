import { lazy } from "react"
import { Route, Routes } from "react-router-dom"
import AppOutlet from "./AppOutlet"
import Home from "../pages/Home"
import Login from "../pages/Login"
import CreateProduct from "../pages/CreateProducts"
import ListProducts from "../pages/ListProducts";

const Products = lazy(() => import('../pages/Products'))
/*const SingleProduct = lazy(() => import('../pages/SingleProduct'))*/
const Profile = lazy(() => import('../pages/Profile'))
const Admin = lazy(() => import('../pages/Admin'))


const AppRouter = () => {
  return (
    <Routes>
      <Route element={<AppOutlet />}>
        <Route path="/products" element={<ListProducts />} />
        <Route path="/admin" element={<Admin />}>
          {/* Rutas disponibles solo dentro de /admin */}
          <Route path="createproducts" element={<CreateProduct />} />
        </Route>
        <Route path="/profile" element={<Profile />} />
        <Route path="/login" element={<Login />} />
        {/* <Route path="/products/:id" element={<SingleProduct />} /> */}
      </Route>

            <Route path='/' element={<Home />} />
    </Routes>
  )
}

export default AppRouter