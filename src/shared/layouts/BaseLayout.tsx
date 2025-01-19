
import Navbar from '@components/Navbar'
import { ReactElement } from 'react'

const BaseLayout = ({ children }: {
    children: ReactElement
}) => {
    return (
        <>
            <Navbar />
            {children}
        </>
    )
}
export default BaseLayout