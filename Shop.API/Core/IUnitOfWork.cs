using System.Threading.Tasks;

namespace Shop.API.Core
{
	public interface IUnitOfWork
	{
		Task CompleteAsync();
		void Add<T>(T entity) where T : class;
		void Remove<T>(T entity) where T : class;

	}
}