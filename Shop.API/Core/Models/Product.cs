using System;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Shop.API.Core.Models
{
	public class Product
	{
		public int Id { get; set; }

		[Required]
		[StringLength(255)]
		public string Title { get; set; }

		[Required]
		[Column(TypeName = "decimal(18, 2)")]
		public decimal Price { get; set; }
		public string Sizes { get; set; }
		public int Sold { get; set; }
		public ChildCategory ChildCategory { get; set; }
		public int ChildCategoryId { get; set; }
		public ICollection<Photo> Photos { get; set; }
		public string Description { get; set; }
		public bool Featured { get; set; }
		public bool Deleted { get; set; }
		public DateTime Created { get; set; }
		public DateTime LastUpdated { get; set; }

		public Product()
		{
			Photos = new Collection<Photo>();
		}

	}
}