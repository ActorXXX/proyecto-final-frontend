import { useEffect, useState } from "react"
import { Appwrite } from "../lib/env"
import { storage } from "../lib/appwrite"


const AppwriteProduct = () => {
  return (
    <div>AppwriteProduct</div>
  )
}

const [imageUrl, setImageUrl] = useState<string>()

const getImage = () => {
    const url = storage.getFilePreview(Appwrite.buckets.pictures, products.imageId)
    setImageUrl(url)
}

useEffect(() => {
    getImage()
}, [])

export default AppwriteProduct