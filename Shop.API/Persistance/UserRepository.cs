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

		public async Task<User> GetUser(int id)
		{
			var user = await this.context.User.FirstOrDefaultAsync(x => x.Id == id);
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
				JoinDate = x.JoinDate,
				Roles = x.UserRoles.Where(c => c.UserId == x.Id).Select(o => o.Role.Name).ToList()
			})
			.AsQueryable();


			var columMap = new Dictionary<string, Expression<Func<UserForList, object>>>()
			{
				["roles"] = v => v.Roles.Count(),
				["joinDate"] = v => v.JoinDate,
			};

			query = query.ApplyOrdering<UserForList>(queryParams, columMap);

			queryResult.TotalItems = await query.CountAsync();

			queryResult.Items = query.ApplyPaging(queryParams);

			return queryResult;
		}
	}
}