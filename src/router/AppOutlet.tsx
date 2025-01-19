/*import { Suspense } from "react"*/
import { Navigate } from "react-router-dom"
import { Toaster } from "sonner"

const AppOutlet = () => {
  return (
    <>
    <Toaster richColors />
    {
        /*(token && session) ?
            <Suspense fallback={<Loading />}>
                <Outlet />
            </Suspense>
            :*/
            <Navigate to='/' />
    }
</>
)
}

export default AppOutlet