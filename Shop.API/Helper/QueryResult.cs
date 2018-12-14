using System.Collections.Generic;

namespace Shop.API.Helper
{
	public class QueryResult<T>
	{
		public IEnumerable<T> Items { get; set; }
		public int TotalItems { get; set; }
	}
}