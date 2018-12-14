using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;

namespace Shop.API.Helper
{
	public static class IQueryableExtensions
	{
		public static IQueryable<T> ApplyOrdering<T>(this IQueryable<T> query,
			IQueryObject queryParams, Dictionary<string, Expression<Func<T, object>>> columMap
		)
		{
			if (string.IsNullOrWhiteSpace(queryParams.SortBy) || !columMap.ContainsKey(queryParams.SortBy))
			{
				return query;
			}

			if (queryParams.IsSortAscending)
				return query = query.OrderBy(columMap[queryParams.SortBy]);
			else
				return query = query.OrderByDescending(columMap[queryParams.SortBy]);

		}

		public static IQueryable<T> ApplyPaging<T>(this IQueryable<T> query, IQueryObject queryObject)
		{
			if (queryObject.PageSize <= 0)
				queryObject.PageSize = 10;

			if (queryObject.Page <= 0)
				queryObject.Page = 1;


			return query = query.Skip((queryObject.Page - 1) * queryObject.PageSize).Take(queryObject.PageSize);
		}


	}
}