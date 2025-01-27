import Adminbar from '@components/Adminbar'
import { ReactElement } from 'react'


const AdminLayout = ({ children }: {
    children: ReactElement
}) => {
    return (
        <>
            <Adminbar />
            {children}
        </>
    )
}
export default AdminLayout