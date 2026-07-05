using InfraVision.Api.Auth;
using InfraVision.Application.DTOs;
using Microsoft.AspNetCore.Mvc;

namespace InfraVision.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class AuthController : ControllerBase
{
    private readonly IConfiguration _config;
    private readonly ITokenService _tokenService;

    public AuthController(IConfiguration config, ITokenService tokenService)
    {
        _config = config;
        _tokenService = tokenService;
    }

    [HttpPost("login")]
    public IActionResult Login(LoginDto dto)
    {
        var admin = _config.GetSection("AdminUser");
        var expectedUser = admin["Username"];
        var expectedPass = admin["Password"];

        if (dto.Username != expectedUser || dto.Password != expectedPass)
            return Unauthorized(new { message = "Identifiants invalides." });

        var token = _tokenService.GenerateToken(dto.Username);
        return Ok(new { token });
    }
}
