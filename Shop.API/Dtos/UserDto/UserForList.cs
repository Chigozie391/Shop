using System;
using System.Collections.Generic;

namespace Shop.API.Dtos.UserDto
{
	public class UserForList
	{
		public int Id { get; set; }
		public string Email { get; set; }
		public string FirstName { get; set; }
		public string LastName { get; set; }
		public DateTime LastActive { get; set; }
		public ICollection<String> Roles { get; set; }
	}
}