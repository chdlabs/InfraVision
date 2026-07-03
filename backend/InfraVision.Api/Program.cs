using Serilog;
using InfraVision.Infrastructure.Data;
using Microsoft.EntityFrameworkCore;
using InfraVision.Infrastructure.Repositories;

var builder = WebApplication.CreateBuilder(args);
builder.WebHost.UseUrls("http://0.0.0.0:5163");

// LOGGING
builder.Host.UseSerilog((ctx, lc) =>
{
    lc.WriteTo.Console();
});

// SERVICES
builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddHealthChecks();
builder.Services.AddScoped<ServerRepository>();

builder.Services.AddDbContext<InfraVisionDbContext>(options =>
{
    options.UseNpgsql(
        builder.Configuration.GetConnectionString("Postgres"));
});

var app = builder.Build();

// PIPELINE
app.UseSerilogRequestLogging();

app.UseSwagger();
app.UseSwaggerUI();

app.UseHttpsRedirection();

app.MapControllers();
app.MapHealthChecks("/health");

app.Run();
