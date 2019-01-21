using System;
using System.Security.Claims;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc.Filters;
using Microsoft.Extensions.DependencyInjection;
using Shop.API.Core;

namespace Shop.API.Helper
{
	public class LogUserAcivity : IAsyncActionFilter
	{
		public async Task OnActionExecutionAsync(ActionExecutingContext context, ActionExecutionDelegate next)
		{

			var resultContext = await next();
			bool isAuthenticated = resultContext.HttpContext.User.Identity.IsAuthenticated;

			if (isAuthenticated)
			{
				var userId = int.Parse(resultContext.HttpContext.User.FindFirst(ClaimTypes.NameIdentifier).Value);

				var userRepo = resultContext.HttpContext.RequestServices.GetService<IUserRepository>();
				var unitOfWork = resultContext.HttpContext.RequestServices.GetService<IUnitOfWork>();
				var user = await userRepo.GetUser(userId);

				user.LastActive = DateTime.Now;
				await unitOfWork.CompleteAsync();
			}


		}
	}
}