using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Shop.API.Core;
using Shop.API.Core.Models;

namespace Shop.API.Persistance
{
	public class UserRepository : IUserRepository
	{
		private readonly DataContext context;
		public UserRepository(DataContext context)
		{
			this.context = context;
		}

		public async Task<User> GetUser(int id)
		{
			var user = await this.context.User.FirstOrDefaultAsync(x => x.Id == id);
			return user;
		}
	}
}