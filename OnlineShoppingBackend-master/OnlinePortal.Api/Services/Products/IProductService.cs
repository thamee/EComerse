using OnlinePortal.Api.Models.Product;
using OnlineShoppingDbContext.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace OnlinePortal.Api.Services.Products
{
    public interface IProductService 
    {
		/// <summary>
		/// Create Client
		/// </summary>
		/// <param name="product"></param>
		/// <returns></returns>
		Task<int> CreateProductAsync(Product product);
		Task<int> AddProductImageAsync(int productId, byte[] imageData);


		Task<List<Product>> GetAllProductsAsync(int category=0,int pageSize=0);

		Task<Product> GetProductAsync(int Id);

		Task<int> UpdateProductAsync(UpdateProductDto product);

		Task<int> DeleteProductAsync(int Id);
	}
}
