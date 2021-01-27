using FluentValidation;

namespace ChallengeBuiltCode.Business.Models.Validations
{
    public class DoctorValidation : AbstractValidator<Doctor>
    {
        public DoctorValidation()
        {
            RuleFor(f => f.CrmUf)
                .NotEmpty().WithMessage("The field 'CrmUf' is required");

            RuleFor(f => f.Crm)
                .NotEmpty().WithMessage("The field 'Crm' is required");

            RuleFor(f => f.Name)
                .NotEmpty().WithMessage("The field 'Name' is required");
        }
    }
}