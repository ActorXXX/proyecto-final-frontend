import { useEffect, useState } from 'react';
import { Appwrite } from '../shared/lib/env';
import useAppwrite from '@hooks/useAppwrite';
import {
  Box,
  Button,
  Text,
  VStack,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Input,
  FormControl,
  FormLabel,
} from '@chakra-ui/react';
import { PersonalProduct } from '../shared/declarations/Database';

const CreateProducts = () => {
  const [products, setProducts] = useState<Array<PersonalProduct>>([]);
  const [selectedProduct, setSelectedProduct] = useState<PersonalProduct | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { fromDatabase } = useAppwrite();
  const productsCollection = fromDatabase(Appwrite.databaseId).collection(Appwrite.collections.products);

  // Obtener productos de la base de datos
  const getProducts = async () => {
    try {
      const response = await productsCollection.getDocuments([]);
      setProducts(response.documents);
    } catch (error) {
      console.error('Error al cargar productos:', error);
    }
  };

  // Eliminar producto
  const deleteProduct = async (productId: string) => {
    try {
      setIsLoading(true);
      await productsCollection.deleteDocument(productId);
      alert('Producto eliminado exitosamente.');
      setProducts((prevProducts) => prevProducts.filter((p) => p.$id !== productId));
    } catch (error) {
      console.error('Error al eliminar el producto:', error);
      alert('Hubo un error al eliminar el producto.');
    } finally {
      setIsLoading(false);
    }
  };

  // Editar producto
  const editProduct = async (updatedProduct: PersonalProduct) => {
    try {
      setIsLoading(true);
  
      // Crear un objeto con los atributos válidos para la actualización
      const { $id, name, description, price, active, discount } = updatedProduct;
      const validProductData = { name, description, price, active, discount };
  
      // Enviar los datos filtrados a Appwrite
      await productsCollection.updateDocument($id, validProductData);
  
      alert('Producto actualizado exitosamente.');
  
      // Actualizar el estado local con el producto modificado
      setProducts((prevProducts) =>
        prevProducts.map((p) => (p.$id === $id ? { ...p, ...validProductData } : p))
      );
  
      setIsModalOpen(false);
    } catch (error) {
      console.error('Error al actualizar el producto:', error);
      alert('Hubo un error al actualizar el producto.');
    } finally {
      setIsLoading(false);
    }
  };
  

  useEffect(() => {
    getProducts();
  }, []);

  return (
    <>
      <Box display="flex" flexDirection="column" width={[300, 450, 700, 1200]} m={['0 auto', '0 auto', '0 auto']}>
        <Text fontSize="4xl" textAlign="center" mt="1em" mb="1em" fontWeight="bold">
          Administrar Productos
        </Text>
      </Box>

      <VStack spacing={4}>
        {products.map((p) => (
          <Box key={p.$id} p={4} borderWidth="1px" borderRadius="md" width="100%">
            <Text fontSize="lg" fontWeight="bold">
              {p.name}
            </Text>
            <Text>Precio: ${p.price}</Text>
            <Text>Descripción: {p.description}</Text>
            <Box mt={2} display="flex" gap={2}>
              <Button
                colorScheme="blue"
                size="sm"
                onClick={() => {
                  setSelectedProduct(p);
                  setIsModalOpen(true);
                }}
              >
                Editar
              </Button>
              <Button
                colorScheme="red"
                size="sm"
                onClick={() => deleteProduct(p.$id)}
                isLoading={isLoading}
              >
                Eliminar
              </Button>
            </Box>
          </Box>
        ))}
      </VStack>

      {/* Modal para editar producto */}
      {selectedProduct && (
        <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Editar Producto</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <FormControl mb={4}>
                <FormLabel>Nombre</FormLabel>
                <Input
                  value={selectedProduct.name}
                  onChange={(e) =>
                    setSelectedProduct({ ...selectedProduct, name: e.target.value })
                  }
                />
              </FormControl>
              <FormControl mb={4}>
                <FormLabel>Precio</FormLabel>
                <Input
                  type="number"
                  value={selectedProduct.price}
                  onChange={(e) =>
                    setSelectedProduct({ ...selectedProduct, price: parseFloat(e.target.value) })
                  }
                />
              </FormControl>
              <FormControl mb={4}>
                <FormLabel>Descripción</FormLabel>
                <Input
                  value={selectedProduct.description}
                  onChange={(e) =>
                    setSelectedProduct({ ...selectedProduct, description: e.target.value })
                  }
                />
              </FormControl>
              <FormControl mb={4}>
                <FormLabel>Activo</FormLabel>
                <Input
                  type="checkbox"
                  isChecked={selectedProduct.active}
                  onChange={(e) =>
                    setSelectedProduct({ ...selectedProduct, active: e.target.checked })
                  }
                />
              </FormControl>
              <FormControl mb={4}>
                <FormLabel>Descuento</FormLabel>
                <Input
                  type="checkbox"
                  isChecked={selectedProduct.discount}
                  onChange={(e) =>
                    setSelectedProduct({ ...selectedProduct, discount: e.target.checked })
                  }
                />
              </FormControl>
            </ModalBody>
            <ModalFooter>
              <Button
                colorScheme="blue"
                mr={3}
                onClick={() => editProduct(selectedProduct)}
                isLoading={isLoading}
              >
                Guardar Cambios
              </Button>
              <Button variant="ghost" onClick={() => setIsModalOpen(false)}>
                Cancelar
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      )}
    </>
  );
};

export default CreateProducts;
