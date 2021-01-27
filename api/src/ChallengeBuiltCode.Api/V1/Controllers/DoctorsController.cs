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
    [Route("api/v{version:apiVersion}/doctors")]
    public class DoctorsController : MainController
    {
        private readonly IDoctorRepository _doctorRepository;
        private readonly IDoctorService _doctorService;
        private readonly IMapper _mapper;

        public DoctorsController(IDoctorRepository doctorRepository, IMapper mapper,
            IDoctorService doctorService, INotify notify, IUser user) : base(notify, user)
        {
            _doctorRepository = doctorRepository;
            _mapper = mapper;
            _doctorService = doctorService;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<DoctorViewModel>>> GetAll()
        {
            var doctors = _mapper.Map<IEnumerable<DoctorViewModel>>(await _doctorRepository.GetAll());

            return Ok(doctors);
        }

        [HttpPost]
        public async Task<ActionResult<DoctorViewModel>> Insert(DoctorViewModel doctorViewModel)
        {
            if (!ModelState.IsValid) return CustomResponse(ModelState);

            var doctor = _mapper.Map<Doctor>(doctorViewModel);
            await _doctorService.Insert(doctor);

            return CustomResponse(doctorViewModel);
        }

        [HttpPut("{id:guid}")]
        public async Task<ActionResult<DoctorViewModel>> Update(Guid id, DoctorViewModel doctorViewModel)
        {
            if (id != doctorViewModel.Id) return CustomResponse(ModelState);

            if (!ModelState.IsValid) return CustomResponse(ModelState);

            var doctor = _mapper.Map<Doctor>(doctorViewModel);
            await _doctorService.Update(doctor);

            return CustomResponse(doctorViewModel);
        }

        [HttpDelete("{id:guid})")]
        public async Task<ActionResult<DoctorViewModel>> Delete(Guid id)
        {
            var doctorViewModel = _mapper.Map<DoctorViewModel>(await _doctorRepository.GetById(id));

            if (doctorViewModel == null) return NotFound();

            await _doctorService.Delete(id);

            return CustomResponse();
        }     
    }
}
