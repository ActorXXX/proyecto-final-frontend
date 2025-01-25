import { ReactElement } from 'react';
// import { FaUsers } from "react-icons/fa";
import { RiHomeLine } from "react-icons/ri";
import { DiAptana } from "react-icons/di";
import { Link } from "react-router-dom";
import { Box, HStack, Image, Text, Menu, MenuButton, MenuList, MenuItem, Link as ChakraLink } from '@chakra-ui/react';
import { LuCircleUserRound, LuShoppingCart } from "react-icons/lu";
import logo from '/my-logo.png'

const NavLink = ({ icon, text, to }: {
    icon: ReactElement,
    text: string,
    to: string
}) => {
    return (
        <ChakraLink as={Link} to={to} display='flex' gap='10px' alignItems='center'>
        {icon} {text}
        </ChakraLink>
    )
}



const ProfileMenu = () => {
    return (
        <Menu>
            <MenuButton>
                <Box display='flex' gap='10px' alignItems='center'> <LuCircleUserRound /> Cuenta</Box>
            </MenuButton>
            <MenuList color='#1a1a1a'>
                <MenuItem>Ver Perfil</MenuItem>
                <MenuItem>Vaciar carrito</MenuItem>
                <MenuItem>Cerrar Sesión</MenuItem>
            </MenuList>
        </Menu>
    )
}
const Navbar = () => {
    // const navigate = useNavigate()


    return (
        <HStack minH='40px' bgColor='#1a1a1a' mb='2em'>
            <HStack w='70%' m='0 auto' p='1em 0' color='#eee' justifyContent='space-between'>
                <HStack gap='1em'>
                    <Image w='40px' src={logo} alt='logo tienda' />
                    <Text fontSize='2xl'>Mi tienda</Text>
                </HStack>
                <HStack gap='2em'>
                    <NavLink icon={<RiHomeLine />} text='Inicio' to='/' />
                    <NavLink icon={<LuShoppingCart />} text='Productos' to='/products' />
                    <NavLink icon={<DiAptana />} text='Intranet' to='/login' />
                    <ProfileMenu />
                </HStack>
            </HStack>
        </HStack>
    );

}
export default Navbar