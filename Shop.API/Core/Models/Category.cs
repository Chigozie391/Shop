using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.ComponentModel.DataAnnotations;

namespace Shop.API.Core.Models
{
	public class Category
	{
		public int Id { get; set; }

		[Required]
		[StringLength(255)]
		public string Name { get; set; }
		public ICollection<ChildCategory> ChildCategories { get; set; }

		public Category()
		{
			ChildCategories = new Collection<ChildCategory>();
		}
	}
}