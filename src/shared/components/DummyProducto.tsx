import { useEffect, useState } from 'react'
import { Appwrite } from '../lib/env'
import useAppwrite from '@hooks/useAppwrite'
import Product from './Product'
import { PersonalProduct } from '../declarations/Database'
import { Box, Text } from '@chakra-ui/react'


const DummyProducts = () => {
    const [products, setProducts] = useState<Array<PersonalProduct>>([])
    const { fromDatabase } = useAppwrite()
    const productsCollection = fromDatabase(Appwrite.databaseId).collection(Appwrite.collections.products)

    const getProducts = async () => {
        try {
            const response = await productsCollection.getDocuments([])
            setProducts(response.documents as PersonalProduct[]);
            
            console.log(products)
            
        }catch(error){
            console.error(error);
       }
    }

     useEffect(() => {
         getProducts()
     }, [])

    return (
        <>
        <Box display='flex' flexDirection={'column'} width={[300, 450, 700, 1200]} m={['0 auto', '0 auto', '0 auto']}>
          <Text fontSize={"4xl"} textAlign={'center'} mt={'1em'} mb={'1em'} fontWeight={'bold'}>Nuestros Ofertas</Text>
        </Box>
        
        {
            products && products.filter(p=> p.discount).map((p)  => (
                <Product key={p.id} product={p} />
            ))
        }
        
        </>
    )
}

export default DummyProducts