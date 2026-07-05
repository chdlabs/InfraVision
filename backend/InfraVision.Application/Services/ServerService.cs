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

    // Force les dates en UTC pour PostgreSQL (timestamp with time zone)
    private static DateTime? ToUtc(DateTime? dt)
    {
        if (!dt.HasValue) return null;
        return DateTime.SpecifyKind(dt.Value, DateTimeKind.Utc);
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
            Owner = dto.Owner ?? string.Empty,
            BusinessRole = dto.BusinessRole ?? string.Empty,
            Criticality = dto.Criticality,
            ServerType = dto.ServerType ?? string.Empty,
            Vendor = dto.Vendor ?? string.Empty,
            Location = dto.Location ?? string.Empty,
            LifecycleStatus = dto.LifecycleStatus,
            Notes = dto.Notes ?? string.Empty,
            CommissionedAt = ToUtc(dto.CommissionedAt),
            WarrantyUntil = ToUtc(dto.WarrantyUntil),
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
        server.Owner = dto.Owner ?? string.Empty;
        server.BusinessRole = dto.BusinessRole ?? string.Empty;
        server.Criticality = dto.Criticality;
        server.ServerType = dto.ServerType ?? string.Empty;
        server.Vendor = dto.Vendor ?? string.Empty;
        server.Location = dto.Location ?? string.Empty;
        server.LifecycleStatus = dto.LifecycleStatus;
        server.Notes = dto.Notes ?? string.Empty;
        server.CommissionedAt = ToUtc(dto.CommissionedAt);
        server.WarrantyUntil = ToUtc(dto.WarrantyUntil);

        await _repository.UpdateAsync(server);
        return true;
    }

    public Task DeleteAsync(Guid id) => _repository.DeleteAsync(id);
}
