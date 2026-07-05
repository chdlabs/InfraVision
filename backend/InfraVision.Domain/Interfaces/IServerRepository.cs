using InfraVision.Domain.Entities;

namespace InfraVision.Domain.Interfaces;

public interface IServerRepository
{
    Task<List<Server>> GetAllAsync();
    Task<Server?> GetByIdAsync(Guid id);
    Task<Server> AddAsync(Server server);
    Task UpdateAsync(Server server);
    Task DeleteAsync(Guid id);
}
