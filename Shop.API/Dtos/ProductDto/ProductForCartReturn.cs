namespace Shop.API.Dtos.ProductDto
{
	public class ProductForCartReturn
	{
		public int Id { get; set; }
		public string Title { get; set; }
		public decimal Price { get; set; }
		public string Sizes { get; set; }
		public string PhotoUrl { get; set; }
	}
}