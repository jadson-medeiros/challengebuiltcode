using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace ChallengeBuiltCode.Api.ViewModels
{
    public class DoctorViewModel
    {
        [Key]
        public Guid Id { get; set; }

        [Required(ErrorMessage = "The 'Name' is required")]
        public string Name { get; set; }

        [Required(ErrorMessage = "The 'Crm' is required")]
        [StringLength(10, ErrorMessage = "The field {0} need to have between {2} and {1} characters", MinimumLength = 4)]
        public string Crm { get; set; }

        [Required(ErrorMessage = "The 'CrmUf' is required")]
        [StringLength(2, ErrorMessage = "The field {0} need to have {2} characters", MinimumLength = 2)]
        public string CrmUf { get; set; }

        public IEnumerable<PatientViewModel> Patients { get; set; }
    }
}
