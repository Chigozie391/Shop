using System.Threading.Tasks;
using Shop.API.Core;

namespace Shop.API.Persistance
{
	public class UnitOfWork : IUnitOfWork
	{
		private readonly DataContext context;

		public UnitOfWork(DataContext context)
		{
			this.context = context;
		}

		public void Add<T>(T entity) where T : class
		{
			this.context.Add(entity);
		}

		public void Remove<T>(T entity) where T : class
		{
			this.context.Remove(entity);
		}

		public async Task<bool> CompleteAsync()
		{
			return await this.context.SaveChangesAsync() > 0;
		}
	}
}