import { Box, Button, Heading, Image, Link, Text } from '@chakra-ui/react'
import { PersonalProduct } from '../declarations/Database'

const Product = ({ product }: { product: PersonalProduct
    
 }) => {
    return (
        <>
            <Box w='300px' bgColor='#eee' borderRadius='20px' p='2em' display='flex' justifyContent='space-between' flexDir='column' gap='1em'>
                <Image src={product.thumbnail} alt={product.description} loading='lazy' />
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