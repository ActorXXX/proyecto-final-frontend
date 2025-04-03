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

  const editProduct = async (updatedProduct) => {
    try {
      setIsLoading(true);
      console.log("Enviando producto actualizado:", updatedProduct);
  
      const response = await fetch(`${API_URL}/${updatedProduct.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedProduct),
      });
  
      console.log("Código de respuesta:", response.status);
      const responseData = await response.text();
      console.log("Respuesta del servidor:", responseData);
  
      if (!response.ok) throw new Error(`Error al actualizar el producto: ${response.status}`);
  
      const data = JSON.parse(responseData);
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
      const productToSend = {
        ...newProduct,
        discount: !!newProduct.discount // Asegura que sea true o false
      };      
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json',
                  'Authorization': `Bearer ${localStorage.getItem('token')}`
         },
        body: JSON.stringify(productToSend),
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
      <Button onClick={() => setIsCreateModalOpen(true)} ml={600} mr={600} mt={5} mb={5}>Agregar Producto</Button>
      <List>
  {products.map((p) => (
    <ListItem 
      key={p.id} 
      p={4} 
      border="1px solid #ccc" 
      borderRadius="md" 
      mb={5}
      ml={200}
      mr={200}
      display="flex"
      alignItems="center"
      gap={4}
    >
      {/* Imagen del producto */}
      {p.imageId && (
        <Img 
          src={`${p.imageId}`} 
          alt={p.name} 
          boxSize="100px" 
          objectFit="cover"
        />
      )}

      {/* Información del producto */}
      <Box flex="1">
        <Text fontSize="lg" fontWeight="bold">{p.name}</Text>
        <Text fontSize="md" color="gray.600">{p.description}</Text>
        <Text fontSize="lg" color="teal.500">${p.price}</Text>
        {p.discount && (
          <Text fontSize="sm" color="red.500">¡En Descuento!</Text>
        )}
      </Box>

      {/* Botones de acción */}
      <Flex gap={2}>
        <IconButton 
          icon={<BiPencil />} 
          onClick={() => { setSelectedProduct(p); setIsModalOpen(true); }} 
          aria-label="Editar"
        />
        <IconButton 
          icon={<BiTrash />} 
          onClick={() => deleteProduct(p.id)} 
          aria-label="Eliminar"
        />
      </Flex>
    </ListItem>
  ))}
</List>

{selectedProduct && (
  <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
    <ModalOverlay />
    <ModalContent>
      <ModalHeader>Editar Producto</ModalHeader>
      <ModalCloseButton />
      <ModalBody>
        {/* Nombre */}
        <FormControl>
          <FormLabel>Nombre</FormLabel>
          <Input 
            value={selectedProduct.name} 
            onChange={(e) => setSelectedProduct({ ...selectedProduct, name: e.target.value })} 
          />
        </FormControl>

        {/* Descripción */}
        <FormControl mt={2}>
          <FormLabel>Descripción</FormLabel>
          <Textarea 
            value={selectedProduct.description || ""} 
            onChange={(e) => setSelectedProduct({ ...selectedProduct, description: e.target.value })} 
          />
        </FormControl>

        {/* Precio */}
        <FormControl mt={2}>
          <FormLabel>Precio</FormLabel>
          <Input 
            type="number" 
            value={selectedProduct.price || 0} 
            onChange={(e) => setSelectedProduct({ ...selectedProduct, price: parseFloat(e.target.value) })} 
          />
        </FormControl>

        {/* Checkbox de Descuento */}
        <FormControl mt={2} display="flex" alignItems="center">
          <Checkbox 
            isChecked={selectedProduct.discount} 
            onChange={(e) => setSelectedProduct({ ...selectedProduct, discount: e.target.checked })} 
          >
            Tiene descuento
          </Checkbox>
        </FormControl>
      </ModalBody>

      <ModalFooter>
        <Button 
          colorScheme="blue" 
          onClick={() => editProduct(selectedProduct)} 
          isLoading={isLoading}
        >
          Guardar Cambios
        </Button>
      </ModalFooter>
    </ModalContent>
  </Modal>
)}{/* Modal para crear */}
<Modal isOpen={isCreateModalOpen} onClose={() => setIsCreateModalOpen(false)}>
  <ModalOverlay />
  <ModalContent>
    <ModalHeader>Crear Producto</ModalHeader>
    <ModalCloseButton />
    <ModalBody>
      {/* Nombre */}
      <FormControl>
        <FormLabel>Nombre</FormLabel>
        <Input
          value={newProduct.name || ''}
          onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
        />
      </FormControl>

      {/* Marca */}
      <FormControl mt={2}>
        <FormLabel>Marca</FormLabel>
        <Input
          value={newProduct.brand || ''}
          onChange={(e) => setNewProduct({ ...newProduct, brand: e.target.value })}
        />
      </FormControl>

      {/* Precio */}
      <FormControl mt={2}>
        <FormLabel>Precio</FormLabel>
        <Input
          type="number"
          value={newProduct.price || ''}
          onChange={(e) => setNewProduct({ ...newProduct, price: parseFloat(e.target.value) })}
        />
      </FormControl>

      {/* Descripción */}
      <FormControl mt={2}>
        <FormLabel>Descripción</FormLabel>
        <Textarea
          value={newProduct.description || ''}
          onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}
        />
      </FormControl>

      {/* Activo */}
      <FormControl mt={2} display="flex" alignItems="center">
        <Checkbox
          isChecked={newProduct.active || false}
          onChange={(e) => setNewProduct({ ...newProduct, active: e.target.checked })}
        >
          Producto activo
        </Checkbox>
      </FormControl>

      {/* Descuento */}
      <FormControl mt={2} display="flex" alignItems="center">
        <Checkbox
          isChecked={newProduct.discount || false }
          onChange={(e) => setNewProduct({ ...newProduct, discount: e.target.checked })}
        >
          Tiene descuento
        </Checkbox>
      </FormControl>

      {/* Imagen (URL) */}
      <FormControl mt={2}>
        <FormLabel>Imagen URL</FormLabel>
        <Input
          value={newProduct.imageId || ''}
          onChange={(e) => setNewProduct({ ...newProduct, imageId: e.target.value })}
        />
      </FormControl>
    </ModalBody>
    <ModalFooter>
      <Button colorScheme="blue" onClick={createProduct} isLoading={isLoading}>
        Crear
      </Button>
    </ModalFooter>
  </ModalContent>
</Modal>

    </Box>
  );
};

export default CreateProducts;
