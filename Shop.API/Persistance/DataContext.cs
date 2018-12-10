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
		public DbSet<Category> Category { get; set; }
		public DbSet<ChildCategory> ChildCategories { get; set; }
		public DbSet<Product> Products { get; set; }
		public DbSet<Photo> Photos { get; set; }

		protected override void OnModelCreating(ModelBuilder builder)
		{
			builder.Entity<Photo>().HasQueryFilter(p => p.IsMain);
		}
	}
}