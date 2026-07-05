using FluentValidation;
using InfraVision.Application.DTOs;

namespace InfraVision.Application.Validators;

public class CreateServerValidator : AbstractValidator<CreateServerDto>
{
    private static readonly string[] AllowedEnvironments =
        { "Production", "Staging", "Development", "Test" };

    private static readonly string[] AllowedCriticality =
        { "Critical", "High", "Medium", "Low" };

    private static readonly string[] AllowedLifecycle =
        { "InService", "Maintenance", "Decommissioning", "Retired" };

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
            .Must(v => AllowedEnvironments.Contains(v))
            .WithMessage("Environment doit être : Production, Staging, Development ou Test.");

        RuleFor(x => x.CpuCores)
            .GreaterThan(0).WithMessage("CpuCores doit être supérieur à 0.");

        RuleFor(x => x.MemoryTotalGb).GreaterThanOrEqualTo(0);
        RuleFor(x => x.DiskTotalGb).GreaterThanOrEqualTo(0);

        RuleFor(x => x.Criticality)
            .Must(v => AllowedCriticality.Contains(v))
            .WithMessage("Criticality doit être : Critical, High, Medium ou Low.");

        RuleFor(x => x.LifecycleStatus)
            .Must(v => AllowedLifecycle.Contains(v))
            .WithMessage("LifecycleStatus doit être : InService, Maintenance, Decommissioning ou Retired.");

        RuleFor(x => x.WarrantyUntil)
            .GreaterThan(x => x.CommissionedAt)
            .When(x => x.CommissionedAt.HasValue && x.WarrantyUntil.HasValue)
            .WithMessage("La fin de garantie doit être postérieure à la mise en service.");
    }
}
