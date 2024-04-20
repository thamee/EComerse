using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Newtonsoft.Json;
using OnlinePortal.Api.Models.Product;
using OnlinePortal.Api.Services.Products;
using OnlineShoppingDbContext.Entities;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;

namespace OnlinePortal.Api.Controllers
{
    public class ProductController : Controller
    {
        private readonly IProductService _productService;
        private readonly ILogger<ProductController> _logger;

      
        public ProductController(IProductService productService, ILogger<ProductController> logger)
        {
            _productService = productService;
            _logger = logger;
        }

        [HttpPost("product/{productId}/image")]
        [Authorize]
        public async Task<IActionResult> UploadProductImage(int productId, IFormFile image)
        {
            // Convert the image to a byte array
            byte[] imageData;
            using (var memoryStream = new MemoryStream())
            {
                await image.CopyToAsync(memoryStream);
                imageData = memoryStream.ToArray();
            }

            // Add the image to the product in the database
            await _productService.AddProductImageAsync(productId, imageData);

            return Ok();
        }
        [HttpPost("product")]
        [Authorize]
        public async Task<int> CreateProductsAsync([FromBody] CreateProductDto productdto)
        {
            var product = new Product
            {
                Name = productdto.Name,
                Description = productdto.Description,
                CategoryId = productdto.CategoryId,
                Price = productdto.Price,
                Image =  productdto.Image
                

            };

            // Add the product to the database
            return await _productService.CreateProductAsync(product);
        }


        [HttpGet("products")]
        public async Task<List<Product>> GetProductsAsync(string category = null,string pageNumber = null)
        {
            if (!string.IsNullOrEmpty(category) && int.TryParse(category, out int categoryId))
            {
                if (!string.IsNullOrEmpty(pageNumber) && int.TryParse(pageNumber, out int page))
                {
                    // Parse the category to an integer
                    return await _productService.GetAllProductsAsync(categoryId, page);
                }
                // Parse the category to an integer
                return await _productService.GetAllProductsAsync(categoryId);
            }
            else
            {
               
                // Call GetAllProductsAsync without parsing the category
                return await _productService.GetAllProductsAsync();
            }

        }

        [HttpGet("products/{id}")]
        public async Task<Product> GetProductAsync(int Id)
        {
            return await _productService.GetProductAsync(Id);
        }

        [HttpPatch("products/{id}")]
        [Authorize]
        public async Task<int> UpdateProductAsync([FromBody] UpdateProductDto product)
        {
            return await _productService.UpdateProductAsync(product);
        }

        [HttpDelete("products/{id}")]
        [Authorize]
        public async Task<int> DeleteProductAsync(int Id)
        {
            return await _productService.DeleteProductAsync(Id);
        }
    }
}
