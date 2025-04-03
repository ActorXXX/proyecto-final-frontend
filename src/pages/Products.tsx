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
import BaseLayout from '@layouts/BaseLayout';

const API_URL = "http://localhost:5000/api/products";

const Products = () => {
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
  useEffect(() => {
    getProducts();
  }, []);

  return (
    
  
      <>
        <Box>
          <List mt={5}>
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

          
        </ListItem>
      ))}
    </List>

    

    </Box>
    </>
  );
};

export default Products;




