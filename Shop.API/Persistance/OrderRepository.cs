using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Shop.API.Core;
using Shop.API.Core.Models;

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
	}
}