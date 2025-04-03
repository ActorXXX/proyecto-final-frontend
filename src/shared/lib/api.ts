import axios from "axios";

// URL del backend (asegúrate de que esté en el .env)
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
export const login = async (username: string, password: string) => {
  const response = await api.post("/auth/login", { username, password });
  return response.data;
};

// Función para el registro
export const register = async (username: string, password: string) => {
  const response = await api.post("/auth/register", { username, password });
  return response.data;
};
