using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Shop.API.Core;
using Shop.API.Core.Models;
using Shop.API.Dtos.UserDto;

namespace Shop.API.Persistance
{
	public class AdminRepository : IAdminRepository
	{
		private readonly DataContext context;
		private readonly UserManager<User> userManager;

		public AdminRepository(DataContext context, UserManager<User> userManager)
		{
			this.context = context;
			this.userManager = userManager;
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

		public async Task<ICollection<string>> UpdateUserRole(string email, RoleForUpdate roleForUpdate)
		{
			var user = await this.userManager.FindByEmailAsync(email);
			//get roles
			var userRoles = await this.userManager.GetRolesAsync(user);

			var selectedRole = roleForUpdate.RoleNames;

			// selectedRole != null ? selectedROles : new string[] {};
			selectedRole = selectedRole ?? new string[] { };

			//add the roles to the user eexcept the one that already exist
			var result = await this.userManager.AddToRolesAsync(user, selectedRole.Except(userRoles));

			if (result.Succeeded)
			{
				result = await this.userManager.RemoveFromRolesAsync(user, userRoles.Except(selectedRole));
				return await this.userManager.GetRolesAsync(user);
			}

			return new string[] { };
		}
	}
}