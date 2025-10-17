// Interfaces/IAuthService.cs
using ProductManagement.DTOs;
using ProductManagement.Entities;

namespace ProductManagement.Interfaces
{
    public interface IAuthService
    {
        Task<User?> RegisterAsync(UserRegisterDTO registerDto);
        Task<LoginResponseDTO?> LoginAsync(UserLoginDTO loginDto);
        string GenerateJwtToken(User user);
    }
}