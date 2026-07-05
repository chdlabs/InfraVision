using Microsoft.AspNetCore.Authorization;
using InfraVision.Application.DTOs;
using InfraVision.Application.Services;
using Microsoft.AspNetCore.Mvc;

namespace InfraVision.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
[Authorize]
public class ServersController : ControllerBase
{
    private readonly IServerService _service;

    public ServersController(IServerService service)
    {
        _service = service;
    }

    [HttpGet]
    public async Task<ActionResult<List<ServerDto>>> Get()
    {
        return await _service.GetAllAsync();
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<ServerDto>> Get(Guid id)
    {
        var server = await _service.GetByIdAsync(id);
        if (server == null)
            return NotFound();
        return server;
    }

    [HttpPost]
    public async Task<ActionResult<ServerDto>> Post(CreateServerDto dto)
    {
        var created = await _service.CreateAsync(dto);
        return CreatedAtAction(nameof(Get), new { id = created.Id }, created);
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> Put(Guid id, CreateServerDto dto)
    {
        var updated = await _service.UpdateAsync(id, dto);
        if (!updated)
            return NotFound();
        return NoContent();
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> Delete(Guid id)
    {
        await _service.DeleteAsync(id);
        return NoContent();
    }
}
