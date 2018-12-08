
namespace Shop.API.Dtos.ProductDto
{
	public class ProductForCreationOrUpdate
	{
		public string Title { get; set; }
		public decimal Price { get; set; }
		public string Sizes { get; set; }
		public int ChildCategoryId { get; set; }
		public string Description { get; set; }
		public bool Featured { get; set; }
		public bool Deleted { get; set; }
	}
}