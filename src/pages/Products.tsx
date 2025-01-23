import useAppwrite from "@hooks/useAppwrite";
import BaseLayout from "@layouts/BaseLayout";
import { Query } from "appwrite";
import DummyProducts from "@components/DummyProducto";
import { useEffect, useState } from "react";
import { PersonalProduct } from "src/shared/declarations/Database";
import { Appwrite } from "../shared/lib/env";
import { Box, Button, Text } from "@chakra-ui/react";

const Products = () => {
  const [appwriteProducts, setAppwriteProducts] = useState<Array<PersonalProduct>>([]);
  const [filter, setFilter] = useState<"all" | "discounted" | "noDiscount">("all"); // Estado del filtro actual
  const [isLoading, setIsLoading] = useState<boolean>(false); // Estado de carga

  const { fromDatabase } = useAppwrite();
  const productsCollection = fromDatabase(Appwrite.databaseId).collection(Appwrite.collections.products);

  // Función para obtener productos desde Appwrite según el filtro
  const getProductsFromAppwrite = async (filter: "all" | "discounted" | "noDiscount") => {
    try {
      setIsLoading(true); // Activar estado de carga
      let documents;

      if (filter === "all") {
        // Obtener todos los productos
        const response = await productsCollection.getDocuments();
        documents = response.documents;
      } else if (filter === "discounted") {
        // Obtener productos con descuento
        const response = await productsCollection.getDocuments([
          Query.equal("discount", true),
        ]);
        documents = response.documents;
      } else if (filter === "noDiscount") {
        // Obtener productos sin descuento
        const response = await productsCollection.getDocuments([
          Query.equal("discount", false),
        ]);
        documents = response.documents;
      }

      setAppwriteProducts(documents);
      console.log(`Productos obtenidos (${filter}):`, documents);
    } catch (error) {
      console.error("Error al obtener los productos:", error);
    } finally {
      setIsLoading(false); // Desactivar estado de carga
    }
  };

  // Llamar a la función al cambiar el filtro
  useEffect(() => {
    getProductsFromAppwrite(filter);
  }, [filter]);

  return (
    <BaseLayout>
      <>
        {/* Botones para alternar entre los filtros */}
        <Box display="flex" justifyContent="center" marginBottom="2em">
          <Button
            colorScheme="teal"
            onClick={() => setFilter("all")}
            isActive={filter === "all"}
            marginRight="1em"
          >
            Mostrar todos
          </Button>
          <Button
            colorScheme="teal"
            onClick={() => setFilter("discounted")}
            isActive={filter === "discounted"}
            marginRight="1em"
          >
            Mostrar con descuento
          </Button>
          <Button
            colorScheme="teal"
            onClick={() => setFilter("noDiscount")}
            isActive={filter === "noDiscount"}
          >
            Mostrar sin descuento
          </Button>
        </Box>

        {/* Mostrar estado de carga o productos */}
        {isLoading ? (
          <Text textAlign="center" fontSize="xl" fontWeight="bold">
            Cargando productos...
          </Text>
        ) : (
          <Box display="flex" flexWrap="wrap" w="65%" m="0 auto" justifyContent="space-between" gap="3em">
            {appwriteProducts.length > 0 ? (
              appwriteProducts.map((product) => (
                <DummyProducts key={product.id} product={product} />
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
