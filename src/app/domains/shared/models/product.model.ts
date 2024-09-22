import { category } from "./category.module";

export interface Product {
  id: number;
  title: string;
  price: number;
  images: string[];
  creationAt?: string;
  description: string;
  category: category
}
