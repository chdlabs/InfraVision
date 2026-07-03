namespace InfraVision.Domain.Entities;

public class Server
{
    public Guid Id { get; set; }

    public string Hostname { get; set; } = string.Empty;

    public string IpAddress { get; set; } = string.Empty;

    public string OperatingSystem { get; set; } = string.Empty;

    public string Environment { get; set; } = "Production";

    public bool IsOnline { get; set; }

    public DateTime LastSeen { get; set; }

    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
}
