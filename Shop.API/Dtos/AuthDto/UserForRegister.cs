using System.ComponentModel.DataAnnotations;

namespace Shop.API.Dtos.AuthDto
{
	public class UserForRegister
	{
		[Required]
		public string UserName { get; set; }

		[Required]
		public string Gender { get; set; }

		[Required]
		[StringLength(8, MinimumLength = 6, ErrorMessage = "You must specify a password between 6 and 8 characters")]
		public string Password { get; set; }

		[Required]
		[EmailAddress]
		public string Email { get; set; }
		public string Role = "Customer";
	}
}