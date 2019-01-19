namespace Shop.API.Helper
{
	public class UserQueryParams : IQueryObject
	{
		public string SortBy { get; set; }
		public bool IsSortAscending { get; set; }
		public byte PageSize { get; set; }
		public int Page { get; set; }
	}
}