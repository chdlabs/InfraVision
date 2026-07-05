using InfraVision.Application.DTOs;

namespace InfraVision.Application.Services;

public interface IServerService
{
    Task<List<ServerDto>> GetAllAsync();
    Task<ServerDto?> GetByIdAsync(Guid id);
    Task<ServerDto> CreateAsync(CreateServerDto dto);
    Task<bool> UpdateAsync(Guid id, CreateServerDto dto);
    Task DeleteAsync(Guid id);
}
