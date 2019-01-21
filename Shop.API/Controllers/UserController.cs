using System;
using System.Security.Claims;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Shop.API.Core;
using Shop.API.Dtos;
using Shop.API.Dtos.AuthDto;
using Shop.API.Dtos.UserDto;
using Shop.API.Helper;

namespace Shop.API.Controllers
{
	[Route("api/[controller]")]
	[ApiController]
	public class UserController : ControllerBase
	{
		private readonly IMapper mapper;
		private readonly IUserRepository repo;
		private readonly IUnitOfWork unitOfWork;
		private readonly IProductRepository productRepo;
		public UserController(IMapper mapper, IUserRepository repo, IProductRepository productRepo, IUnitOfWork unitOfWork)
		{
			this.productRepo = productRepo;
			this.unitOfWork = unitOfWork;
			this.repo = repo;
			this.mapper = mapper;
		}

		[Authorize(Policy = "RequireModeratorRole")]
		[HttpGet]
		public async Task<IActionResult> GetUsers([FromQuery]UserQueryParams queryParams)
		{
			var user = await this.repo.GetUsers(queryParams);
			var userToReturn = this.mapper.Map<QueryResultResource<UserForList>>(user);

			return Ok(userToReturn);
		}

		[Authorize(Policy = "RequireModeratorRole")]
		[HttpGet("{Id}")]
		public async Task<IActionResult> GetUser(int Id)
		{
			var user = await this.repo.GetUser(Id, true);
			var userToReturn = this.mapper.Map<UserForDetail>(user);

			return Ok(userToReturn);
		}


		[Authorize(Policy = "RequireCustomerRole")]
		[HttpPut("{id}/setaddress")]
		public async Task<IActionResult> SetAddress(int Id, UserForSetAddress userForUpdate)
		{
			var isAdmin = User.IsInRole("Admin");
			var userFromRepo = await this.repo.GetUser(Id, true);

			if (userFromRepo == null)
				return NotFound("User not found");

			if (isAdmin)
			{
				this.mapper.Map(userForUpdate, userFromRepo);

				await this.unitOfWork.CompleteAsync();
				var us = this.mapper.Map<UserForDetail>(userFromRepo);
				return Ok(us);
			}

			var currentUserId = int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value);

			if (currentUserId != userFromRepo.Id)
				return Unauthorized();

			this.mapper.Map(userForUpdate, userFromRepo);

			await this.unitOfWork.CompleteAsync();
			var user = this.mapper.Map<UserForDetail>(userFromRepo);
			return Ok(user);

		}

		[Authorize(Policy = "RequireCustomerRole")]
		[HttpPut("{id}")]
		public async Task<IActionResult> UpdateUserInfo(int Id, UserForUpdate userForUpdate)
		{
			var currentUserId = int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value);
			var userFromRepo = await this.repo.GetUser(Id);

			if (userFromRepo == null)
				return NotFound("User not found");

			if (currentUserId != userFromRepo.Id)
				return Unauthorized();

			this.mapper.Map(userForUpdate, userFromRepo);

			await this.unitOfWork.CompleteAsync();
			var user = this.mapper.Map<UserForDetail>(userFromRepo);
			return Ok(user);

		}

		[Authorize(Policy = "RequireCustomerRole")]
		[HttpPut("{productId}/product")]
		public async Task<IActionResult> UpdateProductSizeAfterOrder(int productId, ProductForUpdateSize productForUpdateSize)
		{
			var product = await this.productRepo.GetProduct(productId, false);
			product.LastUpdated = DateTime.Now;

			this.mapper.Map(productForUpdateSize, product);

			await this.unitOfWork.CompleteAsync();

			return Ok(product.Sizes);

		}
	}
}