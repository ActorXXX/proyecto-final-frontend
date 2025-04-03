import axios from "axios";


const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

// Cliente API
export const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Función para obtener productos
export const getProducts = async () => {
  const response = await api.get("/products");
  return response.data;
};

// Función para obtener un producto por ID
export const getProductById = async (id: string) => {
  const response = await api.get(`/products/${id}`);
  return response.data;
};

// Función para crear un producto
export const createProduct = async (product: {
  name: string;
  brand: string;
  price: number;
  description: string;
  active: boolean;
  discount: boolean;
  imageId?: string;
}) => {
  const response = await api.post("/products", product);
  return response.data;
};

// Función para actualizar un producto
export const updateProduct = async (id: string, product: Partial<typeof product>) => {
  const response = await api.put(`/products/${id}`, product);
  return response.data;
};

// Función para eliminar un producto
export const deleteProduct = async (id: string) => {
  const response = await api.delete(`/products/${id}`);
  return response.data;
};

// Función para el login
export const account = {
  login: async (username: string, password: string) => {
    const response = await api.post("/users/login", { username, password });
    return response.data;
  },
  register: async (username: string, password: string) => {
    const response = await api.post("/users/register", { username, password });
    return response.data;
  },
  deleteSession: (key: string) => {
    localStorage.removeItem(key);
  }
};