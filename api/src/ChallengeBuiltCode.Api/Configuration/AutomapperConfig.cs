using AutoMapper;
using ChallengeBuiltCode.Api.ViewModels;
using ChallengeBuiltCode.Business.Models;

namespace ChallengeBuiltCode.Api.Configuration
{
    public class AutomapperConfig : Profile
    {
        public AutomapperConfig()
        {
            CreateMap<Doctor, DoctorViewModel>().ReverseMap();
            CreateMap<Patient, PatientViewModel>().ReverseMap();
            CreateMap<PatientViewModel, Patient>();

            CreateMap<Patient, PatientViewModel>()
                .ForMember(dest => dest.DoctorName, opt => opt.MapFrom(src => src.Doctor.Name));
        }
    }
}