/*import { Suspense } from "react"*/
import { Suspense } from "react"
import { Outlet } from "react-router-dom"
import { Toaster } from "sonner"

const AppOutlet = () => {
  return (
    <>
    <Toaster richColors />
    {
        
            <Suspense>
                <Outlet />
            </Suspense>
            
    }
</>
)
}

export default AppOutlet