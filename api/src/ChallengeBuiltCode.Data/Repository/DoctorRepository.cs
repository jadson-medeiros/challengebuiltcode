using ChallengeBuiltCode.Business.Intefaces;
using ChallengeBuiltCode.Business.Models;
using ChallengeBuiltCode.Data.Context;

namespace ChallengeBuiltCode.Data.Repository
{
    public class DoctorRepository : Repository<Doctor>, IDoctorRepository
    {
        public DoctorRepository(MyDbContext context) : base(context) { }
    }
}