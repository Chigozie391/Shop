using System;
using System.Collections.Generic;
using Shop.API.Dtos.PhotosDto;

namespace Shop.API.Dtos.ProductDto
{
	public class ProductForDetail
	{
		public int Id { get; set; }
		public string Title { get; set; }
		public decimal Price { get; set; }
		public string Sizes { get; set; }
		public string PhotoUrl { get; set; }
		public int ChildCategoryId { get; set; }
		public ICollection<PhotoForReturn> Photos { get; set; }
		public string Description { get; set; }
		public bool Featured { get; set; }
		public bool Deleted { get; set; }
		public DateTime Created { get; set; }
		public DateTime LastUpdated { get; set; }
	}
}