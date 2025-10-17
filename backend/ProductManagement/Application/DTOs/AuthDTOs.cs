// DTOs/AuthDTOs.cs
using System.ComponentModel.DataAnnotations;

namespace ProductManagement.DTOs
{
    public class UserRegisterDTO
    {
        [Required(ErrorMessage = "O nome de usuário é obrigatório.")]
        [MaxLength(100, ErrorMessage = "O nome de usuário não pode exceder 100 caracteres.")]
        public string Username { get; set; } = string.Empty;

        [Required(ErrorMessage = "A senha é obrigatória.")]
        [MinLength(6, ErrorMessage = "A senha deve ter pelo menos 6 caracteres.")]
        public string Password { get; set; } = string.Empty;

        [Required(ErrorMessage = "A confirmação da senha é obrigatória.")]
        [Compare("Password", ErrorMessage = "A senha e a confirmação de senha não coincidem.")]
        public string ConfirmPassword { get; set; } = string.Empty;

        [MaxLength(50, ErrorMessage = "A role não pode exceder 50 caracteres.")]
        public string Role { get; set; } = "User"; // Default para novos usuários
    }

    public class UserLoginDTO
    {
        [Required(ErrorMessage = "O nome de usuário é obrigatório.")]
        public string Username { get; set; } = string.Empty;

        [Required(ErrorMessage = "A senha é obrigatória.")]
        public string Password { get; set; } = string.Empty;
    }

    public class LoginResponseDTO
    {
        public string Token { get; set; } = string.Empty;
        public string Username { get; set; } = string.Empty;
        public string Role { get; set; } = string.Empty;
    }
}