using AutoMapper;
using Shop.API.Core.Models;
using Shop.API.Dtos;

namespace Shop.API.Mapping
{
	public class MappingProfile : Profile
	{
		public MappingProfile()
		{

			// api to user
			CreateMap<Category, CategoryForReturn>();
			CreateMap<ChildCategory, KeyValuePair>();

			//user to api
			CreateMap<CategoryForCreation, Category>();
			CreateMap<ChildCategoryForCreation, ChildCategory>();
			CreateMap<CategoryOrChildCategoryForUpdate, Category>();
			CreateMap<CategoryOrChildCategoryForUpdate, ChildCategory>();
		}
	}
}