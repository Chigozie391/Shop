using System.Collections.Generic;
using System.Linq;
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

		public async Task<Product> GetProduct(int id, bool includePhoto)
		{
			if (includePhoto)
			{
				return await this.context.Products
						.Include(x => x.Photos)
						.IgnoreQueryFilters()
						.Include(ch => ch.ChildCategory)
						.ThenInclude(c => c.Category)
						.FirstOrDefaultAsync(x => x.Id == id);
			}
			else
			{
				return await this.context.Products
						.Include(ch => ch.ChildCategory)
						.ThenInclude(c => c.Category)
						.FirstOrDefaultAsync(x => x.Id == id);
			}

		}
		public async Task<ICollection<Product>> GetProducts()
		{
			return await this.context.Products
			.Where(p => !p.Deleted)
			.Include(x => x.Photos)
			.Include(ch => ch.ChildCategory)
			.ThenInclude(c => c.Category)
			.ToListAsync();
		}

		public async Task<ICollection<Product>> GetArchiveProduct()
		{
			return await this.context.Products
			.Where(p => p.Deleted)
			.Include(x => x.Photos)
			.Include(ch => ch.ChildCategory)
			.ThenInclude(c => c.Category)
			.ToListAsync();
		}
	}
}