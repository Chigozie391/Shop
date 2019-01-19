using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Shop.API.Core;

namespace Shop.API.Persistance
{
	public class AdminRepository : IAdminRepository
	{
		private readonly DataContext context;
		public AdminRepository(DataContext context)
		{
			this.context = context;
		}

		public async Task<object> DashboardCounter()
		{
			var products = this.context.Products.AsQueryable();
			var orders = await this.context.Orders.Select(x => x.TotalPrice).ToListAsync();
			var userCount = await this.context.User.CountAsync();
			var sold = 0;
			decimal totalRevenue = 0;

			foreach (var product in await products.ToListAsync())
			{
				sold += product.Sold;
			}

			foreach (var order in orders)
			{
				totalRevenue += order;
			}

			return new
			{
				productCount = await products.Where(x => !x.Deleted).CountAsync(),
				archiveCount = await products.Where(x => x.Deleted).CountAsync(),
				orderCount = orders.Count(),
				totalRevenue = totalRevenue,
				userCount,
				soldCount = sold
			};
		}
	}
}