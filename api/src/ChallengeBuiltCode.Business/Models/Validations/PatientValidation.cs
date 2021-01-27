using FluentValidation;

namespace ChallengeBuiltCode.Business.Models.Validations
{
    public class PatientValidation : AbstractValidator<Patient>
    {
        public PatientValidation()
        {
            RuleFor(f => f.BirthDate)
                .NotEmpty().WithMessage("The 'BirthDate' is required");

            RuleFor(f => f.Cpf)
                .NotEmpty().WithMessage("The 'Cpf' is required");

            RuleFor(f => f.Name)
                .NotEmpty().WithMessage("The 'Name' is required");
        }
    }
}