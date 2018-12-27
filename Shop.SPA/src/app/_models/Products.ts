import { Photo } from './Photo';

export interface Products {
  id?: number;
  price?: number;
  title?: string;
  sold?: number;
  created?: Date;
  lastUpdated?: Date;
  categoryId?: number;
  categoryName?: string;
  childCategoryId?: number;
  childCategoryName?: string;
  deleted?: boolean;
  description?: string;
  sizes?: string;
  featured?: boolean;
  photoUrl?: string;
  photos?: Photo[];
}
