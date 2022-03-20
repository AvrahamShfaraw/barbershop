using System;
using Application.Profiles;

namespace Application.Appointments
{
    public class AppointmentDto
    {
        public Guid AppointmentId { get; set; }
        public string AppointmentDate { get; set; }
        public string HostUsername { get; set; }

        public AttendeeDto Attendee { get; set; }
    }
}