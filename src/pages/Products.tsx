import useAppwrite from "@hooks/useAppwrite";
import BaseLayout from "@layouts/BaseLayout";
import { Query } from "appwrite";
// import DummyProducts from "@components/DummyProducto";
import { useEffect, useState } from "react";
import { PersonalProduct } from "src/shared/declarations/Database";
import { Appwrite } from "../shared/lib/env";
import { Box, Button, Text } from "@chakra-ui/react";
import Product from "@components/Product";

const Products = () => {
  const [appwriteProducts, setAppwriteProducts] = useState<Array<PersonalProduct>>([]);
  const [filter, setFilter] = useState<"all" | "discounted" | "noDiscount">("all");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const { fromDatabase } = useAppwrite();
  const productsCollection = fromDatabase(Appwrite.databaseId).collection(Appwrite.collections.products);

  const getProductsFromAppwrite = async (filter: "all" | "discounted" | "noDiscount") => {
    try {
      setIsLoading(true);
      let documents: PersonalProduct[] = [];

      if (filter === "all") {
        const response = await productsCollection.getDocuments();
        documents = response.documents as PersonalProduct[];
      } else if (filter === "discounted") {
        const response = await productsCollection.getDocuments([
          Query.equal("discount", true),
        ]);
        documents = response.documents as PersonalProduct[];
      } else if (filter === "noDiscount") {
        const response = await productsCollection.getDocuments([
          Query.equal("discount", false),
        ]);
        documents = response.documents as PersonalProduct[];
        console.log(filter)
      }

      setAppwriteProducts(documents);
      console.log(`Productos obtenidos (${filter}):`, documents);
    } catch (error) {
      console.error("Error al obtener los productos:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getProductsFromAppwrite(filter);
  }, [filter]); // Solo se ejecuta cuando el filtro cambia

  return (
    <BaseLayout>
      <>
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

        {isLoading ? (
          <Text textAlign="center" fontSize="xl" fontWeight="bold">
            Cargando productos...
          </Text>
        ) : (
          <Box display="flex" flexWrap="wrap" w={[300, 450, 700, 900]} m="0 auto" justifyContent="space-between" gap="2em">
            {appwriteProducts.length > 0 ? (
              appwriteProducts.map((product) => (
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