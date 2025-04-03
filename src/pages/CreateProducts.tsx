import { useEffect, useState } from 'react';
import {
  Box,
  Button,
  Text,
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
  Checkbox,
  List,
  ListItem,
  Img,
  Textarea,
  Flex,
  IconButton,
} from '@chakra-ui/react';
import { BiPencil, BiTrash } from "react-icons/bi";

const API_URL = "http://localhost:5000/api/products";

const CreateProducts = () => {
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [newProduct, setNewProduct] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Obtener productos de la API
  const getProducts = async () => {
    try {
      const response = await fetch(API_URL);
      const data = await response.json();
      setProducts(data);
    } catch (error) {
      console.error('Error al cargar productos:', error);
    }
  };

  // Eliminar producto
  const deleteProduct = async (productId) => {
    try {
      setIsLoading(true);
      await fetch(`${API_URL}/${productId}`, { method: 'DELETE' });
      setProducts((prev) => prev.filter((p) => p.id !== productId));
    } catch (error) {
      console.error('Error al eliminar el producto:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // Editar producto
  const editProduct = async (updatedProduct) => {
    try {
      setIsLoading(true);
      const response = await fetch(`${API_URL}/${updatedProduct.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedProduct),
      });
      const data = await response.json();
      setProducts((prev) => prev.map((p) => (p.id === data.id ? data : p)));
      setIsModalOpen(false);
    } catch (error) {
      console.error('Error al actualizar el producto:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // Crear producto
  const createProduct = async () => {
    try {
      setIsLoading(true);
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newProduct),
      });
      const data = await response.json();
      setProducts((prev) => [...prev, data]);
      setIsCreateModalOpen(false);
      setNewProduct({});
    } catch (error) {
      console.error('Error al crear el producto:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getProducts();
  }, []);

  return (
    <Box>
      <Button onClick={() => setIsCreateModalOpen(true)}>Agregar Producto</Button>
      <List>
        {products.map((p) => (
          <ListItem key={p.id}>
            <Text>{p.name} - ${p.price}</Text>
            <IconButton icon={<BiPencil />} onClick={() => { setSelectedProduct(p); setIsModalOpen(true); }} />
            <IconButton icon={<BiTrash />} onClick={() => deleteProduct(p.id)} />
          </ListItem>
        ))}
      </List>

      {/* Modal para editar */}
      {selectedProduct && (
        <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Editar Producto</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <FormControl>
                <FormLabel>Nombre</FormLabel>
                <Input value={selectedProduct.name} onChange={(e) => setSelectedProduct({ ...selectedProduct, name: e.target.value })} />
              </FormControl>
            </ModalBody>
            <ModalFooter>
              <Button onClick={() => editProduct(selectedProduct)}>Guardar</Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      )}

      {/* Modal para crear */}
      <Modal isOpen={isCreateModalOpen} onClose={() => setIsCreateModalOpen(false)}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Crear Producto</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl>
              <FormLabel>Nombre</FormLabel>
              <Input value={newProduct.name || ''} onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })} />
            </FormControl>
          </ModalBody>
          <ModalFooter>
            <Button onClick={createProduct}>Crear</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default CreateProducts;
