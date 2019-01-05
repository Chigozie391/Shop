using System;

namespace Shop.API.Core.Models
{
	public class Order
	{
		public int Id { get; set; }
		public string Items { get; set; }
		public string Address { get; set; }
		public string PhoneNumber { get; set; }
		public string PhoneNumber2 { get; set; }
		public string City { get; set; }
		public string State { get; set; }
		public User User { get; set; }
		public int UserId { get; set; }
		public DateTime OrderDate { get; set; }
		public bool IsShipped { get; set; }
		public DateTime ShippingDate { get; set; }
	}
}