import { useEffect, useState } from "react";
import { Box, HStack, Image, Text, Spinner } from "@chakra-ui/react";
import Carousel from "@components/Carousel";
import BaseLayout from "@layouts/BaseLayout";
import Product from "@components/Product";
import { getProducts } from "../lib/api";  // Suponiendo que tienes esta función de la API

import beneficio1 from '@images/beneficio1.webp'
import beneficio2 from '@images/beneficio2.webp'
import beneficio3 from '@images/beneficio3.webp'

const Home = () => {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Obtener productos reales desde la API
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await getProducts();
        setProducts(data); // Establece los productos obtenidos
      } catch (error) {
        console.error("Error al obtener productos:", error);
      } finally {
        setIsLoading(false); // Se terminó la carga
      }
    };
    fetchProducts();
  }, []);

  return (
    <BaseLayout>
      <>
        <Box id='fresa' width={'full'} m={['0 auto', '0 auto', '0 auto']} height={'full'}>
          <Carousel />
        </Box>
        <Box display='flex' flexDirection={'column'} width={[300, 450, 700, 900]} m={['0 auto', '0 auto', '0 auto']}>
          <Text fontSize={"4xl"} textAlign={'center'} mt={'1em'} mb={'1em'} fontWeight={'bold'}>Nuestros Beneficios</Text>
          <HStack justifyContent={'space-around'} mt={'1em'} mb={'1em'}>
            <HStack>
              <Image src={beneficio1} width={[100, 140, 220, 380]} />
            </HStack>
            <HStack>
              <Image src={beneficio2} width={[100, 140, 220, 380]} />
            </HStack>
            <HStack>
              <Image src={beneficio3} width={[100, 140, 220, 380]} />
            </HStack>
          </HStack>
        </Box>

        {/* Mostrar los productos cargados desde la API */}
        <Box display='flex' justifyContent='center' flexWrap='wrap' m={['0 auto', '0 auto', '0 auto']} gap='1em' w={[300, 450, 700, 900]}>
          {isLoading ? (
            <Spinner size="xl" />
          ) : (
            products.length > 0 ? (
              products.map((product) => <Product key={product.id} product={product} />)
            ) : (
              <Text textAlign="center" fontSize="xl" fontWeight="bold" w="100%">
                No hay productos disponibles.
              </Text>
            )
          )}
        </Box>
      </>
    </BaseLayout>
  );
};

export default Home;
