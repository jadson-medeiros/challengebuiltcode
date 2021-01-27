using System;

namespace ChallengeBuiltCode.Business.Models
{
    public class Patient : Entity
    {
        public Guid DoctorId { get; set; }

        public string Name { get; set; }

        public string Cpf { get; set; }

        public DateTime BirthDate { get; set; }

        /* EF Relations */
        public Doctor Doctor { get; set; }
    }
}