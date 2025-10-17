// Entities/Product.cs
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace ProductManagement.Entities
{
    public class Product
    {
        [Key]
        public int Id { get; set; }

        [Required]
        [MaxLength(255)]
        public string Name { get; set; } = string.Empty;

        [Required]
        [MaxLength(50)]
        public string Sku { get; set; } = string.Empty;

        [MaxLength(1000)]
        public string? Description { get; set; }

        [Required]
        [Column(TypeName = "decimal(18, 2)")]
        public decimal Price { get; set; }

        public int TotalStock { get; set; }
        public int AvailableStock { get; set; }
        public int ReservedStock { get; set; }

        [MaxLength(50)]
        public string Unit { get; set; } = "unidade";

        public int ActiveLocations { get; set; }
        public DateTime? NextDueDate { get; set; }

        public Guid? CategoryId { get; set; }
        // public string? CategoryName { get; set; } // Normalmente não armazenamos o nome da categoria diretamente na entidade do produto se tivermos uma entidade Category

        public Guid? SubcategoryId { get; set; }
        // public string? SubcategoryName { get; set; } // O mesmo para subcategoria

        [MaxLength(100)]
        public string? Brand { get; set; }

        [MaxLength(100)]
        public string? Model { get; set; }

        [MaxLength(100)]
        public string? Material { get; set; }

        [Column(TypeName = "decimal(18, 2)")]
        public decimal? WeightKg { get; set; }

        [MaxLength(100)]
        public string? DimensionsCm { get; set; }

        [MaxLength(50)]
        public string? Color { get; set; }

        [MaxLength(50)]
        public string? Size { get; set; }

        // Campo para armazenar especificações como JSON
        public Dictionary<string, string>? Specifications { get; set; }

        public int Condition { get; set; } // 1: Novo, 2: Usado, etc.

        [MaxLength(100)]
        public string? CountryOfOrigin { get; set; }

        public int? WarrantyMonths { get; set; }

        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
        public DateTime UpdatedAt { get; set; } = DateTime.UtcNow;
    }
}