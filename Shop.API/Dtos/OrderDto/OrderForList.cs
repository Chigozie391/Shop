using System;
using System.ComponentModel.DataAnnotations.Schema;
using Shop.API.Core.Models;

namespace Shop.API.Dtos.OrderDto
{
	public class OrderForList
	{
		public int Id { get; set; }

		[Column(TypeName = "decimal(18, 2)")]
		public decimal TotalPrice { get; set; }

		public string Reference { get; set; }

		public DateTime OrderDate { get; set; }

		public bool IsShipped { get; set; }
	}
}