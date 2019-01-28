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
						.Include(p => p.Photos)
						.FirstOrDefaultAsync(x => x.Id == id);
			}

		}

		public async Task<QueryResult<Product>> GetProductInCategory(int childId, ProductQueryParams queryParams)
		{
			var queryResult = new QueryResult<Product>();

			var query = this.context.Products
							.Include(p => p.Photos)
							.Where(x => x.ChildCategoryId == childId && !x.Deleted).AsQueryable();

			return await this.ApplyPagingAndSorting(query, queryParams);
		}

		public async Task<QueryResult<Product>> GetProducts(ProductQueryParams queryParams)
		{

			var query = queryParams.LowItems ? this.context.Products
								.Select(x => new Product
								{
									Sizes = x.Sizes,
									Title = x.Title,
									Id = x.Id
								})
								.Where(p => !p.Deleted)
								.AsQueryable()
							:
								this.context.Products
								.Where(p => !p.Deleted)
								.Include(x => x.Photos)
								.Include(ch => ch.ChildCategory)
								.ThenInclude(c => c.Category).AsQueryable();


			return await this.ApplyPagingAndSorting(query, queryParams);
		}

		public async Task<QueryResult<Product>> GetArchiveProduct(ProductQueryParams queryParams)
		{
			var query = this.context.Products
							.Where(p => p.Deleted)
							.Include(x => x.Photos)
							.Include(ch => ch.ChildCategory)
							.ThenInclude(c => c.Category).AsQueryable();

			return await this.ApplyPagingAndSorting(query, queryParams);
		}

		public async Task<ICollection<Product>> GetRelatedProduct(int childId, int productId)
		{
			var query = await this.context.Products
							.Include(p => p.Photos)
							.Where(x => x.ChildCategoryId == childId && x.Id != productId)
							.OrderByDescending(x => x.Sold)
							.Take(20).ToListAsync();

			return query;
		}

		public async Task<ICollection<Product>> GetPopularProducts()
		{
			var query = await this.context.Products
										 .Where(p => !p.Deleted)
										 .Include(o => o.Photos)
										 .OrderByDescending(x => x.Sold)
										 .Take(20).ToListAsync();

			return query;
		}

		private async Task<QueryResult<Product>> ApplyPagingAndSorting(IQueryable<Product> query, ProductQueryParams queryParams)
		{
			var queryResult = new QueryResult<Product>();

			var columMap = new Dictionary<string, Expression<Func<Product, object>>>()
			{
				["price"] = v => v.Price,
				["sold"] = v => v.Sold,
				["lastUpdated"] = v => v.LastUpdated,
				["featured"] = v => v.Featured,
			};

			query = query.ApplyOrdering(queryParams, columMap);

			queryResult.TotalItems = await query.CountAsync();

			queryResult.Items = query.ApplyPaging(queryParams);

			return queryResult;
		}

	}
}