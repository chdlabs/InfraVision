using InfraVision.Application.DTOs;
using InfraVision.Application.Mapping;
using InfraVision.Domain.Entities;
using InfraVision.Domain.Interfaces;

namespace InfraVision.Application.Services;

public class ServerService : IServerService
{
    private readonly IServerRepository _repository;

    public ServerService(IServerRepository repository)
    {
        _repository = repository;
    }

    public async Task<List<ServerDto>> GetAllAsync()
    {
        var servers = await _repository.GetAllAsync();
        return servers.ToDto();
    }

    public async Task<ServerDto?> GetByIdAsync(Guid id)
    {
        var server = await _repository.GetByIdAsync(id);
        return server?.ToDto();
    }

    public async Task<ServerDto> CreateAsync(CreateServerDto dto)
    {
        var server = new Server
        {
            Id = Guid.NewGuid(),
            Hostname = dto.Hostname,
            IpAddress = dto.IpAddress,
            OperatingSystem = dto.OperatingSystem,
            OsVersion = dto.OsVersion ?? string.Empty,
            CpuCores = dto.CpuCores,
            MemoryTotalGb = dto.MemoryTotalGb,
            DiskTotalGb = dto.DiskTotalGb,
            Environment = dto.Environment,
            IsOnline = false,
            LastSeen = DateTime.UtcNow,
            CreatedAt = DateTime.UtcNow
        };

        var created = await _repository.AddAsync(server);
        return created.ToDto();
    }

    public async Task<bool> UpdateAsync(Guid id, CreateServerDto dto)
    {
        var server = await _repository.GetByIdAsync(id);
        if (server == null)
            return false;

        server.Hostname = dto.Hostname;
        server.IpAddress = dto.IpAddress;
        server.OperatingSystem = dto.OperatingSystem;
        server.OsVersion = dto.OsVersion ?? string.Empty;
        server.CpuCores = dto.CpuCores;
        server.MemoryTotalGb = dto.MemoryTotalGb;
        server.DiskTotalGb = dto.DiskTotalGb;
        server.Environment = dto.Environment;

        await _repository.UpdateAsync(server);
        return true;
    }

    public Task DeleteAsync(Guid id) => _repository.DeleteAsync(id);
}
