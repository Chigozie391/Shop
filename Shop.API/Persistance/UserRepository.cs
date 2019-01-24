using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Shop.API.Core;
using Shop.API.Core.Models;
using Shop.API.Dtos.UserDto;
using Shop.API.Helper;

namespace Shop.API.Persistance
{
	public class UserRepository : IUserRepository
	{
		private readonly DataContext context;
		private readonly UserManager<User> userManager;
		public UserRepository(DataContext context, UserManager<User> userManager)
		{
			this.userManager = userManager;
			this.context = context;
		}

		// trimmed what we return for user
		public async Task<User> GetUser(int id, bool includeRoles)
		{

			var user = includeRoles ?
							 await this.context.User
							.Include(x => x.UserRoles)
							.ThenInclude(x => x.Role)
							.FirstOrDefaultAsync(x => x.Id == id)
							:
							 await this.context.User
							.FirstOrDefaultAsync(x => x.Id == id);

			return user;
		}

		public async Task<QueryResult<UserForList>> GetUsers(UserQueryParams queryParams)
		{
			var queryResult = new QueryResult<UserForList>();

			var query = this.context.User
			.Select(x => new UserForList
			{
				Id = x.Id,
				FirstName = x.FirstName,
				LastName = x.LastName,
				Email = x.Email,
				LastActive = x.LastActive,
				Roles = x.UserRoles.Where(c => c.UserId == x.Id).Select(o => o.Role.Name).ToList()
			})
			.AsQueryable();


			var columMap = new Dictionary<string, Expression<Func<UserForList, object>>>()
			{
				["roles"] = v => v.Roles.Count(),
				["lastActive"] = v => v.LastActive,
			};

			query = query.ApplyOrdering<UserForList>(queryParams, columMap);

			queryResult.TotalItems = await query.CountAsync();

			queryResult.Items = query.ApplyPaging(queryParams);

			return queryResult;
		}
		public async Task<bool> VerifyPassword(User user, ChangePassword password)
		{

			var check = await this.userManager.CheckPasswordAsync(user, password.OldPassword);
			if (check)
				return true;

			return false;
		}


		public async Task<bool> ChangePassword(User user, ChangePassword password)
		{

			var result = await this.userManager.ChangePasswordAsync(user, password.OldPassword, password.NewPassword);

			if (result.Succeeded)
				return true;

			return false;
		}
	}
}