using System;
using Microsoft.AspNetCore.Http;

namespace Shop.API.Dtos.PhotosDto
{
	public class PhotoForCreation
	{
		public string Url { get; set; }
		public IFormFile File { get; set; }
		public string PublicId { get; set; }
		public DateTime DateAdded { get; set; }
		public PhotoForCreation()
		{
			DateAdded = DateTime.Now;
		}

	}
}