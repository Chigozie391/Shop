using System.Threading.Tasks;
using AutoMapper;
using CloudinaryDotNet;
using CloudinaryDotNet.Actions;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using Shop.API.Core;
using Shop.API.Core.Models;
using Shop.API.Dtos.PhotosDto;
using Shop.API.Helper;

namespace Shop.API.Controllers
{
	[Authorize(Policy = "RequireModeratorRole")]
	[Route("api/[controller]")]
	public class CarouselController : Controller
	{
		private readonly IMapper mapper;
		private readonly ICarouselRepository repo;
		private readonly IUnitOfWork unitOfWork;
		private readonly IOptions<CloudinarySettings> cloudinaryConfig;
		private Cloudinary cloudinary;

		public CarouselController(IMapper mapper, ICarouselRepository repo,
		 IOptions<CloudinarySettings> cloudinaryConfig, IUnitOfWork unitOfWork)
		{
			this.unitOfWork = unitOfWork;
			this.repo = repo;
			this.mapper = mapper;
			this.cloudinaryConfig = cloudinaryConfig;

			Account acc = new Account(
				 this.cloudinaryConfig.Value.CloudName,
				 this.cloudinaryConfig.Value.ApiKey,
				 this.cloudinaryConfig.Value.ApiSecret
			);
			this.cloudinary = new Cloudinary(acc);
		}

		[HttpGet]
		public async Task<IActionResult> GetSlides()
		{
			var sliders = await this.repo.GetSlides();
			return Ok(sliders);
		}

		[HttpPost]
		public async Task<IActionResult> AddSlide([FromForm]PhotoForCreation photoForCreation)
		{
			var file = photoForCreation.File;

			var uploadResult = new ImageUploadResult();

			if (file.Length > 0)
			{
				using (var stream = file.OpenReadStream())
				{
					var uploadParams = new ImageUploadParams()
					{
						File = new FileDescription(file.Name, stream),
						Folder = "shop/carousel"
					};
					uploadResult = this.cloudinary.Upload(uploadParams);
				};

				photoForCreation.Url = uploadResult.Uri.ToString();
				photoForCreation.PublicId = uploadResult.PublicId;

				var slide = this.mapper.Map<Carousel>(photoForCreation);
				this.unitOfWork.Add(slide);

				if (await this.unitOfWork.CompleteAsync())
				{
					return Ok(slide);
				}

			}
			return BadRequest("Could not add the photo");

		}

		[HttpDelete("{id}")]
		public async Task<IActionResult> DeleteSlide(int id)
		{
			var slide = await this.repo.GetSlide(id);
			if (slide == null)
				return NotFound();

			var deleteParams = new DeletionParams(slide.PublicId);

			var result = this.cloudinary.Destroy(deleteParams);

			if (result.Result == "ok")
				this.unitOfWork.Remove(slide);

			if (await this.unitOfWork.CompleteAsync())
				return Ok(id);

			return BadRequest("Could not delete photo");

		}
	}
}