using System.Security.Claims;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Shop.API.Core;
using Shop.API.Core.Models;
using Shop.API.Dtos.UserDto;

namespace Shop.API.Controllers
{
	[Authorize(Policy = "RequireCustomerRole")]
	[Route("api/[controller]")]
	[ApiController]
	public class OrderController : ControllerBase
	{
		private readonly IMapper mapper;
		private readonly IUnitOfWork unitOfWork;
		private readonly IUserRepository repo;
		public OrderController(IMapper mapper, IUserRepository repo, IUnitOfWork unitOfWork)
		{
			this.repo = repo;
			this.unitOfWork = unitOfWork;
			this.mapper = mapper;
		}

		[HttpPost("{id}")]
		public async Task<IActionResult> CreateOrder(int Id, OrderForCreation orderForCreation)
		{
			var currentUserId = int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value);
			var user = await this.repo.GetUser(Id);

			if (user == null)
				return NotFound("User not found");

			if (currentUserId != user.Id)
				return Unauthorized();

			var order = this.mapper.Map<Order>(orderForCreation);
			order.User = user;
			user.Orders.Add(order);

			if (await this.unitOfWork.CompleteAsync())
				return NoContent();

			return BadRequest("Could not create order");
		}
	}
}