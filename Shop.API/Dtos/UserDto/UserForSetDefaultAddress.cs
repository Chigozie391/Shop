namespace Shop.API.Dtos.UserDto
{
	public class UserForSetAddress
	{
		public string PhoneNumber { get; set; }
		public string Address { get; set; }
		public string City { get; set; }
		public string State { get; set; }
		public bool HasDefaultAddress { get; set; }
	}
}