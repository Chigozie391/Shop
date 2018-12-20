using System.Collections.Generic;
using Microsoft.AspNetCore.Identity;

namespace Shop.API.Core.Models {
	public class User : IdentityUser<int> {
		public string Gender { get; set; }

		public ICollection<UserRole> UserRoles { get; set; }

	}
}