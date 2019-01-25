using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Shop.API.Core;
using Shop.API.Core.Models;

namespace Shop.API.Persistance
{
	public class CarouselRepository : ICarouselRepository
	{
		private readonly DataContext context;
		public CarouselRepository(DataContext context)
		{
			this.context = context;
		}
		public async Task<Carousel> GetSlide(int id)
		{
			var slide = await this.context.Carousels.FirstOrDefaultAsync(x => x.Id == id);
			return slide;
		}
		public async Task<ICollection<Carousel>> GetSlides()
		{
			var slides = await this.context.Carousels.ToArrayAsync();
			return slides;
		}
	}
}