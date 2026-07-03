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
    public async Task<ActionResult<Server>> Post(Server server)
    {
        var created = await _repository.AddAsync(server);

        return CreatedAtAction(nameof(Get),
            new { id = created.Id },
            created);
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> Put(Guid id, Server server)
    {
        if (id != server.Id)
            return BadRequest();

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
