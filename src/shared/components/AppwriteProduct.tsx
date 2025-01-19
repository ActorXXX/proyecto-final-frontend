import { useEffect, useRef, useState } from "react"
import { Appwrite } from "../lib/env"
import { storage } from "../lib/appwrite"
import { PersonalProduct } from "src/declarations/Database"
import { useDisclosure } from "@chakra-ui/react"
import useAppwrite from "@hooks/useAppwrite"
import { toast } from "sonner"



const AppwriteProduct = ({product,onRefresh}: {
  product: PersonalProduct
  onRefresh?: () => void
}) => {
  const { isOpen, onOpen, onClose } = useDisclosure()

  const [imageUrl,setImageUrl] = useState<string>()
  const modalForm = useRef(null)

  const [name,setName] = useState(product.name)
  const [description, setDescription] = useState(product.description)
  const [price, setPrice] = useState(product.price)
  const [active,setActive] = useState(product.active)
  const [discount, setDiscount] = useState(product.discount)

  const { fromDatabase, fromStorage }= useAppwrite()
  const productsCollection = fromDatabase(Appwrite.databaseId).collection(Appwrite.collections.products)
  const photoBucket = fromStorage().bucket(Appwrite.buckets.pictures)

  const getImage = () => {
    try{
      const url = storage.getFilePreview(Appwrite.buckets.pictures, product.imageId)
      setImageUrl(url)
      
    }
    catch(error){
      toast.error("Error al obtener la imagen")
    }
  }

  // Obtener los datos actualizados del producto desde la base de datos
  const fetchProductData = async () => {
    try {
      const productData = await productsCollection.getDocumentById(product.$id);
      setName(productData.name);
      setDescription(productData.description);
      setPrice(productData.price);
      setActive(productData.active);
      setDiscount(productData.discount);
    } catch (error) {
      toast.error("Error al obtener los datos del producto:");
    }
  };

  useEffect(() => {
      getImage()
      fetchProductData()
  }, [])
}



// const [imageUrl, setImageUrl] = useState<string>()


// const getImage = () => {
//     const url = storage.getFilePreview(Appwrite.buckets.pictures, product.imageId)
//     setImageUrl(url)
// }

// useEffect(() => {
//     getImage()
// }, [])

export default AppwriteProduct