using AutoMapper;
using Shop.API.Core.Models;
using Shop.API.Dtos.CategoryDto;
using Shop.API.Dtos.PhotosDto;
using Shop.API.Dtos.ProductDto;
using System.Collections.Generic;
using System.Linq;

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
			CreateMap<Product, ProductForList>()
			.ForMember(des => des.PhotoUrl, opt =>
			{
				opt.MapFrom(src => src.Photos.FirstOrDefault(p => p.IsMain).Url);
			})
			.ForMember(des => des.ChildCategoryName, opt =>
			{
				opt.MapFrom(src => src.ChildCategory.Name);
			})
			.ForMember(des => des.CategoryName, opt =>
			{
				opt.MapFrom(src => src.ChildCategory.Category.Name);
			});

			CreateMap<Product, ProductForDetail>()
			.ForMember(des => des.PhotoUrl, opt =>
			{
				opt.MapFrom(src => src.Photos.FirstOrDefault(p => p.IsMain).Url);
			})
			.ForMember(des => des.ChildCategoryName, opt =>
			{
				opt.MapFrom(src => src.ChildCategory.Name);
			})
			.ForMember(des => des.ChildCategoryId, opt =>
			{
				opt.MapFrom(src => src.ChildCategory.Id);
			})
			.ForMember(des => des.CategoryId, opt =>
			{
				opt.MapFrom(src => src.ChildCategory.Category.Id);
			})
			.ForMember(des => des.CategoryName, opt =>
			{
				opt.MapFrom(src => src.ChildCategory.Category.Name);
			});


			// USER TO API

			// category
			CreateMap<CategoryForCreation, Category>();
			CreateMap<ChildCategoryForCreation, ChildCategory>();
			CreateMap<CategoryOrChildCategoryForUpdate, Category>();
			CreateMap<CategoryOrChildCategoryForUpdate, ChildCategory>();

			// product
			CreateMap<ProductForCreationOrUpdate, Product>();

			// Photo
			CreateMap<PhotoForCreation, Photo>();

		}
	}
}