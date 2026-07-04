using InfraVision.Application.DTOs;
using InfraVision.Domain.Entities;

namespace InfraVision.Application.Mapping;

public static class ServerMappingExtensions
{
    public static ServerDto ToDto(this Server s) => new()
    {
        Id = s.Id,
        Hostname = s.Hostname,
        IpAddress = s.IpAddress,
        OperatingSystem = s.OperatingSystem,
        OsVersion = s.OsVersion,
        CpuCores = s.CpuCores,
        MemoryTotalGb = s.MemoryTotalGb,
        DiskTotalGb = s.DiskTotalGb,
        Environment = s.Environment,
        IsOnline = s.IsOnline,
        LastSeen = s.LastSeen,
        CreatedAt = s.CreatedAt
    };

    public static List<ServerDto> ToDto(this IEnumerable<Server> servers) =>
        servers.Select(s => s.ToDto()).ToList();
}
