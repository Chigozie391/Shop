using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using CloudinaryDotNet;
using CloudinaryDotNet.Actions;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using Shop.API.Core;
using Shop.API.Core.Models;
using Shop.API.Dtos.PhotosDto;
using Shop.API.Helper;

namespace Shop.API.Controllers
{
	[Route("api/products/{productId}/photos")]
	public class PhotosController : Controller
	{
		private readonly IOptions<CloudinarySettings> cloudinaryConfig;
		private readonly IMapper mapper;
		private Cloudinary cloudinary;
		private readonly IProductRepository productRepo;
		private readonly IUnitOfWork unitOfWork;
		private readonly IPhotoRepository photoRepo;

		public PhotosController(IPhotoRepository photoRepo, IUnitOfWork unitOfWork, IProductRepository productRepo,
		IMapper mapper, IOptions<CloudinarySettings> cloudinaryConfig)
		{
			this.photoRepo = photoRepo;
			this.unitOfWork = unitOfWork;
			this.productRepo = productRepo;
			this.mapper = mapper;
			this.cloudinaryConfig = cloudinaryConfig;

			Account acc = new Account(
				 this.cloudinaryConfig.Value.CloudName,
				 this.cloudinaryConfig.Value.ApiKey,
				 this.cloudinaryConfig.Value.ApiSecret
			);
			this.cloudinary = new Cloudinary(acc);
		}

		[HttpGet("{id}", Name = "GetPhoto")]
		public async Task<IActionResult> GetPhoto(int id)
		{
			var photo = await this.photoRepo.GetPhoto(id);
			var photoToReturn = this.mapper.Map<PhotoForReturn>(photo);

			return Ok(photoToReturn);
		}

		[HttpPost]
		public async Task<IActionResult> AddPhotoForProduct(int productId, PhotoForCreation photoForCreation)
		{
			var product = await this.productRepo.GetProduct(productId, true);
			if (product == null)
				return BadRequest("Could not find product");


			var file = photoForCreation.File;

			var uploadResult = new ImageUploadResult();

			if (file.Length > 0)
			{
				using (var stream = file.OpenReadStream())
				{
					var uploadParams = new ImageUploadParams()
					{
						File = new FileDescription(file.Name, stream),
						Folder = "shop"
					};
					uploadResult = this.cloudinary.Upload(uploadParams);
				};

				photoForCreation.Url = uploadResult.Uri.ToString();
				photoForCreation.PublicId = uploadResult.PublicId;

				var photo = this.mapper.Map<Photo>(photoForCreation);

				photo.Products = product;

				if (!product.Photos.Any(x => x.IsMain))
					photo.IsMain = true;

				product.Photos.Add(photo);

				if (await this.unitOfWork.CompleteAsync())
				{
					var photoToReturn = this.mapper.Map<PhotoForReturn>(photo);

					return CreatedAtRoute("GetPhoto", new { id = photo.Id }, photoToReturn);
				}

			}
			return BadRequest("Could not add the photo");
		}


		[HttpPost("{photoid}/setMain")]
		public async Task<IActionResult> SetMainPhoto(int productId, int photoid)
		{
			var photo = await this.photoRepo.GetPhoto(photoid);

			if (photo == null)
				return NotFound();

			if (photo.IsMain)
				BadRequest("This is already the  main photo");

			var currentMainPhoto = await this.photoRepo.GetMainPhotoForProduct(productId);
			if (currentMainPhoto != null)
				currentMainPhoto.IsMain = false;

			photo.IsMain = true;

			if (await this.unitOfWork.CompleteAsync())
				return NoContent();

			return BadRequest("Could not set main photo");

		}

		[HttpDelete("{photoid}")]
		public async Task<IActionResult> DeletePhoto(int photoid)
		{
			var photo = await this.photoRepo.GetPhoto(photoid);
			if (photo == null)
				return NotFound();

			if (photo.IsMain)
				return BadRequest("You can not delete the main photo");

			var deleteParams = new DeletionParams(photo.PublicId);
			var result = this.cloudinary.Destroy(deleteParams);

			if (result.Result == "ok")
				this.unitOfWork.Remove(photo);

			if (await this.unitOfWork.CompleteAsync())
				return Ok(photoid);

			return BadRequest("Could not delete photo");

		}

	}
}