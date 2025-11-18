export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image: {
    url: string;
    width: number;
    height: number;
  };
  category: string;
  stock: number;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  revisedAt: string;
}

export interface ProductsResponse {
  contents: Product[];
  totalCount: number;
  offset: number;
  limit: number;
}
