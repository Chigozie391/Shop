using System.Collections.Generic;
using System.Collections.ObjectModel;

namespace Shop.API.Dtos.CategoryDto
{
	public class CategoryForReturn : KeyValuePair
	{
		public ICollection<KeyValuePair> ChildCategories { get; set; }

		public CategoryForReturn()
		{
			ChildCategories = new Collection<KeyValuePair>();
		}
	}
}