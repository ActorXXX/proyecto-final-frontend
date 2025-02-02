import { useEffect, useState } from 'react';
import { Appwrite } from '../shared/lib/env';
import useAppwrite from '../shared/hooks/useAppwrite';
import {ID} from 'appwrite'
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
  Textarea
} from '@chakra-ui/react';
import { PersonalProduct } from '../shared/declarations/Database';

const CreateProducts = () => {
  const [products, setProducts] = useState<Array<PersonalProduct>>([]);
  const [selectedProduct, setSelectedProduct] = useState<PersonalProduct | null>(null);
  const [newProduct, setNewProduct] = useState<Partial<PersonalProduct>>({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { fromDatabase, fromStorage } = useAppwrite();
  const productsCollection = fromDatabase(Appwrite.databaseId).collection(Appwrite.collections.products);
  const storage = fromStorage();
  // const bucket = storage.bucket(Appwrite.buckets.pictures);

  

  // Obtener productos de la base de datos
  const getProducts = async () => {
    try {
      const response = await productsCollection.getDocuments([]);
      setProducts(response.documents as PersonalProduct[]);
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
      const { $id, name, brand,description, price, active, discount } = updatedProduct;
      const validProductData = { name, brand, description, price, active, discount };

      await productsCollection.updateDocument($id, validProductData);

      alert('Producto actualizado exitosamente.');

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

  // Crear producto
  const createProduct = async () => {
    try {
      setIsLoading(true);
  
      let imageId = '';
      if (newProduct.image) {
        if (!(newProduct.image instanceof File)) {
          throw new Error('El archivo seleccionado no es válido.');
        }
  
        const bucketId = Appwrite.buckets.pictures;
        console.log(bucketId) // Asegúrate de que este valor sea correcto
        if (!bucketId) {
          throw new Error('Bucket ID no está configurado.');
        }
  
        const bucket = storage.bucket(bucketId);
        const fileResponse = await bucket.createFile(ID.unique(), newProduct.image);
  
        imageId = fileResponse.$id;
      }
  
      const productData = {
        name: newProduct.name || '',
        brand: newProduct.brand || '',
        description: newProduct.description || '',
        price: Number(newProduct.price) || 0,
        active: Boolean(newProduct.active) || false,
        discount:Boolean(newProduct.discount) || false,
        imageId,
      };
  
      const response = await productsCollection.createDocument(productData);
  
      alert('Producto creado exitosamente.');
      setProducts((prevProducts) => [...prevProducts, response as PersonalProduct]);
      setIsCreateModalOpen(false);
      setNewProduct({});
    } catch (error) {
      console.error('Error al crear el producto:', error);
      alert('Hubo un error al crear el producto.');
    } finally {
      setIsLoading(false);
    }
  };
  

  useEffect(() => {
    getProducts();
  }, []);

  return (
    <>
      <Box display="flex" flexDirection="column" width={[300, 450, 700, 900]} m={['0 auto', '0 auto', '0 auto']}>
        <Text fontSize="3xl" textAlign="center" mt="10px" mb="10px" fontWeight="bold">
          Administrar Productos
        </Text>
        <Button colorScheme="green" width={'full'} onClick={() => setIsCreateModalOpen(true)}>
          Agregar Producto
        </Button>
      </Box>

      <List margin='0 auto' mt="5" width="100%" w={[300, 450, 700, 900]}>
        {products.map((p) => (
          <ListItem display={'flex'} key={p.$id} p={0} borderWidth="1px" >
            <Box borderWidth="1px" minWidth={'100px'} alignContent='center'>
            {p.imageId && (
                <Img
                  src={`https://cloud.appwrite.io/v1/storage/buckets/${Appwrite.buckets.pictures}/files/${p.imageId}/view?project=${Appwrite.projectId}`}
                  alt={p.name}
                  width='full'
                  height='100px'
                  objectFit='cover'
                  border='1px'
                  
              />
            )}
            </Box>
            <Box display='flex' justifyContent='space-evenly' width='100%'>
              <Box borderWidth="1px" p="5px" width='100%'>
                <Text fontSize="md" fontWeight="bold">{p.name}</Text>
                <Text>Marca: {p.brand}</Text>
                <Text>Precio: ${p.price}</Text>
                <Textarea variant="flushed" value={p.description}></Textarea>
              </Box>
            </Box>
            <Box borderWidth="1px" p="5px" minWidth='118px'>
              <Text>Activo: {p.active ? 'Sí' : 'No'}</Text>
              <Text>Descuento: {p.discount ? 'Sí' : 'No'}</Text>
              <Box mt={2} display="flex" flexWrap='wrap' gap={2}>
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

          </ListItem>
        ))}
      </List>

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
                <Checkbox
                  bgColor="gray"
                  type="checkbox"
                  isChecked={selectedProduct.active}
                  onChange={(e) =>
                    setSelectedProduct({ ...selectedProduct, active: e.target.checked })
                  }
                />
              </FormControl>
              <FormControl mb={4}>
                <FormLabel>Descuento</FormLabel>
                <Checkbox
                  bgColor="gray"
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

      {/* Modal para crear producto */}
      <Modal isOpen={isCreateModalOpen} onClose={() => setIsCreateModalOpen(false)}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Crear Producto</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl mb={4}>
              <FormLabel>Nombre</FormLabel>
              <Input
                value={newProduct.name || ''}
                onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
              />
            </FormControl>

            <FormControl mb={4}>
              <FormLabel>Marca</FormLabel>
              <Input
                value={newProduct.brand || ''}
                onChange={(e) => setNewProduct({ ...newProduct, brand: e.target.value })}
              />              
            </FormControl>

            <FormControl mb={4}>
              <FormLabel>Precio</FormLabel>
              <Input
                type="number"
                value={newProduct.price || ''}
                onChange={(e) => setNewProduct({ ...newProduct, price: Number(e.target.value) })}
              />
            </FormControl>

            <FormControl mb={4}>
              <FormLabel>Descripción</FormLabel>
              <Input
                value={newProduct.description || ''}
                onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}
              />              
            </FormControl>
            
            <FormControl mb={4}>
              <FormLabel>Activo</FormLabel>
              <Checkbox
                type="checkbox"
                isChecked={newProduct.active || false}
                onChange={(e) => setNewProduct({ ...newProduct, active: e.target.checked })}
              />
            </FormControl>
            <FormControl mb={4}>
              <FormLabel>Descuento</FormLabel>
              <Checkbox
                type="checkbox"
                isChecked={newProduct.discount || false}
                onChange={(e) => setNewProduct({ ...newProduct, discount: e.target.checked })}
              />
            </FormControl>
            <FormControl mb={4}>
              <FormLabel>Imagen</FormLabel>
              <Input
                type="file"
                accept = "image/*"
                onChange={(e) => setNewProduct({ ...newProduct, image: e.target.files?.[0] })}
                
              />
            </FormControl>
          </ModalBody>
          <ModalFooter>
            <Button
              colorScheme="green"
              mr={3}
              onClick={createProduct}
              isLoading={isLoading}
            >
              Crear Producto
            </Button>
            <Button variant="ghost" onClick={() => setIsCreateModalOpen(false)}>
              Cancelar
            </Button>
            </ModalFooter>
        </ModalContent>
      </Modal>
      
      {/* GRILLA ALTERNATIVA */}





    </>
  );
};

export default CreateProducts;