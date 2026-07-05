namespace InfraVision.Api.Auth;

public interface ITokenService
{
    string GenerateToken(string username);
}
