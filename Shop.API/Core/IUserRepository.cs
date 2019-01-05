using System.Threading.Tasks;
using Shop.API.Core.Models;

namespace Shop.API.Core
{
	public interface IUserRepository
	{
		Task<User> GetUser(int id);
	}
}