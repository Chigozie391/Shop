using System;
using System.ComponentModel.DataAnnotations.Schema;
using Shop.API.Core.Models;

namespace Shop.API.Dtos.UserDto
{
	public class OrderToReturnForUser
	{

		public string Items { get; set; }

		[Column(TypeName = "decimal(18, 2)")]
		public decimal TotalPrice { get; set; }
		public string Reference { get; set; }
		public string Address { get; set; }
		public string PhoneNumber { get; set; }
		public string PhoneNumber2 { get; set; }
		public string City { get; set; }
		public string State { get; set; }
		public UserForThankYou User { get; set; }
		public DateTime OrderDate { get; set; }
	}
}