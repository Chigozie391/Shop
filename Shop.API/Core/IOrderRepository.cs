using System.Collections.Generic;
using System.Threading.Tasks;
using Newtonsoft.Json.Linq;
using Shop.API.Core.Models;
using Shop.API.Helper;

namespace Shop.API.Core
{
	public interface IOrderRepository
	{
		Task<Order> GetOrderedItems(int userId, string reference);
		Task<Order> GetOrder(int id, bool includeUser = false);
		Task<QueryResult<Order>> GetAllOrderedItems(OrderQueryParams queryParams);
		Task<bool> SendEmail(int id);
		Task<QueryResult<Order>> GetOrdersByUserId(int userId, OrderQueryParams queryParams, bool includeUser = true);
	}
}