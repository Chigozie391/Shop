using System.Collections.Generic;
using System.Threading.Tasks;
using Shop.API.Core.Models;
using Shop.API.Helper;

namespace Shop.API.Core
{
	public interface IProductRepository
	{
		Task<Product> GetProduct(int id, bool includePhoto = true);
		Task<QueryResult<Product>> GetProducts(ProductQueryParams queryParams);
		Task<QueryResult<Product>> GetArchiveProduct(ProductQueryParams queryParams);
		Task<QueryResult<Product>> GetProductInCategory(int childId, ProductQueryParams queryParams);

	}
}