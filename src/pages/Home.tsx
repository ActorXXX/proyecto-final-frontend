
import { Box, Center, HStack, Image, Text } from "@chakra-ui/react"
import Carousel from "@components/Carousel"
import BaseLayout from "@layouts/BaseLayout"

import beneficio1 from '@images/beneficio1.webp'
import beneficio2 from '@images/beneficio2.webp'
import beneficio3 from '@images/beneficio3.webp'
import DummyProducts from "@components/DummyProducto"

const Home = () => {

  return (
    <BaseLayout>
        <>
            <Box id='fresa' width={[300, 450, 700, 1200]} m={['0 auto', '0 auto', '0 auto']}>
                <Carousel />
            </Box>
            <Box display='flex' flexDirection={'column'} width={[300, 450, 700, 1200]} m={['0 auto', '0 auto', '0 auto']} >
                <Text fontSize={"4xl"} textAlign={'center'} mt={'1em'} mb={'1em'} fontWeight={'bold'}>Nuestros Beneficios</Text>
                <HStack justifyContent={'space-around'} mt={'1em'} mb={'1em'}>
                    <HStack>
                        <Image src={beneficio1} width={[100, 140, 220, 380]}></Image>
                    </HStack>
                    <HStack>
                        <Image src={beneficio2} width={[100, 140, 220, 380]}></Image>
                    </HStack>
                    <HStack>
                        <Image src={beneficio3} width={[100, 140, 220, 380]}></Image>
                    </HStack>
                </HStack>
            </Box>
            <Box  display='flex' justifyContent='center'flexWrap='wrap' m={['0 auto', '0 auto', '0 auto']}  gap='1em' w={[300, 450, 700, 1200]} >
                <DummyProducts />                
            </Box>
        </>
    </BaseLayout>
  
)
}

export default Home