using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Shop.API.Core;

namespace Shop.API.Controllers
{
	[Authorize(Policy = "RequireModeratorRole")]
	[Route("api/[controller]")]
	[ApiController]
	public class AdminController : ControllerBase
	{
		private readonly IMapper mapper;
		private readonly IAdminRepository repo;
		public AdminController(IMapper mapper, IAdminRepository repo)
		{
			this.repo = repo;
			this.mapper = mapper;
		}

		[HttpGet("counters")]
		public async Task<IActionResult> GetDashboardInfo()
		{
			var counter = await this.repo.DashboardCounter();
			return Ok(counter);
		}
	}
}