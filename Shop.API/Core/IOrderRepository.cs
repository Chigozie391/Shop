using System.Threading.Tasks;
using Shop.API.Core.Models;
using Shop.API.Helper;

namespace Shop.API.Core
{
	public interface IOrderRepository
	{
		Task<Order> GetOrderedItems(int userId, string reference);
		Task<Order> GetOrder(int id, bool includeUser = false);
		Task<QueryResult<Order>> GetAllOrderedItems(OrderQueryParams queryParams);
	}
}