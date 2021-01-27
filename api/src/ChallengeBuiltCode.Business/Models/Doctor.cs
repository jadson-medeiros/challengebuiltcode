using System.Collections.Generic;

namespace ChallengeBuiltCode.Business.Models
{
    public class Doctor : Entity
    {
        public string Name { get; set; }

        public string Crm { get; set; }

        public string CrmUf { get; set; }

        /* EF Relations */
        public IEnumerable<Patient> Patients { get; set; }
    }
}