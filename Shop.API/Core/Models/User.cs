using System.Collections.Generic;
using Microsoft.AspNetCore.Identity;

namespace Shop.API.Core.Models
{
	public class User : IdentityUser<int>
	{
		public string FirstName { get; set; }
		public string LastName { get; set; }
		public string Address { get; set; }
		public string City { get; set; }
		public string State { get; set; }
		public ICollection<UserRole> UserRoles { get; set; }

	}
}