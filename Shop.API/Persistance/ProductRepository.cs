using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Shop.API.Core;
using Shop.API.Core.Models;
using Shop.API.Helper;

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
		public async Task<ICollection<Product>> GetProducts(ProductQueryParams queryParams)
		{
			var query = this.context.Products
				 .Where(p => !p.Deleted)
				 .Include(x => x.Photos)
				 .Include(ch => ch.ChildCategory)
				 .ThenInclude(c => c.Category).AsQueryable();


			var columMap = new Dictionary<string, Expression<Func<Product, object>>>()
			{
				["price"] = v => v.Price,
				["sold"] = v => v.Sold,
				["lastUpdated"] = v => v.LastUpdated,
				["featured"] = v => v.Featured,
			};

			query = query.ApplyOrdering(queryParams, columMap);

			return await query.ToListAsync();

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