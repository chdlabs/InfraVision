namespace InfraVision.Application.DTOs;

public class CreateServerDto
{
    public string Hostname { get; set; } = string.Empty;
    public string IpAddress { get; set; } = string.Empty;
    public string OperatingSystem { get; set; } = string.Empty;
    public string? OsVersion { get; set; }
    public int CpuCores { get; set; }
    public double MemoryTotalGb { get; set; }
    public double DiskTotalGb { get; set; }
    public string Environment { get; set; } = string.Empty;
}
