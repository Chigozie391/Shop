
namespace Shop.API.Core.Models
{
	public class Photo
	{
		public int Id { get; set; }
		public string Url { get; set; }
		public bool IsMain { get; set; }
		public Product Products { get; set; }
		public int ProductId { get; set; }
	}
}