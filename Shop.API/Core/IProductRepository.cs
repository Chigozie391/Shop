using System.Collections.Generic;
using System.Threading.Tasks;
using Shop.API.Core.Models;
using Shop.API.Helper;

namespace Shop.API.Core
{
	public interface IProductRepository
	{
		Task<Product> GetProduct(int id, bool includePhoto = true);
		Task<ICollection<Product>> GetProducts(ProductQueryParams queryParams);
		Task<ICollection<Product>> GetArchiveProduct();
	}
}