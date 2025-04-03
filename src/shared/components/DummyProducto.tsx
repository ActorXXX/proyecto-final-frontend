import { useEffect, useState } from "react";
import { Box, HStack, Image, Text, Spinner, Button } from "@chakra-ui/react";
import Product from "@components/Product";
import { getProducts } from "../lib/api"; // Importación de la API

const Home = () => {
  const [products, setProducts] = useState([]); // Estado para productos
  const [isLoading, setIsLoading] = useState(true); // Estado de carga
  const [filter, setFilter] = useState("all"); // Estado del filtro

  // Obtener productos según el filtro
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setIsLoading(true);

        let filteredProducts = await getProducts();

        // Filtrar según el estado "filter"
        if (filter === "discounted") {
          filteredProducts = filteredProducts.filter(p => p.discount == true);
        } else if (filter === "noDiscount") {
          filteredProducts = filteredProducts.filter(p => p.discount == false);
        }

        setProducts(filteredProducts);
      } catch (error) {
        console.error("Error al obtener productos:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, [filter]); // Se ejecuta cada vez que cambia el filtro

  return (    
      <>
        {/* Botones para filtrar productos */}
        <HStack justifyContent="center" mt={4} mb={4}>
          <Button colorScheme="teal" onClick={() => setFilter("all")} isActive={filter === "all"} mt={4}>Mostrar Todos</Button>
          <Button colorScheme="teal" onClick={() => setFilter("discounted")} isActive={filter === "discounted"}>Mostrar con Descuento</Button>
          <Button colorScheme="teal" onClick={() => setFilter("noDiscount")} isActive={filter === "noDiscount"}>Mostrar sin Descuento</Button>
        </HStack>

        {/* Mostrar productos filtrados */}
        <Box display='flex' justifyContent='center' flexWrap='wrap' m={['0 auto', '0 auto', '0 auto']} gap='1em' w={[300, 450, 700, 900]}>
          <{isLoading ? (
            <Spinner size="xl" />
          ) : (
            products.length > 0 ? (
              products.map((product) => <Product key={product.id} product={product} />)
            ) : (
              <Text textAlign="center" fontSize="xl" fontWeight="bold" w="100%">
                No hay productos disponibles.
              </Text>
            )
          )}>
        </Box>
      </>
    
  );
};

export default Home;

