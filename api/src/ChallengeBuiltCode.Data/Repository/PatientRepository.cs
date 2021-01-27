using ChallengeBuiltCode.Business.Intefaces;
using ChallengeBuiltCode.Business.Models;
using ChallengeBuiltCode.Data.Context;

namespace ChallengeBuiltCode.Data.Repository
{
    public class PatientRepository : Repository<Patient>, IPatientRepository
    {
        public PatientRepository(MyDbContext context) : base(context) { }
    }
}