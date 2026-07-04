using FluentValidation;
using InfraVision.Application.DTOs;

namespace InfraVision.Application.Validators;

public class CreateServerValidator : AbstractValidator<CreateServerDto>
{
    private static readonly string[] AllowedEnvironments =
        { "Production", "Staging", "Development", "Test" };

    public CreateServerValidator()
    {
        RuleFor(x => x.Hostname)
            .NotEmpty().WithMessage("Le hostname est requis.")
            .MaximumLength(253);

        RuleFor(x => x.IpAddress)
            .NotEmpty().WithMessage("L'adresse IP est requise.")
            .Matches(@"^(\d{1,3}\.){3}\d{1,3}$")
            .WithMessage("L'adresse IP n'est pas au format IPv4 valide.");

        RuleFor(x => x.OperatingSystem)
            .NotEmpty().WithMessage("Le système d'exploitation est requis.");

        RuleFor(x => x.Environment)
            .NotEmpty()
            .Must(env => AllowedEnvironments.Contains(env))
            .WithMessage("Environment doit être : Production, Staging, Development ou Test.");

        RuleFor(x => x.CpuCores)
            .GreaterThan(0).WithMessage("CpuCores doit être supérieur à 0.");

        RuleFor(x => x.MemoryTotalGb)
            .GreaterThanOrEqualTo(0);

        RuleFor(x => x.DiskTotalGb)
            .GreaterThanOrEqualTo(0);
    }
}
