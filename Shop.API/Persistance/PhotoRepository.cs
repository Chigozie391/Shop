using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Shop.API.Core;
using Shop.API.Core.Models;

namespace Shop.API.Persistance
{
	public class PhotoRepository : IPhotoRepository
	{
		private readonly DataContext context;
		public PhotoRepository(DataContext context)
		{
			this.context = context;
		}

		public Task<Photo> GetPhoto(int id)
		{
			return this.context.Photos
			.IgnoreQueryFilters()
			.FirstOrDefaultAsync(x => x.Id == id);
		}
		public async Task<Photo> GetMainPhotoForProduct(int photoid)
		{
			return await this.context.Photos
				.IgnoreQueryFilters()
				.Where(u => u.ProductId == photoid)
				.FirstOrDefaultAsync(p => p.IsMain);
		}
	}
}