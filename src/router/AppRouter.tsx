import { lazy } from "react"
import { Route, Routes } from "react-router-dom"
import AppOutlet from "./AppOutlet"
import Home from "../pages/Home"

const Products = lazy(() => import('../pages/Products'))
/*const SingleProduct = lazy(() => import('../pages/SingleProduct'))*/
const Profile = lazy(() => import('../pages/Profile'))
const Admin = lazy(() => import('../pages/Admin'))


const AppRouter = () => {
  return (
    <Routes>
            <Route element={<AppOutlet />}>
                <Route path='/products' element={<Products />} />
                <Route path='/admin' element={<Admin />} />
                <Route path='/profile' element={<Profile />} />
                {/* <Route path='/products/:id' element={<SingleProduct />} /> */}
            </Route>

            <Route path='/' element={<Home />} />

    </Routes>
  )
}

export default AppRouter