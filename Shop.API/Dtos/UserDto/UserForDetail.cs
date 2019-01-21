using System;
using System.Collections.Generic;
using Shop.API.Core.Models;

namespace Shop.API.Dtos.UserDto
{
	public class UserForDetail
	{
		public int Id { get; set; }
		public string Email { get; set; }
		public string FirstName { get; set; }
		public string LastName { get; set; }
		public DateTime JoinDate { get; set; }
		public DateTime LastActive { get; set; }
		public string PhoneNumber { get; set; }
		public string Address { get; set; }
		public string City { get; set; }
		public string State { get; set; }
		public bool HasDefaultAddress { get; set; }
		public ICollection<RoleForReturn> Roles { get; set; }
	}

}