using System.ComponentModel.DataAnnotations;

namespace Shop.API.Core.Models
{
	public class ChildCategory
	{
		public int Id { get; set; }

		[Required]
		[StringLength(255)]
		public string Name { get; set; }
		public Category Catogories { get; set; }
		public int CategoryId { get; set; }
	}
}