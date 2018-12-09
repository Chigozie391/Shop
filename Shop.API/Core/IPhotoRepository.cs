using System.Threading.Tasks;
using Shop.API.Core.Models;

namespace Shop.API.Core
{
	public interface IPhotoRepository
	{
		Task<Photo> GetPhoto(int id);
		Task<Photo> GetMainPhotoForProduct(int photoid);
	}
}