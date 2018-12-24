using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Shop.API.Core;
using Shop.API.Core.Models;
using Shop.API.Dtos;
using Shop.API.Dtos.ProductDto;
using Shop.API.Helper;

namespace Shop.API.Controllers
{
	[Route("api/[controller]")]
	[ApiController]
	public class ProductsController : ControllerBase
	{
		private readonly IMapper mapper;
		private readonly IUnitOfWork unitOfWork;
		private readonly IProductRepository repo;
		public ProductsController(IMapper mapper, IUnitOfWork unitOfWork, IProductRepository repo)
		{
			this.repo = repo;
			this.unitOfWork = unitOfWork;
			this.mapper = mapper;

		}

		[HttpGet]
		public async Task<IActionResult> GetProducts([FromQuery] ProductQueryParams queryParams)
		{
			var products = await this.repo.GetProducts(queryParams);

			var productToList = this.mapper.Map<QueryResultResource<ProductForList>>(products);

			return Ok(productToList);
		}

		[HttpGet("{id}", Name = "GetProduct")]
		public async Task<IActionResult> GetProduct(int id)
		{
			var product = await this.repo.GetProduct(id);

			var productForDetail = this.mapper.Map<ProductForDetail>(product);

			if (productForDetail == null)
				return NotFound();

			return Ok(productForDetail);
		}

		[HttpPost]
		public async Task<IActionResult> CreateProdut(ProductForCreationOrUpdate productForCreation)
		{
			var product = this.mapper.Map<Product>(productForCreation);
			product.Created = DateTime.Now;
			product.LastUpdated = DateTime.Now;

			this.unitOfWork.Add(product);

			if (await this.unitOfWork.CompleteAsync())
			{
				return Ok(product.Id);
			}
			return BadRequest("Could not create the product");

		}

		[HttpPut("{id}")]
		public async Task<IActionResult> Updateproduct(int id, ProductForCreationOrUpdate productForUpdate)
		{
			var product = await this.repo.GetProduct(id);
			product.LastUpdated = DateTime.Now;

			this.mapper.Map(productForUpdate, product);

			if (await this.unitOfWork.CompleteAsync())
			{
				var updatedProduct = await this.repo.GetProduct(product.Id);

				var productToReturn = this.mapper.Map<ProductForDetail>(updatedProduct);

				return CreatedAtRoute("GetProduct", new { id = product.Id }, productToReturn);
			}
			return BadRequest("Could not update the product");

		}

		[HttpPost("{id}/setfeatured")]
		public async Task<IActionResult> SetFeature(int id)
		{
			var product = await this.repo.GetProduct(id, false);
			if (product == null)
				return NotFound();

			if (product.Featured)
			{
				product.Featured = false;
			}
			else
			{
				product.Featured = true;
			}
			product.LastUpdated = DateTime.Now;

			await this.unitOfWork.CompleteAsync();
			return Ok();
		}

		[HttpDelete("{id}")]
		public async Task<IActionResult> DeleteProduct(int id)
		{
			var product = await this.repo.GetProduct(id, false);
			this.unitOfWork.Remove(product);

			if (await this.unitOfWork.CompleteAsync())
				return Ok(id);

			return BadRequest("Could not delete the product");

		}

		[HttpPost("{id}/archive")]
		public async Task<IActionResult> ArchiveProduct(int id)
		{
			var product = await this.repo.GetProduct(id, false);

			if (product.Featured)
				return BadRequest("Can not archive featured product");

			product.Deleted = true;
			product.LastUpdated = DateTime.Now;


			if (await this.unitOfWork.CompleteAsync())
				return Ok(id);

			return BadRequest("Could not archive the product");

		}

		[HttpGet("archive")]
		public async Task<IActionResult> GetArchiveProducts([FromQuery] ProductQueryParams queryParams)
		{
			var products = await this.repo.GetArchiveProduct(queryParams);

			var productToList = this.mapper.Map<QueryResultResource<ProductForList>>(products);

			return Ok(productToList);
		}


		[HttpPost("{id}/restore")]
		public async Task<IActionResult> RestoreProduct(int id)
		{
			var product = await this.repo.GetProduct(id, false);

			if (!product.Deleted)
				return BadRequest("Product is not archived");

			product.Deleted = false;

			if (await this.unitOfWork.CompleteAsync())
				return Ok(id);

			return BadRequest("Could not restore the product");
		}
	}
}