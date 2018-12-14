using System.Collections.Generic;

namespace Shop.API.Dtos
{
	public class QueryResultResource<T>
	{
		public IEnumerable<T> Items { get; set; }
		public int TotalItems { get; set; }
	}
}