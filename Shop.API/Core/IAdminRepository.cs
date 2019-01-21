using System.Collections.Generic;
using System.Threading.Tasks;
using Shop.API.Dtos.UserDto;

namespace Shop.API.Core
{
	public interface IAdminRepository
	{
		Task<object> DashboardCounter();
		Task<ICollection<string>> UpdateUserRole(string email, RoleForUpdate roleForUpdate);
	}
}