namespace Shop.API.Dtos.AuthDto
{
	public class UserForLogin
	{
		public string UserName { get; set; }
		public string Password { get; set; }
		public string Email { get; set; }
	}
}