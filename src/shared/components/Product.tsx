import { Box, Button, Center, Heading, Image, Link, Text } from '@chakra-ui/react'
import { PersonalProduct } from '../declarations/Database'
import { Appwrite } from '../lib/env'

const Product = ({ product }: { product: PersonalProduct
    
 }) => {
    return (
        <>
            <Box w='380px' h='420px' bgColor='#eee' borderRadius='20px' p='1em' display='flex' justifyContent='space-between' flexDir='column' gap='1em'  m={['0 auto', '0 auto', '0 auto']} textAlign="center" >
                <Image src={`https://cloud.appwrite.io/v1/storage/buckets/${Appwrite.buckets.pictures}/files/${product.imageId}/view?project=${Appwrite.projectId}`} alt={product.description} loading='lazy' w='300px' h='250' borderRadius='2em' textAlign='center'/>
                <Heading size='md'>
                    <Link href={`/products/${product.$id}`}>{product.name}</Link>
                </Heading>
                <Text>$ {product.price}</Text>
                <Button>Agregar al carrito</Button>
            </Box>
        </>
    )
}

export default Product