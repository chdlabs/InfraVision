using InfraVision.Domain.Entities;
using Microsoft.EntityFrameworkCore;

namespace InfraVision.Infrastructure.Data;

public class InfraVisionDbContext : DbContext
{
    public InfraVisionDbContext(DbContextOptions<InfraVisionDbContext> options)
        : base(options)
    {
    }

    public DbSet<Server> Servers => Set<Server>();

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        modelBuilder.Entity<Server>(entity =>
        {
            entity.HasKey(x => x.Id);

            entity.Property(x => x.Hostname)
                  .HasMaxLength(100)
                  .IsRequired();

            entity.Property(x => x.IpAddress)
                  .HasMaxLength(45)
                  .IsRequired();

            entity.Property(x => x.OperatingSystem)
                  .HasMaxLength(100);

            entity.Property(x => x.Environment)
                  .HasMaxLength(50);
        });
    }
}
