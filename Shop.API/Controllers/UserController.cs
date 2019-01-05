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
		public UserController(IMapper mapper, IUserRepository repo, IUnitOfWork unitOfWork)
		{
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
	}
}