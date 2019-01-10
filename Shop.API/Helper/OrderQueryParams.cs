namespace Shop.API.Helper
{
	public class OrderQueryParams : IQueryObject
	{
		public bool IsShipped { get; set; }
		public string SortBy { get; set; }
		public bool IsSortAscending { get; set; }
		public int Page { get; set; }
		public byte PageSize { get; set; }
	}
}