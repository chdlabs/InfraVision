using InfraVision.Domain.Entities;
using InfraVision.Infrastructure.Data;
using Microsoft.EntityFrameworkCore;

namespace InfraVision.Infrastructure.Repositories;

public class ServerRepository
{
    private readonly InfraVisionDbContext _context;

    public ServerRepository(InfraVisionDbContext context)
    {
        _context = context;
    }

    public async Task<List<Server>> GetAllAsync()
    {
        return await _context.Servers
            .OrderBy(x => x.Hostname)
            .ToListAsync();
    }

    public async Task<Server?> GetByIdAsync(Guid id)
    {
        return await _context.Servers.FindAsync(id);
    }

    public async Task<Server> AddAsync(Server server)
    {
        _context.Servers.Add(server);
        await _context.SaveChangesAsync();
        return server;
    }

    public async Task UpdateAsync(Server server)
    {
        _context.Servers.Update(server);
        await _context.SaveChangesAsync();
    }

    public async Task DeleteAsync(Guid id)
    {
        var server = await _context.Servers.FindAsync(id);

        if (server == null)
            return;

        _context.Servers.Remove(server);
        await _context.SaveChangesAsync();
    }
}
