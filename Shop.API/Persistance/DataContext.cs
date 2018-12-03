using Microsoft.EntityFrameworkCore;
using Shop.API.Core.Models;

namespace Shop.API.Persistance
{
	public class DataContext : DbContext
	{
		public DataContext(DbContextOptions<DataContext> options) : base(options)
		{
		}

		public DbSet<Values> Values { get; set; }
		public DbSet<Category> Categories { get; set; }
		public DbSet<ChildCategory> ChildCategories { get; set; }
	}
}