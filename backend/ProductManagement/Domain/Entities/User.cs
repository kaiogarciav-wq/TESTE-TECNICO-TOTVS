// Entities/User.cs
using System.ComponentModel.DataAnnotations;

namespace ProductManagement.Entities
{
    public class User
    {
        [Key]
        public int Id { get; set; }

        [Required]
        [MaxLength(100)]
        public string Username { get; set; } = string.Empty;

        [Required]
        [MaxLength(255)]
        public string PasswordHash { get; set; } = string.Empty; // Armazenar hash da senha, não a senha em texto claro!

        [Required]
        [MaxLength(50)]
        public string Role { get; set; } = "User"; // Ex: Admin, User
    }
}