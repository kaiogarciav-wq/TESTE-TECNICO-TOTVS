// DTOs/ProductDTOs.cs
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace ProductManagement.DTOs
{
    // DTO para criar um novo produto
    public class ProductCreateDTO
    {
        [Required(ErrorMessage = "O nome do produto é obrigatório.")]
        [MaxLength(255, ErrorMessage = "O nome não pode exceder 255 caracteres.")]
        public string Name { get; set; } = string.Empty;

        [Required(ErrorMessage = "O SKU é obrigatório.")]
        [MaxLength(50, ErrorMessage = "O SKU não pode exceder 50 caracteres.")]
        public string Sku { get; set; } = string.Empty;

        [MaxLength(1000, ErrorMessage = "A descrição não pode exceder 1000 caracteres.")]
        public string? Description { get; set; }

        [Required(ErrorMessage = "O preço é obrigatório.")]
        [Range(0.01, double.MaxValue, ErrorMessage = "O preço deve ser maior que zero.")]
        public decimal Price { get; set; }

        [Required(ErrorMessage = "O estoque total é obrigatório.")]
        [Range(0, int.MaxValue, ErrorMessage = "O estoque total deve ser um número não negativo.")]
        public int TotalStock { get; set; }

        [Required(ErrorMessage = "O estoque disponível é obrigatório.")]
        [Range(0, int.MaxValue, ErrorMessage = "O estoque disponível deve ser um número não negativo.")]
        public int AvailableStock { get; set; }

        [Range(0, int.MaxValue, ErrorMessage = "O estoque reservado deve ser um número não negativo.")]
        public int ReservedStock { get; set; } = 0;

        [MaxLength(50, ErrorMessage = "A unidade não pode exceder 50 caracteres.")]
        public string Unit { get; set; } = "unidade";

        [Range(0, int.MaxValue, ErrorMessage = "As localizações ativas devem ser um número não negativo.")]
        public int ActiveLocations { get; set; } = 0;

        public DateTime? NextDueDate { get; set; }

        public Guid? CategoryId { get; set; }
        public Guid? SubcategoryId { get; set; }

        [MaxLength(100, ErrorMessage = "A marca não pode exceder 100 caracteres.")]
        public string? Brand { get; set; }

        [MaxLength(100, ErrorMessage = "O modelo não pode exceder 100 caracteres.")]
        public string? Model { get; set; }

        [MaxLength(100, ErrorMessage = "O material não pode exceder 100 caracteres.")]
        public string? Material { get; set; }

        [Range(0.01, double.MaxValue, ErrorMessage = "O peso deve ser maior que zero.")]
        public decimal? WeightKg { get; set; }

        [MaxLength(100, ErrorMessage = "As dimensões não podem exceder 100 caracteres.")]
        public string? DimensionsCm { get; set; }

        [MaxLength(50, ErrorMessage = "A cor não pode exceder 50 caracteres.")]
        public string? Color { get; set; }

        [MaxLength(50, ErrorMessage = "O tamanho não pode exceder 50 caracteres.")]
        public string? Size { get; set; }

        public Dictionary<string, string>? Specifications { get; set; }

        [Range(1, int.MaxValue, ErrorMessage = "A condição deve ser um número positivo.")]
        public int Condition { get; set; } = 1; // Default 1: Novo

        [MaxLength(100, ErrorMessage = "O país de origem não pode exceder 100 caracteres.")]
        public string? CountryOfOrigin { get; set; }

        [Range(0, int.MaxValue, ErrorMessage = "A garantia em meses deve ser um número não negativo.")]
        public int? WarrantyMonths { get; set; }
    }

    // DTO para atualizar um produto
    public class ProductUpdateDTO
    {
        [MaxLength(255, ErrorMessage = "O nome não pode exceder 255 caracteres.")]
        public string? Name { get; set; }

        [MaxLength(50, ErrorMessage = "O SKU não pode exceder 50 caracteres.")]
        public string? Sku { get; set; }

        [MaxLength(1000, ErrorMessage = "A descrição não pode exceder 1000 caracteres.")]
        public string? Description { get; set; }

        [Range(0.01, double.MaxValue, ErrorMessage = "O preço deve ser maior que zero.")]
        public decimal? Price { get; set; }

        [Range(0, int.MaxValue, ErrorMessage = "O estoque total deve ser um número não negativo.")]
        public int? TotalStock { get; set; }

        [Range(0, int.MaxValue, ErrorMessage = "O estoque disponível deve ser um número não negativo.")]
        public int? AvailableStock { get; set; }

        [Range(0, int.MaxValue, ErrorMessage = "O estoque reservado deve ser um número não negativo.")]
        public int? ReservedStock { get; set; }

        [MaxLength(50, ErrorMessage = "A unidade não pode exceder 50 caracteres.")]
        public string? Unit { get; set; }

        [Range(0, int.MaxValue, ErrorMessage = "As localizações ativas devem ser um número não negativo.")]
        public int? ActiveLocations { get; set; }

        public DateTime? NextDueDate { get; set; }

        public Guid? CategoryId { get; set; }
        public Guid? SubcategoryId { get; set; }

        [MaxLength(100, ErrorMessage = "A marca não pode exceder 100 caracteres.")]
        public string? Brand { get; set; }

        [MaxLength(100, ErrorMessage = "O modelo não pode exceder 100 caracteres.")]
        public string? Model { get; set; }

        [MaxLength(100, ErrorMessage = "O material não pode exceder 100 caracteres.")]
        public string? Material { get; set; }

        [Range(0.01, double.MaxValue, ErrorMessage = "O peso deve ser maior que zero.")]
        public decimal? WeightKg { get; set; }

        [MaxLength(100, ErrorMessage = "As dimensões não podem exceder 100 caracteres.")]
        public string? DimensionsCm { get; set; }

        [MaxLength(50, ErrorMessage = "A cor não pode exceder 50 caracteres.")]
        public string? Color { get; set; }

        [MaxLength(50, ErrorMessage = "O tamanho não pode exceder 50 caracteres.")]
        public string? Size { get; set; }

        public Dictionary<string, string>? Specifications { get; set; }

        [Range(1, int.MaxValue, ErrorMessage = "A condição deve ser um número positivo.")]
        public int? Condition { get; set; }

        [MaxLength(100, ErrorMessage = "O país de origem não pode exceder 100 caracteres.")]
        public string? CountryOfOrigin { get; set; }

        [Range(0, int.MaxValue, ErrorMessage = "A garantia em meses deve ser um número não negativo.")]
        public int? WarrantyMonths { get; set; }
    }

    // DTO para retornar detalhes do produto
    public class ProductReadDTO
    {
        public int Id { get; set; }
        public string Name { get; set; } = string.Empty;
        public string Sku { get; set; } = string.Empty;
        public string? Description { get; set; }
        public decimal Price { get; set; }
        public int TotalStock { get; set; }
        public int AvailableStock { get; set; }
        public int ReservedStock { get; set; }
        public string Unit { get; set; } = string.Empty;
        public int ActiveLocations { get; set; }
        public DateTime? NextDueDate { get; set; }
        public Guid? CategoryId { get; set; }
        public string? CategoryName { get; set; } // Adicionado para exibir o nome da categoria
        public Guid? SubcategoryId { get; set; }
        public string? SubcategoryName { get; set; } // Adicionado para exibir o nome da subcategoria
        public string? Brand { get; set; }
        public string? Model { get; set; }
        public string? Material { get; set; }
        public decimal? WeightKg { get; set; }
        public string? DimensionsCm { get; set; }
        public string? Color { get; set; }
        public string? Size { get; set; }
        public Dictionary<string, string>? Specifications { get; set; }
        public int Condition { get; set; }
        public string? CountryOfOrigin { get; set; }
        public int? WarrantyMonths { get; set; }
        public DateTime CreatedAt { get; set; }
        public DateTime UpdatedAt { get; set; }
    }
}