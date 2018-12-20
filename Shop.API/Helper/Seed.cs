using System.Collections.Generic;
using System.Linq;
using Microsoft.AspNetCore.Identity;
using Shop.API.Core.Models;

namespace Shop.API.Helper
{
	public class Seed
	{
		private readonly UserManager<User> userManager;
		private readonly RoleManager<Role> roleManager;

		public Seed(UserManager<User> userManager, RoleManager<Role> roleManager)
		{
			this.userManager = userManager;
			this.roleManager = roleManager;
		}

		public void SeedUser()
		{
			if (!this.userManager.Users.Any())
			{
				var roles = new List<Role>
				{
					new Role{Name = "Customer"},
					new Role{Name = "Moderator"},
					new Role{Name = "Admin"}
				};

				foreach (var role in roles)
				{
					this.roleManager.CreateAsync(role).Wait();
				}

				var users = new List<User>
				{
					new User{UserName = "Jesse",Gender = "Male"},
					new User{UserName = "Pamela",Gender = "Feamle"}
				};

				foreach (var user in users)
				{
					this.userManager.CreateAsync(user, "password").Wait();
					this.userManager.AddToRoleAsync(user, "Customer").Wait();
				}

				var admin = this.userManager.FindByNameAsync("Pamela").Result;
				this.userManager.AddToRolesAsync(admin, new[] { "Admin", "Moderator" }).Wait();
			}
		}
	}
}