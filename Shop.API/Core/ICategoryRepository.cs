using System.Collections.Generic;
using System.Threading.Tasks;
using Shop.API.Core.Models;

namespace Shop.API.Core
{
	public interface ICategoryRepository
	{
		Task<IEnumerable<Category>> GetCategories();
		Task<Category> GetCategory(int Id, bool includeChildren = true);
		Task<ChildCategory> GetChildCategory(int Id);
	}
}