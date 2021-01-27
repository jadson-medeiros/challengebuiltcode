using System;
using System.Threading.Tasks;
using ChallengeBuiltCode.Business.Models;

namespace ChallengeBuiltCode.Business.Intefaces
{
    public interface IDoctorService : IDisposable
    {
        Task<bool> Insert(Doctor doctor);
        Task<bool> Update(Doctor doctor);
        Task<bool> Delete(Guid id);
    }
}