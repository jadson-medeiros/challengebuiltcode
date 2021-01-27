using System;
using System.ComponentModel.DataAnnotations;

namespace ChallengeBuiltCode.Api.ViewModels
{
    public class PatientViewModel
    {
        [Key]
        public Guid Id { get; set; }

        public Guid DoctorId { get; set; }

        [Required(ErrorMessage = "The 'Name' is required")]
        public string Name { get; set; }

        [Required(ErrorMessage = "The 'Value' is required")]
        public string Cpf { get; set; }

        [Required(ErrorMessage = "The 'BirthDate' is required")]
        public DateTime BirthDate { get; set; }

        [ScaffoldColumn(false)]
        public string DoctorName { get; set; }
    }
}
