using System;
using System.Linq;
using System.Threading.Tasks;
using ChallengeBuiltCode.Business.Intefaces;
using ChallengeBuiltCode.Business.Models;
using ChallengeBuiltCode.Business.Models.Validations;

namespace ChallengeBuiltCode.Business.Services
{
    public class PatientService : BaseService, IPatientService
    {
        private readonly IPatientRepository _patientRepository;

        public PatientService(IPatientRepository patientRepository,
            INotify notify) : base(notify)
        {
            _patientRepository = patientRepository;
        }

        public async Task<bool> Insert(Patient patient)
        {
            await _patientRepository.Insert(patient);
            return true;
        }

        public async Task<bool> Update(Patient patient)
        {
            if (!ExecuteValidation(new PatientValidation(), patient)) return false;

            if (_patientRepository.Search(f => f.Id != patient.Id).Result.Any())
            {
                Inform("Patient duplicated.");
                return false;
            }

            await _patientRepository.Update(patient);
            return true;
        }

        public async Task<bool> Delete(Guid id)
        {
            await _patientRepository.Delete(id);
            return true;
        }

        public void Dispose()
        {
            _patientRepository?.Dispose();
        }
    }
}