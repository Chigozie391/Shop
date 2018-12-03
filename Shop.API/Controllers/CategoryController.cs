using System.Collections.Generic;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Shop.API.Core;
using Shop.API.Core.Models;
using Shop.API.Dtos;
using Shop.API.Mapping;
using Shop.API.Persistance;

namespace Shop.API.Controllers
{
	[Route("api/[controller]")]
	[ApiController]
	public class CategoryController : ControllerBase
	{
		private readonly IMapper mapper;
		private readonly ICategoryRepository repo;
		private readonly IUnitOfWork unitOfWork;

		public CategoryController(IMapper mapper, ICategoryRepository repo, IUnitOfWork unitOfWork)
		{
			this.mapper = mapper;
			this.repo = repo;
			this.unitOfWork = unitOfWork;
		}

		// gets category with all children
		[HttpGet]
		public async Task<IActionResult> GetCategories()
		{
			var categories = await this.repo.GetCategories();

			var result = this.mapper.Map<IEnumerable<CategoryForReturn>>(categories);
			return Ok(result);
		}

		// create new parent category
		[HttpPost]
		public async Task<IActionResult> AddCategory(CategoryForCreation categoryForCreation)
		{
			var category = this.mapper.Map<Category>(categoryForCreation);
			this.unitOfWork.Add(category);
			await this.unitOfWork.CompleteAsync();

			category = await this.repo.GetCategory(category.Id, includeChildren: false);

			var result = this.mapper.Map<CategoryForReturn>(category);

			return Ok(result);

		}

		// create child category of a parent
		[HttpPost("createChildCategory/{id}")]
		public async Task<IActionResult> CreateChildCategory(int Id, ChildCategoryForCreation childCategoryDto)
		{
			var category = await this.repo.GetCategory(Id);

			if (category == null)
				return NotFound("The parent category does not exist");

			var childCat = this.mapper.Map<ChildCategory>(childCategoryDto);

			childCat.Catogories = category;
			category.ChildCategories.Add(childCat);

			await this.unitOfWork.CompleteAsync();
			var result = this.mapper.Map<CategoryForReturn>(category);

			return Ok(result);

		}

		[HttpPut("{id}")]
		public async Task<IActionResult> UodateCaegory(int Id, CategoryOrChildCategoryForUpdate categoryOrChild)
		{
			var category = await this.repo.GetCategory(Id);
			this.mapper.Map(categoryOrChild, category);
			await this.unitOfWork.CompleteAsync();

			category = await this.repo.GetCategory(Id);

			var result = this.mapper.Map<CategoryForReturn>(category);

			return Ok(result);
		}

		[HttpPut("updateChildCategory/{id}")]
		public async Task<IActionResult> UodateChildCategory(int Id, CategoryOrChildCategoryForUpdate childCategoryForUpdate)
		{
			var childCategory = await this.repo.GetChildCategory(Id);

			this.mapper.Map(childCategoryForUpdate, childCategory);
			await this.unitOfWork.CompleteAsync();

			var category = await this.repo.GetCategory(childCategory.CategoryId);

			var result = this.mapper.Map<CategoryForReturn>(category);

			return Ok(result);
		}

		[HttpDelete("{id}")]
		public async Task<IActionResult> DeleteCategory(int Id)
		{
			var category = await this.repo.GetCategory(Id);
			this.unitOfWork.Remove(category);
			await this.unitOfWork.CompleteAsync();

			return Ok(Id);
		}

		[HttpDelete("deleteChildCategory/{id}")]
		public async Task<IActionResult> DeleteChildCategory(int Id)
		{
			var childCategory = await this.repo.GetChildCategory(Id);

			this.unitOfWork.Remove(childCategory);

			await this.unitOfWork.CompleteAsync();

			return Ok(Id);
		}

	}
}