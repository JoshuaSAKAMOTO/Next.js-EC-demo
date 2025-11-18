import { createClient } from 'microcms-js-sdk';
import { Product, ProductsResponse } from '@/types/product';

if (!process.env.MICROCMS_SERVICE_DOMAIN) {
  throw new Error('MICROCMS_SERVICE_DOMAIN is required');
}

if (!process.env.MICROCMS_API_KEY) {
  throw new Error('MICROCMS_API_KEY is required');
}

export const client = createClient({
  serviceDomain: process.env.MICROCMS_SERVICE_DOMAIN,
  apiKey: process.env.MICROCMS_API_KEY,
});

export const getProducts = async (queries?: {
  limit?: number;
  offset?: number;
}): Promise<ProductsResponse> => {
  return await client.get<ProductsResponse>({
    endpoint: 'products',
    queries,
  });
};

export const getProductById = async (productId: string): Promise<Product> => {
  return await client.get<Product>({
    endpoint: 'products',
    contentId: productId,
  });
};
