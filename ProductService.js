import axios from 'axios';

const API_BASE_URL = 'https://panda-market-api-crud.vercel.app';

class Product {
  constructor(name, description, price, tags, images) {
    this.name = name;
    this.description = description;
    this.price = price;
    this.tags = tags;
    this.images = images;
    this.favoriteCount = 0;
  }

  favorite() {
    this.favoriteCount += 1;
  }
}

class ElectronicProduct extends Product {
  constructor(name, description, price, tags, images, manufacturer) {
    super(name, description, price, tags, images);
    this.manufacturer = manufacturer;
  }
}

export async function getProductList(page, pageSize, keyword) {
  try {
    const params = {};
    if (page !== undefined) params.page = page;
    if (pageSize !== undefined) params.pageSize = pageSize;
    if (keyword !== undefined) params.keyword = keyword;
    
    const response = await axios.get(`${API_BASE_URL}/products`, { params });
    
    const products = response.data.products || response.data;
    return products.map(product => {
      if (product.tags && product.tags.includes("전자제품")) {
        return new ElectronicProduct(
          product.name,
          product.description,
          product.price,
          product.tags,
          product.images,
          product.manufacturer
        );
      } else {
        return new Product(
          product.name,
          product.description,
          product.price,
          product.tags,
          product.images
        );
      }
    });
  } catch (error) {
    console.error('Error fetching product list:', error);
    throw error;
  }
}

export async function getProduct(id) {
  try {
    const response = await axios.get(`${API_BASE_URL}/products/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching product:', error);
    throw error;
  }
}

export async function createProduct(name, description, price, tags, images) {
  try {
    const requestBody = {
      name: name,
      description: description,
      price: price,
      tags: tags,
      images: images
    };

    const response = await axios.post(`${API_BASE_URL}/products`, requestBody);
    return response.data;
  } catch (error) {
    console.error('Error creating product:', error);
    throw error;
  }
}

export async function patchProduct(id, updates) {
  try {
    const response = await axios.patch(`${API_BASE_URL}/products/${id}`, updates);
    return response.data;
  } catch (error) {
    console.error('Error patching product:', error);
    throw error;
  }
}

export async function deleteProduct(id) {
  try {
    const response = await axios.delete(`${API_BASE_URL}/products/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error deleting product:', error);
    throw error;
  }
}