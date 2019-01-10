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
	public class OrderRepository : IOrderRepository
	{
		private readonly DataContext context;
		public OrderRepository(DataContext context)
		{
			this.context = context;
		}

		public async Task<Order> GetOrderedItems(int userId, string reference)
		{
			return await this.context.Orders
			.Include(u => u.User)
			.FirstOrDefaultAsync(x => x.UserId == userId && x.Reference == reference);
		}

		public async Task<QueryResult<Order>> GetAllOrderedItems(OrderQueryParams queryParams)
		{
			var queryResult = new QueryResult<Order>();
			var query = queryParams.IsShipped ?
							this.context.Orders.Where(x => x.IsShipped).AsQueryable()
							:
							this.context.Orders.Where(x => !x.IsShipped).AsQueryable();

			var columMap = new Dictionary<string, Expression<Func<Order, object>>>()
			{
				["orderDate"] = v => v.OrderDate,
			};

			query = query.ApplyOrdering(queryParams, columMap);

			queryResult.TotalItems = await query.CountAsync();

			queryResult.Items = query.ApplyPaging(queryParams);

			return queryResult;

		}

		public async Task<Order> GetOrder(int id, bool includeUser)
		{
			var order = includeUser ? await this.context.Orders
											.Include(u => u.User)
											.FirstOrDefaultAsync(x => x.Id == id)
											:
											 await this.context.Orders
											.FirstOrDefaultAsync(x => x.Id == id);

			return order;
		}
	}
}