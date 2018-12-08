using AutoMapper;
using Shop.API.Core.Models;
using Shop.API.Dtos.CategoryDto;
using Shop.API.Dtos.PhotosDto;
using Shop.API.Dtos.ProductDto;
using System.Collections.Generic;

namespace Shop.API.Mapping
{
	public class MappingProfile : Profile
	{
		public MappingProfile()
		{

			// API TO USER

			// category
			CreateMap<Category, CategoryForReturn>();
			CreateMap<ChildCategory, Dtos.CategoryDto.KeyValuePair>();

			// product
			CreateMap<Product, ProductToReturn>();
			CreateMap<Product, IEnumerable<ProductForList>>();

			//Photo
			CreateMap<Photo, IEnumerable<PhotoForReturn>>();



			// USER TO API

			// category
			CreateMap<CategoryForCreation, Category>();
			CreateMap<ChildCategoryForCreation, ChildCategory>();
			CreateMap<CategoryOrChildCategoryForUpdate, Category>();
			CreateMap<CategoryOrChildCategoryForUpdate, ChildCategory>();

			// product
			CreateMap<ProductForCreationOrUpdate, Product>();
		}
	}
}