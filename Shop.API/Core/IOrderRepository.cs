using System.Threading.Tasks;
using Shop.API.Core.Models;

namespace Shop.API.Core
{
	public interface IOrderRepository
	{
		Task<Order> GetOrderedItems(int userId, string reference);
	}
}