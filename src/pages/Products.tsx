import useAppwrite from "@hooks/useAppwrite"
import BaseLayout from "@layouts/BaseLayout"
import { Query } from "appwrite"
import { useState } from "react"
import { PersonalProduct } from "src/shared/declarations/Database"
import { Appwrite } from "../shared/lib/env"


const Products = () => {
  const [ appwriteProducts, setAppwriteProducts] = useState<Array<PersonalProduct>>([])

  const { fromDatabase } = useAppwrite()
  const productsCollection = fromDatabase(Appwrite.databaseId).collection(Appwrite.collections.products)

  // const getProductsFromAppwrite = async () =>{
  //   const { documents } = await productsCollection.getDocuments([
  //     Query.equal('ownerId', context?.session.userId )
  //   ])
  //   setAppwriteProducts(documents)
      
  // }
  
  return (
    <BaseLayout>
      <>


      
      
      
      </>    
    </BaseLayout>
  )
}

export default Products