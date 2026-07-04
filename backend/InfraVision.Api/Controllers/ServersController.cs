using InfraVision.Application.DTOs;
using InfraVision.Domain.Entities;
using InfraVision.Infrastructure.Repositories;
using Microsoft.AspNetCore.Mvc;

namespace InfraVision.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class ServersController : ControllerBase
{
    private readonly ServerRepository _repository;

    public ServersController(ServerRepository repository)
    {
        _repository = repository;
    }

    [HttpGet]
    public async Task<ActionResult<List<Server>>> Get()
    {
        return await _repository.GetAllAsync();
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<Server>> Get(Guid id)
    {
        var server = await _repository.GetByIdAsync(id);
        if (server == null)
            return NotFound();
        return server;
    }

    [HttpPost]
    public async Task<ActionResult<Server>> Post(CreateServerDto dto)
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
        return CreatedAtAction(nameof(Get), new { id = created.Id }, created);
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> Put(Guid id, CreateServerDto dto)
    {
        var server = await _repository.GetByIdAsync(id);
        if (server == null)
            return NotFound();

        server.Hostname = dto.Hostname;
        server.IpAddress = dto.IpAddress;
        server.OperatingSystem = dto.OperatingSystem;
        server.OsVersion = dto.OsVersion ?? string.Empty;
        server.CpuCores = dto.CpuCores;
        server.MemoryTotalGb = dto.MemoryTotalGb;
        server.DiskTotalGb = dto.DiskTotalGb;
        server.Environment = dto.Environment;

        await _repository.UpdateAsync(server);
        return NoContent();
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> Delete(Guid id)
    {
        await _repository.DeleteAsync(id);
        return NoContent();
    }
}
