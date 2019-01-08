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
		private readonly IUserRepository userRepo;
		private readonly IOrderRepository orderRepo;
		public OrderController(IMapper mapper, IUserRepository userRepo, IOrderRepository orderRepo, IUnitOfWork unitOfWork)
		{
			this.orderRepo = orderRepo;
			this.userRepo = userRepo;
			this.unitOfWork = unitOfWork;
			this.mapper = mapper;
		}

		[HttpPost("{id}")]
		public async Task<IActionResult> CreateOrder(int Id, OrderForCreation orderForCreation)
		{
			var currentUserId = int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value);
			var user = await this.userRepo.GetUser(Id);

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

		[HttpGet("{userId}/{reference}")]
		public async Task<IActionResult> GetOrderedItems(int userId, string reference)
		{
			var order = await this.orderRepo.GetOrderedItems(userId, reference);
			if (order == null)
				return BadRequest("Order does not exist");

			var orderToReturn = this.mapper.Map<OrderToReturnForUser>(order);

			return Ok(orderToReturn);
		}
	}
}