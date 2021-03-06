namespace Shop.API.Helper
{
	public class ProductQueryParams : IQueryObject
	{
		public bool LowItems { get; set; }
		public bool Deleted { get; set; }
		public string SortBy { get; set; }
		public bool IsSortAscending { get; set; }
		public int Page { get; set; }
		public byte PageSize { get; set; }
	}
}