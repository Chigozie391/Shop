using System;
using System.Security.Claims;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Shop.API.Core;
using Shop.API.Dtos.AuthDto;
using Shop.API.Dtos.UserDto;

namespace Shop.API.Controllers
{
	[Authorize(Policy = "RequireCustomerRole")]
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


		[HttpPut("{id}")]
		public async Task<IActionResult> SetDefaultAddress(int Id, UserForSetDefaultAddress userForUpdate)
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

		[HttpPut("{productId}/product")]
		public async Task<IActionResult> UpdateProductSizeAfterOrder(int productId, ProductForUpdateSize productForUpdateSize)
		{
			var product = await this.productRepo.GetProduct(productId, false);
			product.LastUpdated = DateTime.Now;

			this.mapper.Map(productForUpdateSize, product);

			if (await this.unitOfWork.CompleteAsync())
			{
				return Ok();
			}
			return BadRequest("Could not update the product");

		}
	}
}