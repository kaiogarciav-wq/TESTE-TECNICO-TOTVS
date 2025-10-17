// Controllers/AuthController.cs
using Microsoft.AspNetCore.Mvc;
using ProductManagement.DTOs;
using ProductManagement.Interfaces;
using System.Threading.Tasks;

namespace ProductManagement.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AuthController : ControllerBase
    {
        private readonly IAuthService _authService;

        public AuthController(IAuthService authService)
        {
            _authService = authService;
        }

        /// <summary>
        /// Registra um novo usuário.
        /// </summary>
        /// <param name="registerDto">Dados para registro do usuário.</param>
        /// <returns>Um token JWT se o registro for bem-sucedido.</returns>
        [HttpPost("register")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status409Conflict)] // Para usuário já existente
        public async Task<ActionResult<LoginResponseDTO>> Register([FromBody] UserRegisterDTO registerDto)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var user = await _authService.RegisterAsync(registerDto);

            if (user == null)
            {
                return Conflict("Nome de usuário já existe.");
            }

            // Após o registro, já gera um token para o novo usuário
            var token = _authService.GenerateJwtToken(user);
            return Ok(new LoginResponseDTO { Token = token, Username = user.Username, Role = user.Role });
        }

        /// <summary>
        /// Autentica um usuário e retorna um token JWT.
        /// </summary>
        /// <param name="loginDto">Credenciais de login do usuário.</param>
        /// <returns>Um token JWT para acesso.</returns>
        [HttpPost("login")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<ActionResult<LoginResponseDTO>> Login([FromBody] UserLoginDTO loginDto)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var loginResponse = await _authService.LoginAsync(loginDto);

            if (loginResponse == null)
            {
                return Unauthorized("Usuário ou senha inválidos.");
            }

            return Ok(loginResponse);
        }
    }
}