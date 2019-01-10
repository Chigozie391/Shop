using System;
using System.Security.Claims;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Shop.API.Core;
using Shop.API.Core.Models;
using Shop.API.Dtos;
using Shop.API.Dtos.OrderDto;
using Shop.API.Dtos.UserDto;
using Shop.API.Helper;

namespace Shop.API.Controllers
{
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

		[Authorize(Policy = "RequireCustomerRole")]
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

		[Authorize(Policy = "RequireCustomerRole")]
		[HttpGet("{userId}/{reference}")]
		public async Task<IActionResult> GetOrderedItemsForThankYou(int userId, string reference)
		{
			var order = await this.orderRepo.GetOrderedItems(userId, reference);
			if (order == null)
				return BadRequest("Order does not exist");

			var orderToReturn = this.mapper.Map<OrderToReturnForUser>(order);

			return Ok(orderToReturn);
		}

		[Authorize(Policy = "RequireAdminRole")]
		[HttpGet]
		public async Task<IActionResult> GetAllOrderedProducts([FromQuery]OrderQueryParams queryParams)
		{
			var order = await this.orderRepo.GetAllOrderedItems(queryParams);

			var orderToReturn = this.mapper.Map<QueryResultResource<OrderForList>>(order);
			return Ok(orderToReturn);
		}


		[Authorize(Policy = "RequireAdminRole")]
		[HttpGet("{id}")]
		public async Task<IActionResult> ViewOrderedProduct(int id)
		{
			var order = await this.orderRepo.GetOrder(id, true);

			var orderToReturn = this.mapper.Map<OrderForDetail>(order);

			return Ok(orderToReturn);
		}


		[Authorize(Policy = "RequireAdminRole")]
		[HttpPut("{id}")]
		public async Task<IActionResult> CompleteOrder(int id)
		{
			var order = await this.orderRepo.GetOrder(id);
			order.IsShipped = order.IsShipped ? false : true;
			order.ShippingDate = order.IsShipped ? DateTime.Now : new DateTime();

			await this.unitOfWork.CompleteAsync();
			return Ok(order.Id);

		}

	}
}