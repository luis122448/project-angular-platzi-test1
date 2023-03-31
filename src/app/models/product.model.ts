import { Category } from "./category.model";

export interface Product{
  id: string;
  title: string;
  price: number;
  images: string[];
  description: string;
  category: Category;
  taxes?: number;
}

export interface SaveProductDTO extends Omit<Product, 'id' | 'category'>{
  categoryId: number;
}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface UpdateProductDTO extends Partial<SaveProductDTO> {}
