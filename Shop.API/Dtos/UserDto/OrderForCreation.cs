using System;
using System.ComponentModel.DataAnnotations;

namespace Shop.API.Dtos.UserDto
{
	public class OrderForCreation
	{
		public OrderForCreation()
		{
			this.OrderDate = DateTime.Now;
		}
		[Required]
		public string Items { get; set; }

		[Required]
		public decimal TotalPrice { get; set; }

		[Required]
		public decimal Reference { get; set; }

		[Required]
		public string Address { get; set; }

		[Required]
		public string City { get; set; }

		[Required]
		public string State { get; set; }

		[Required]
		public string PhoneNumber { get; set; }
		public string PhoneNumber2 { get; set; }

		public DateTime OrderDate { get; set; }
		public bool IsShipped { get; set; }
		public DateTime ShippingDate { get; set; }

	}
}