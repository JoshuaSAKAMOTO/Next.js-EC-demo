import { createClient } from 'microcms-js-sdk';
import { Product, ProductsResponse } from '@/types/product';

type MicroCMSClientType = ReturnType<typeof createClient>;

let clientInstance: MicroCMSClientType | null = null;

const getClient = (): MicroCMSClientType => {
  if (!clientInstance) {
    if (!process.env.MICROCMS_SERVICE_DOMAIN) {
      throw new Error('MICROCMS_SERVICE_DOMAIN is required');
    }
    if (!process.env.MICROCMS_API_KEY) {
      throw new Error('MICROCMS_API_KEY is required');
    }
    clientInstance = createClient({
      serviceDomain: process.env.MICROCMS_SERVICE_DOMAIN,
      apiKey: process.env.MICROCMS_API_KEY,
    });
  }
  return clientInstance;
};

export const getProducts = async (queries?: {
  limit?: number;
  offset?: number;
}): Promise<ProductsResponse> => {
  return await getClient().get<ProductsResponse>({
    endpoint: 'products',
    queries,
  });
};

export const getProductById = async (productId: string): Promise<Product> => {
  return await getClient().get<Product>({
    endpoint: 'products',
    contentId: productId,
  });
};
