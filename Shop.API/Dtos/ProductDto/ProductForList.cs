using System;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using Shop.API.Core.Models;
using Shop.API.Dtos.CategoryDto;
using Shop.API.Dtos.PhotosDto;

namespace Shop.API.Dtos.ProductDto
{
	public class ProductForList
	{
		public int Id { get; set; }
		public string Title { get; set; }
		public decimal Price { get; set; }
		public string PhotoUrl { get; set; }
		public int ChildCategoryId { get; set; }
		public string ChildCategoryName { get; set; }
		public int CategoryId { get; set; }
		public string CategoryName { get; set; }
		public bool Featured { get; set; }
		public DateTime Created { get; set; }
		public DateTime LastUpdated { get; set; }

	}
}