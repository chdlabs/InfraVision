namespace InfraVision.Domain.Entities;

public class Server
{
    public Guid Id { get; set; }

    // Identité technique
    public string Hostname { get; set; } = string.Empty;
    public string IpAddress { get; set; } = string.Empty;
    public string OperatingSystem { get; set; } = string.Empty;
    public string OsVersion { get; set; } = string.Empty;
    public int CpuCores { get; set; }
    public double MemoryTotalGb { get; set; }
    public double DiskTotalGb { get; set; }
    public string Environment { get; set; } = string.Empty;

    // Métadonnées métier (inventaire / CMDB)
    public string Owner { get; set; } = string.Empty;
    public string BusinessRole { get; set; } = string.Empty;
    public string Criticality { get; set; } = "Medium";
    public string ServerType { get; set; } = string.Empty;
    public string Vendor { get; set; } = string.Empty;
    public string Location { get; set; } = string.Empty;
    public string LifecycleStatus { get; set; } = "InService";
    public string Notes { get; set; } = string.Empty;
    public DateTime? CommissionedAt { get; set; }
    public DateTime? WarrantyUntil { get; set; }

    // État & suivi
    public bool IsOnline { get; set; }
    public DateTime LastSeen { get; set; }
    public DateTime CreatedAt { get; set; }
}
