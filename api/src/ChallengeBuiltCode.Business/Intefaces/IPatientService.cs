using System;
using System.Threading.Tasks;
using ChallengeBuiltCode.Business.Models;

namespace ChallengeBuiltCode.Business.Intefaces
{
    public interface IPatientService : IDisposable
    {
        Task<bool> Insert(Patient patient);
        Task<bool> Update(Patient patient);
        Task<bool> Delete(Guid id);
    }
}