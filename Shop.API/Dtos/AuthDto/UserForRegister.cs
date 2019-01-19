using System;
using System.ComponentModel.DataAnnotations;

namespace Shop.API.Dtos.AuthDto
{
	public class UserForRegister
	{
		[Required]
		public string UserName { get; set; }
		[Required]
		public string FirstName { get; set; }

		[Required]
		public string PhoneNumber { get; set; }

		[Required]
		public string LastName { get; set; }

		[Required]
		[StringLength(50, MinimumLength = 6, ErrorMessage = "You must specify a password between 6 and 8 characters")]
		public string Password { get; set; }

		[Required]
		[EmailAddress]
		public string Email { get; set; }
		public string Role = "Customer";
		public DateTime JoinDate { get; set; }

		public UserForRegister()
		{
			this.JoinDate = DateTime.Now;
		}

	}
}