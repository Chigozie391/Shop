using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using Shop.API.Core;
using Shop.API.Core.Models;
using Shop.API.Dtos.AuthDto;

namespace Shop.API.Controllers
{
	[AllowAnonymous]
	[Route("api/[controller]")]
	[ApiController]
	public class AuthController : ControllerBase
	{
		private readonly IAuthRepository repo;
		private readonly IMapper mapper;
		private readonly IConfiguration config;
		private readonly UserManager<User> userManager;
		private readonly SignInManager<User> signInManager;

		public AuthController(IAuthRepository repo,
			IMapper mapper,
			IConfiguration config,
			UserManager<User> userManager,
			SignInManager<User> signInManager)
		{
			this.repo = repo;
			this.mapper = mapper;
			this.config = config;
			this.userManager = userManager;
			this.signInManager = signInManager;
		}

		[HttpPost("register")]
		public async Task<IActionResult> Register(UserForRegister userForRegister)
		{
			var userToCreate = this.mapper.Map<User>(userForRegister);
			var result = await this.userManager.CreateAsync(userToCreate, userForRegister.Password);

			if (result.Succeeded)
			{
				await this.userManager.AddToRoleAsync(userToCreate, userForRegister.Role);

				return Ok();
			}
			return BadRequest(result.Errors);

		}

		[HttpPost("login")]
		public async Task<IActionResult> Login(UserForLogin userForLoginDto)
		{
			var userToLogin = await this.userManager.FindByEmailAsync(userForLoginDto.Email);

			if (userToLogin != null)
			{
				var result = await this.signInManager.CheckPasswordSignInAsync(userToLogin, userForLoginDto.Password, false);
				if (result.Succeeded)
				{
					var appUser = await this.userManager.Users
										.FirstOrDefaultAsync(u => u.NormalizedEmail == userForLoginDto.Email.ToUpper());

					var user = this.mapper.Map<UserForDetail>(appUser);
					return Ok(new { tokenString = GenerateJwtToken(appUser).Result, user });
				}
			}
			return BadRequest("Username or password is not correct");
		}

		private async Task<string> GenerateJwtToken(User user)
		{
			var claim = new List<Claim>
			{
				// id as the identitifier
				new Claim(ClaimTypes.NameIdentifier,user.Id.ToString()),
				new Claim(ClaimTypes.Name,user.UserName),
			};

			var roles = await this.userManager.GetRolesAsync(user);

			foreach (var role in roles)
			{
				claim.Add(new Claim(ClaimTypes.Role, role));
			}

			var key = new SymmetricSecurityKey(Encoding.ASCII.GetBytes(this.config.GetSection("AppSettings:Token").Value));
			var cred = new SigningCredentials(key, SecurityAlgorithms.HmacSha512Signature);

			var tokenDescriptor = new SecurityTokenDescriptor
			{
				Subject = new ClaimsIdentity(claim),
				Expires = DateTime.Now.AddDays(1),
				SigningCredentials = cred
			};

			//generate token
			var tokenHandler = new JwtSecurityTokenHandler();
			var token = tokenHandler.CreateToken(tokenDescriptor);
			var tokenString = tokenHandler.WriteToken(token);
			return tokenString;

		}

	}
}