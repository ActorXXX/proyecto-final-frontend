import BaseLayout from "@layouts/BaseLayout";
import { useEffect, useState } from "react";
import { Box, Button, Text } from "@chakra-ui/react";
import Product from "@components/Product";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [filter, setFilter] = useState("all");
  const [isLoading, setIsLoading] = useState(false);

  const getProducts = async (filter) => {
    try {
      setIsLoading(true);
      let url = "/api/products";
      if (filter === "discounted") {
        url += "?discount=true";
      } else if (filter === "noDiscount") {
        url += "?discount=false";
      }
      
      const response = await fetch(url, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      
      if (!response.ok) throw new Error("Error al obtener los productos");
      const data = await response.json();
      setProducts(data);
    } catch (error) {
      console.error("Error al obtener los productos:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getProducts(filter);
  }, [filter]);

  return (
    <BaseLayout>
      <>
        <Box display="flex" justifyContent="center" marginBottom="2em">
          <Button colorScheme="teal" onClick={() => setFilter("all")} isActive={filter === "all"} marginRight="1em">
            Mostrar todos
          </Button>
          <Button colorScheme="teal" onClick={() => setFilter("discounted")} isActive={filter === "discounted"} marginRight="1em">
            Mostrar con descuento
          </Button>
          <Button colorScheme="teal" onClick={() => setFilter("noDiscount")} isActive={filter === "noDiscount"}>
            Mostrar sin descuento
          </Button>
        </Box>

        {isLoading ? (
          <Text textAlign="center" fontSize="xl" fontWeight="bold">
            Cargando productos...
          </Text>
        ) : (
          <Box display="flex" flexWrap="wrap" w={[300, 450, 700, 900]} m="0 auto" justifyContent="space-between" gap="2em">
            {products.length > 0 ? (
              products.map((product) => (
                <Product key={product.id} product={product} />
              ))
            ) : (
              <Text textAlign="center" fontSize="xl" fontWeight="bold" w="100%">
                No hay productos disponibles para este filtro.
              </Text>
            )}
          </Box>
        )}
      </>
    </BaseLayout>
  );
};

export default Products;
