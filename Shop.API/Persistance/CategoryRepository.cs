using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Shop.API.Core;
using Shop.API.Core.Models;

namespace Shop.API.Persistance
{
	public class CategoryRepository : ICategoryRepository
	{
		private readonly DataContext context;

		public CategoryRepository(DataContext context)
		{
			this.context = context;
		}

		public void Add(Category category)
		{
			this.context.Categories.Add(category);
		}

		public async Task<IEnumerable<Category>> GetCategories()
		{
			var categories = await this.context.Categories.Include(x => x.ChildCategories).ToListAsync();

			return categories;
		}

		public async Task<Category> GetCategory(int Id, bool includeChildren = true)
		{
			if (includeChildren)
			{
				return await this.context.Categories
				.Include(x => x.ChildCategories)
				.FirstOrDefaultAsync(x => x.Id == Id);
			}
			else
			{
				return await this.context.Categories.FirstOrDefaultAsync(x => x.Id == Id);
			}
		}

		public async Task<ChildCategory> GetChildCategory(int Id)
		{
			return await this.context.ChildCategories.FirstOrDefaultAsync(x => x.Id == Id);
		}
	}
}