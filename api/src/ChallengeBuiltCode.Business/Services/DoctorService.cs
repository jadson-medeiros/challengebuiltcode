using System;
using System.Linq;
using System.Threading.Tasks;
using ChallengeBuiltCode.Business.Intefaces;
using ChallengeBuiltCode.Business.Models;
using ChallengeBuiltCode.Business.Models.Validations;

namespace ChallengeBuiltCode.Business.Services
{
    public class DoctorService : BaseService, IDoctorService
    {
        private readonly IDoctorRepository _doctorRepository;

        public DoctorService(IDoctorRepository doctorRepository,
            INotify notify) : base(notify)
        {
            _doctorRepository = doctorRepository;
        }

        public async Task<bool> Insert(Doctor doctor)
        {
            await _doctorRepository.Insert(doctor);
            return true;
        }

        public async Task<bool> Update(Doctor doctor)
        {
            if (!ExecuteValidation(new DoctorValidation(), doctor)) return false;

            if (_doctorRepository.Search(f => f.Id != doctor.Id).Result.Any())
            {
                Inform("Doctor duplicated.");
                return false;
            }

            await _doctorRepository.Update(doctor);
            return true;
        }

        public async Task<bool> Delete(Guid id)
        {
            await _doctorRepository.Delete(id);
            return true;
        }
        
        public void Dispose()
        {
            _doctorRepository?.Dispose();
        }
    }
}