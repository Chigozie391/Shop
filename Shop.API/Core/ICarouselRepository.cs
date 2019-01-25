using System.Collections.Generic;
using System.Threading.Tasks;
using Shop.API.Core.Models;

namespace Shop.API.Core
{
	public interface ICarouselRepository
	{
		Task<Carousel> GetSlide(int id);
		Task<ICollection<Carousel>> GetSlides();
	}
}