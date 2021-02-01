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
        private readonly IPatientRepository _patientRepository;

        public DoctorService(IDoctorRepository doctorRepository,
            IPatientRepository patientRepository,
            INotify notify) : base(notify)
        {
            _doctorRepository = doctorRepository;
            _patientRepository = patientRepository;
        }

        public async Task<bool> Insert(Doctor doctor)
        {
            if (_doctorRepository.Search(f => f.Crm == doctor.Crm).Result.Any())
            {
                Inform("Doctor duplicated.");
                return false;
            }

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
            if (_patientRepository.Search(f => f.DoctorId == id).Result.Any())
            {
                Inform("The doctor has a patient.");
                return false;
            }

            await _doctorRepository.Delete(id);
            return true;
        }
        
        public void Dispose()
        {
            _doctorRepository?.Dispose();
        }
    }
}