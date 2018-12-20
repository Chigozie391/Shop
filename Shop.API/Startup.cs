using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.HttpsPolicy;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Authorization;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using Shop.API.Core;
using Shop.API.Core.Models;
using Shop.API.Helper;
using Shop.API.Persistance;

namespace Shop
{
	public class Startup
	{
		public Startup(IConfiguration configuration)
		{
			Configuration = configuration;
		}

		public IConfiguration Configuration { get; }

		// This method gets called by the runtime. Use this method to add services to the container.
		public void ConfigureServices(IServiceCollection services)
		{
			var key = Encoding.ASCII.GetBytes(Configuration.GetSection("AppSettings:Token").Value);

			services.AddDbContext<DataContext>(x => x.UseSqlServer(Configuration.GetConnectionString("DefaultConnection")));

			IdentityBuilder builder = services.AddIdentityCore<User>(opt =>
			{
				opt.Password.RequireDigit = false;
				opt.Password.RequiredLength = 6;
				opt.Password.RequireUppercase = false;
				opt.Password.RequireNonAlphanumeric = false;
				opt.User.RequireUniqueEmail = true;
			});

			builder = new IdentityBuilder(builder.UserType, typeof(Role), builder.Services);
			//  telling identity to use entity framework as our store, creates table for identity
			builder.AddEntityFrameworkStores<DataContext>();

			builder.AddRoleValidator<RoleValidator<Role>>();
			builder.AddRoleManager<RoleManager<Role>>();
			builder.AddSignInManager<SignInManager<User>>();

			services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
				.AddJwtBearer(options =>
				{
					options.TokenValidationParameters = new TokenValidationParameters
					{
						ValidateIssuerSigningKey = true,
						IssuerSigningKey = new SymmetricSecurityKey(key),
						ValidateIssuer = false,
						ValidateAudience = false
					};
				});

			services.AddAuthorization(option =>
			{
				option.AddPolicy("RequireAdminRole", policy => policy.RequireRole("Admin"));
				option.AddPolicy("RequireModeratorRole", policy => policy.RequireRole("Admin", "Moderator"));
				option.AddPolicy("RequireCustomerRole", policy => policy.RequireRole("Admin", "Moderator", "Customer"));
			});


			services.AddMvc(options =>
			{
				// lock down the whole app
				// var policy = new AuthorizationPolicyBuilder()
				// .RequireAuthenticatedUser()
				// .Build();
				// options.Filters.Add(new AuthorizeFilter(policy));
			})
			.SetCompatibilityVersion(CompatibilityVersion.Version_2_1);


			// Seed user
			services.AddTransient<Seed>();
			services.AddCors();

			services.AddAutoMapper();
			services.AddScoped<ICategoryRepository, CategoryRepository>();
			services.AddScoped<IProductRepository, ProductRepository>();
			services.AddScoped<IPhotoRepository, PhotoRepository>();
			services.AddScoped<IAuthRepository, AuthRepository>();
			services.AddScoped<IUnitOfWork, UnitOfWork>();

			services.Configure<CloudinarySettings>(Configuration.GetSection("CloudinarySettings"));

		}

		// This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
		public void Configure(IApplicationBuilder app, IHostingEnvironment env, Seed seeder)
		{
			if (env.IsDevelopment())
			{
				app.UseDeveloperExceptionPage();
			}
			else
			{
				app.UseHsts();
			}
			app.UseAuthentication();
			seeder.SeedUser();
			app.UseCors(x => x.AllowAnyHeader().AllowAnyMethod().AllowAnyOrigin().AllowCredentials());
			app.UseHttpsRedirection();
			app.UseMvc();
		}
	}
}
