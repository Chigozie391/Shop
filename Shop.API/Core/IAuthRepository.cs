using System.Threading.Tasks;
using Shop.API.Core.Models;

namespace Shop.API.Core
{
	public interface IAuthRepository
	{
		Task<User> Login();
		Task<User> Register();
	}
}