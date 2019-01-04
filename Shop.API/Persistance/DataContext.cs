using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using Shop.API.Core.Models;

namespace Shop.API.Persistance
{
	public class DataContext : IdentityDbContext<User, Role, int,
	 IdentityUserClaim<int>, UserRole, IdentityUserLogin<int>,
	  IdentityRoleClaim<int>, IdentityUserToken<int>>

	{
		public DataContext(DbContextOptions<DataContext> options) : base(options) { }

		public DbSet<Values> Values { get; set; }
		public DbSet<User> User { get; set; }
		public DbSet<Category> Category { get; set; }
		public DbSet<ChildCategory> ChildCategories { get; set; }
		public DbSet<Product> Products { get; set; }
		public DbSet<Photo> Photos { get; set; }
		public DbSet<Order> Orders { get; set; }

		protected override void OnModelCreating(ModelBuilder builder)
		{
			base.OnModelCreating(builder);

			builder.Entity<UserRole>(userRole =>
			{
				// confifure the primary keys for many to many relationship
				userRole.HasKey(ur => new { ur.UserId, ur.RoleId });

				//one to many relationship
				//role has many user
				userRole.HasOne(ur => ur.Role)
				.WithMany(r => r.UserRoles)
				.HasForeignKey(ur => ur.RoleId)
				.IsRequired();

				//one to many relationship
				// user has many roles
				userRole.HasOne(ur => ur.User)
				.WithMany(u => u.UserRoles)
				.HasForeignKey(ur => ur.UserId)
				.IsRequired();

			});


			builder.Entity<Photo>().HasQueryFilter(p => p.IsMain);
		}
	}
}