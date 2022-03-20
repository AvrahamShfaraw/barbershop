using Application.Appointments;
using AutoMapper;
using Domain;

namespace Application.core
{
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            CreateMap<Appointment, Appointment>();
            CreateMap<Appointment, AppointmentDto>()
                .ForMember(d => d.HostUsername, o => o.MapFrom(s => s.Attendee.Customer.UserName));




            CreateMap<AppointmentAttendee, AttendeeDto>()
             .ForMember(d => d.UserName, o => o.MapFrom(s => s.Customer.UserName))
             .ForMember(d => d.DisplayName, o => o.MapFrom(s => s.Customer.DisplayName))
             .ForMember(d => d.PhoneNumber, o => o.MapFrom(s => s.Customer.PhoneNumber));






        }
    }
}