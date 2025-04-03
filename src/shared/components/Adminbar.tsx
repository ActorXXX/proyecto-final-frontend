import { Box, HStack, Image, Text } from "@chakra-ui/react";
import { RiLogoutBoxRLine } from "react-icons/ri";

import { Link } from "react-router-dom";
import { account } from "../lib/api";

const deleteToken = () => {
    localStorage.removeItem('token');
    console.log('cookieFallback has been deleted from local storage');
  };

const handleLogout = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    account.deleteSession('current');
    localStorage.removeItem('user');
}

const exitIntranet = async (e: React.MouseEvent<HTMLButtonElement>) => {
    handleLogout(e);
    deleteToken()
}

const NavLink = ({ icon, text, to }: {
    icon: React.ReactElement,
    text: string,
    to: string

}) => {
    return (
        <Box as={Link} to={to} display='flex' gap='10px' alignItems='center'>
            {icon} {text}
        </Box>
    );
};

const Adminbar = () => {

    return (
        <>
            <HStack minH='40px' bgColor='#1a1a1a' >
                <HStack w={[300, 450, 700, 900]} m='0 auto' p='1em 0' color='#eee' justifyContent='space-between'>
                    <HStack gap='1em' as={Link} to='/'>                        
                        <Text fontSize='2xl' >Mi tienda</Text>
                    </HStack>
                    <HStack gap='2em' display={'flex'}>
                        <Box as='button' border={'0'} onClick={(e: React.MouseEvent<HTMLButtonElement>) => exitIntranet(e)} display='flex' gap='10px' alignItems='center' >
                            <NavLink icon={<RiLogoutBoxRLine />} text='Cerrar Sesion' to='/' />
                        </Box>
                    </HStack>
                </HStack>
            </HStack>

        </>            
    )
}


export default Adminbar