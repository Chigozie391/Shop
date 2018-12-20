using System.Threading.Tasks;
using Shop.API.Core;
using Shop.API.Core.Models;

namespace Shop.API.Persistance
{
	public class AuthRepository : IAuthRepository
	{
		public Task<User> Login()
		{
			throw new System.NotImplementedException();
		}

		public Task<User> Register()
		{
			throw new System.NotImplementedException();
		}
	}
}