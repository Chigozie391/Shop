using System;

namespace Shop.API.Dtos.ProductDto
{
	public class ProductToReturn
	{
		public int Id { get; set; }
		public string Title { get; set; }
		public decimal Price { get; set; }
		public string Sizes { get; set; }
		public int ChildCategoryId { get; set; }
		public string Description { get; set; }
		public bool Featured { get; set; }
		public bool Deleted { get; set; }
		public DateTime Created { get; set; }
		public DateTime LastUpdated { get; set; }
	}
}