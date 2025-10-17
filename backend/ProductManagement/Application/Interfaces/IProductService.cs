// Interfaces/IProductService.cs
using ProductManagement.DTOs;
using ProductManagement.Entities;

namespace ProductManagement.Interfaces
{
    public interface IProductService
    {
        Task<IEnumerable<ProductReadDTO>> GetAllProductsAsync();
        Task<ProductReadDTO?> GetProductByIdAsync(int id);
        Task<ProductReadDTO> CreateProductAsync(ProductCreateDTO productDto);
        Task<ProductReadDTO?> UpdateProductAsync(int id, ProductUpdateDTO productDto);
        Task<bool> DeleteProductAsync(int id);
    }
}