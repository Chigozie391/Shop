using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Shop.API.Core;
using Shop.API.Core.Models;

namespace Shop.API.Persistance
{
	public class ProductRepository : IProductRepository
	{
		private readonly DataContext context;
		public ProductRepository(DataContext context)
		{
			this.context = context;
		}

		public async Task<Product> GetProduct(int id)
		{
			return await this.context.Products
			.Include(x => x.Photos)
			.IgnoreQueryFilters()
			.FirstOrDefaultAsync(x => x.Id == id);
		}
		public async Task<ICollection<Product>> GetProducts()
		{
			return await this.context.Products
			.Include(x => x.Photos).ToListAsync();
		}
	}
}