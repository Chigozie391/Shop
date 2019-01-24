using System.ComponentModel.DataAnnotations;

namespace Shop.API.Dtos.UserDto
{
	public class ChangePassword
	{
		public string OldPassword { get; set; }

		[Required]
		[StringLength(20, MinimumLength = 6, ErrorMessage = "You password must atleast be 6 characters long")]
		public string NewPassword { get; set; }
	}
}