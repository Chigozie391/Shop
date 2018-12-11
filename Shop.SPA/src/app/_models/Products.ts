export interface Products {
  id: number;
  price: number;
  title: string;
  created: Date;
  lastUpdated: Date;
  categoryId?: number;
  categoryName?: string;
  childCategoryId?: number;
  childCategoryName?: string;
  deleted?: boolean;
  description?: string;
  sizes?: string;
  featured: boolean;
  photoUrl?: string;
  photos?: [];
}
