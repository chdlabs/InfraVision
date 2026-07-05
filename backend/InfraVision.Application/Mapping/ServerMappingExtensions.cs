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
        Owner = s.Owner,
        BusinessRole = s.BusinessRole,
        Criticality = s.Criticality,
        ServerType = s.ServerType,
        Vendor = s.Vendor,
        Location = s.Location,
        LifecycleStatus = s.LifecycleStatus,
        Notes = s.Notes,
        CommissionedAt = s.CommissionedAt,
        WarrantyUntil = s.WarrantyUntil,
        IsOnline = s.IsOnline,
        LastSeen = s.LastSeen,
        CreatedAt = s.CreatedAt
    };

    public static List<ServerDto> ToDto(this IEnumerable<Server> servers) =>
        servers.Select(s => s.ToDto()).ToList();
}
