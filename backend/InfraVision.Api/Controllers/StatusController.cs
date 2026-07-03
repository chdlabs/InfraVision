using Microsoft.AspNetCore.Mvc;

namespace InfraVision.Api.Controllers;

[ApiController]
[Route("api/status")]
public class StatusController : ControllerBase
{
    [HttpGet]
    public IActionResult Get()
    {
        return Ok(new
        {
            Application = "InfraVision",
            Version = "1.0.0",
            Status = "Running",
            Machine = Environment.MachineName,
            Environment = Environment.GetEnvironmentVariable("ASPNETCORE_ENVIRONMENT"),
            Utc = DateTime.UtcNow
        });
    }
}
