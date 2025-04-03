import { useState } from 'react';
import { Box, HStack, Image, Text, IconButton, Drawer, DrawerBody, DrawerHeader, DrawerOverlay, DrawerContent, DrawerCloseButton, VStack } from '@chakra-ui/react';
import { RiHomeLine } from "react-icons/ri";
import { LuMonitor } from "react-icons/lu";
import { DiAptana } from "react-icons/di";
import { HamburgerIcon } from '@chakra-ui/icons';
import { Link } from 'react-router-dom';
const logo = "/src/assets/my-logo.png";


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


// const ProfileMenu = () => {
//     return (
//         <Menu>
//             <MenuButton>
//                 <Box display='flex' gap='10px' alignItems='center'> <LuCircleUserRound /> Cuenta</Box>
//             </MenuButton>
//             <MenuList color='#1a1a1a'>
//                 <MenuItem>Ver Perfil</MenuItem>
//                 <MenuItem>Vaciar carrito</MenuItem>
//                 <MenuItem>Cerrar Sesión</MenuItem>
//             </MenuList>
//         </Menu>
//     )
// }

const Navbar = () => {
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const toggleDrawer = () => setIsDrawerOpen(!isDrawerOpen);


    return (
        <>
            <HStack minH='40px' bgColor='#1a1a1a' >
                <HStack w={[300, 450, 700, 900]} m='0 auto' p='1em 0' color='#eee' justifyContent='space-between'>
                    <HStack gap='1em'>
                        
                        <Text fontSize='2xl'>Mi tienda</Text>
                    </HStack>
                    <HStack gap='2em' display={{ base: 'none', md: 'flex' }}>
                        <NavLink icon={<RiHomeLine />} text='Inicio' to='/' />
                        <NavLink icon={<LuMonitor />} text='Productos' to='/products' />
                        <NavLink icon={<DiAptana />} text='Intranet' to='/login' />
                    </HStack>
                    <IconButton
                        aria-label="Open Menu"
                        icon={<HamburgerIcon />}
                        display={{ base: 'flex', md: 'none' }}
                        onClick={toggleDrawer}
                    />
                </HStack>
            </HStack>
            <Drawer isOpen={isDrawerOpen} placement='right' onClose={toggleDrawer}>
                <DrawerOverlay />
                <DrawerContent>
                    <DrawerCloseButton />
                    <DrawerHeader>Menú</DrawerHeader>
                    <DrawerBody>
                        <VStack align='start'>
                            <NavLink icon={<RiHomeLine />} text='Inicio' to='/' />
                            <NavLink icon={<LuMonitor />} text='Productos' to='/products' />
                            <NavLink icon={<DiAptana />} text='Intranet' to='/login' />
                        </VStack>
                    </DrawerBody>
                </DrawerContent>
            </Drawer>
    </>            
    )
    {/* <Drawer size='sm'
                isOpen={isOpen}
                placement='right'
                onClose={onClose}
                finalFocusRef={btnRef}
            >
                <DrawerOverlay />
                <DrawerContent>
                    <DrawerCloseButton />
                    <DrawerHeader>Carrito: {cartProducts.length}</DrawerHeader>

                    <DrawerBody>
                        <VStack>
                            {
                                cartProducts.map(product => (
                                    <HStack w='100%' border='1px solid #eee' p='1em' borderRadius='10px'>
                                        <Image src={product.thumbnail} w='50px' mr='10px' />
                                        <HStack justifyContent='space-between' w='100%'>
                                            <VStack align='start'>
                                                <Text>{product.title}</Text>
                                                <QuantityButton product={product} />
                                            </VStack>

                                            <Button bgColor='red.200' onClick={() => removeProduct(product.id)}>
                                                <MdDelete color='darkred' />
                                            </Button>
                                        </HStack>

                                    </HStack>
                                ))
                            }
                        </VStack>
                    </DrawerBody>

                    <DrawerFooter>
                        <Button variant='outline' mr={3} onClick={onClose}>
                            Cancel
                        </Button>
                        <Button colorScheme='blue' onClick={goToPay}>Comprar</Button>
                    </DrawerFooter>
                </DrawerContent>
            </Drawer> */}


}
export default Navbar