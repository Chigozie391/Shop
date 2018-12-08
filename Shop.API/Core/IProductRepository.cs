using System.Collections.Generic;
using System.Threading.Tasks;
using Shop.API.Core.Models;

namespace Shop.API.Core
{
	public interface IProductRepository
	{
		Task<Product> GetProduct(int id);
		Task<ICollection<Product>> GetProducts();
	}
}