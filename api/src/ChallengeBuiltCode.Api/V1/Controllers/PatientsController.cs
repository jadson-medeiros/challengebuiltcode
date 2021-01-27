using AutoMapper;
using ChallengeBuiltCode.Api.Controllers;
using ChallengeBuiltCode.Api.ViewModels;
using ChallengeBuiltCode.Business.Intefaces;
using ChallengeBuiltCode.Business.Models;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace ChallengeBuiltCode.Api.V1.Controllers
{
    [ApiVersion("1.0")]
    [Route("api/v{version:apiVersion}/patients")]
    public class PatientsController : MainController
    {
        private readonly IPatientRepository _patientRepository;
        private readonly IPatientService _patientService;
        private readonly IMapper _mapper;

        public PatientsController(IPatientRepository patientRepository, IMapper mapper,
            IPatientService patientService, INotify notify, IUser user) : base(notify, user)
        {
            _patientRepository = patientRepository;
            _mapper = mapper;
            _patientService = patientService;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<PatientViewModel>>> GetAll()
        {
            var patient = _mapper.Map<IEnumerable<PatientViewModel>>(await _patientRepository.GetAll());

            return Ok(patient);
        }

        [HttpPost]
        public async Task<ActionResult<PatientViewModel>> Insert(PatientViewModel patientViewModel)
        {
            if (!ModelState.IsValid) return CustomResponse(ModelState);

            var patient = _mapper.Map<Patient>(patientViewModel);
            await _patientService.Insert(patient);

            return CustomResponse(patientViewModel);
        }

        [HttpPut("{id:guid}")]
        public async Task<ActionResult<PatientViewModel>> Update(Guid id, PatientViewModel patientViewModel)
        {
            if (id != patientViewModel.Id) return CustomResponse(ModelState);

            if (!ModelState.IsValid) return CustomResponse(ModelState);

            var patient = _mapper.Map<Patient>(patientViewModel);
            await _patientService.Update(patient);

            return CustomResponse(patientViewModel);
        }

        [HttpDelete("{id:guid})")]
        public async Task<ActionResult<PatientViewModel>> Delete(Guid id)
        {
            var patientViewModel = _mapper.Map<PatientViewModel>(await _patientRepository.GetById(id));

            if (patientViewModel == null) return NotFound();

            await _patientService.Delete(id);

            return CustomResponse();
        }
    }
}
