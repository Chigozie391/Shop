
using System.Threading.Tasks;
using Shop.API.Core.Models;
using Shop.API.Dtos.UserDto;
using Shop.API.Helper;

namespace Shop.API.Core
{
	public interface IUserRepository
	{
		Task<User> GetUser(int id, bool includeRoles = false);
		Task<QueryResult<UserForList>> GetUsers(UserQueryParams queryParams);
	}
}