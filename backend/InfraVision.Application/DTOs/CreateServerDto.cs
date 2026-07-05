namespace InfraVision.Application.DTOs;

public class CreateServerDto
{
    // Identité technique
    public string Hostname { get; set; } = string.Empty;
    public string IpAddress { get; set; } = string.Empty;
    public string OperatingSystem { get; set; } = string.Empty;
    public string? OsVersion { get; set; }
    public int CpuCores { get; set; }
    public double MemoryTotalGb { get; set; }
    public double DiskTotalGb { get; set; }
    public string Environment { get; set; } = string.Empty;

    // Métadonnées métier
    public string? Owner { get; set; }
    public string? BusinessRole { get; set; }
    public string Criticality { get; set; } = "Medium";
    public string? ServerType { get; set; }
    public string? Vendor { get; set; }
    public string? Location { get; set; }
    public string LifecycleStatus { get; set; } = "InService";
    public string? Notes { get; set; }
    public DateTime? CommissionedAt { get; set; }
    public DateTime? WarrantyUntil { get; set; }
}
