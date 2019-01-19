using System.Threading.Tasks;

namespace Shop.API.Core
{
	public interface IAdminRepository
	{
		Task<object> DashboardCounter();
	}
}