
import { Box, Center, HStack, Image, Text } from "@chakra-ui/react"
import Carousel from "@components/Carousel"
import BaseLayout from "@layouts/BaseLayout"

import beneficio1 from '@images/beneficio1.webp'
import beneficio2 from '@images/beneficio2.webp'
import beneficio3 from '@images/beneficio3.webp'
import { px } from "framer-motion"
import { useEffect, useState } from "react"
import useAppwrite from "@hooks/useAppwrite"
import { Appwrite } from "../shared/lib/env"

const Home = () => {

  const [products, setProducts] = useState([]);
  const { fromDatabase } = useAppwrite();
  const productsCollection = fromDatabase(Appwrite.databaseId).collection(Appwrite.collections.products);

  const fetchProducts = async () => {
    try {
      const response = await productsCollection.getDocuments();
      console.log("productos obtenidos:",response)
      setProducts(response);
    } catch (error) {
      console.error("Error al obtener los productos:", error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <BaseLayout>
        <>
            <Box id='fresa' width={[300, 450, 700, 1200]} m={['0 auto', '0 auto', '0 auto']}>
                <Carousel />
            </Box>
            <Box display='flex' flexDirection={'column'} width={[300, 450, 700, 1200]} m={['0 auto', '0 auto', '0 auto']}>
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
            <Box justifyContent='center' display='flex' flexWrap='wrap' w={['80%', '90%']} m='0 auto' gap='2em'>
                            
            {products.length >= 0 ? (
                products.map((product: any) => (
                <Box key={product.$id} borderWidth="1px" borderRadius="lg" overflow="hidden" p="4" textAlign="center">
                    <Image
                    src={`https://cloud.appwrite.io/v1/storage/buckets/${Appwrite.buckets.pictures}/files/${product.imageId}/preview`}
                    alt={product.name}
                    borderRadius="md"
                    />
                    <Text fontSize="xl" fontWeight="bold" mt="2">
                    {product.name}
                    </Text>
                    <Text fontSize="md" color="gray.600">
                    {product.description}
                    </Text>
                    <Text fontSize="lg" color="teal.500" mt="2">
                    ${product.price}
                    </Text>
                </Box>
                ))
            ) : (
                <Text>No hay productos disponibles.</Text>
            )}
            </Box>
                


        </>
    </BaseLayout>
)
}

export default Home