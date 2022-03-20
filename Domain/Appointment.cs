using System;
using System.ComponentModel.DataAnnotations;

namespace Domain
{
    public class Appointment
    {
        [Key]
        public Guid AppointmentId { get; set; }
        public string AppointmentDate { get; set; }
        public bool IsCancelled { get; set; }
        public AppointmentAttendee Attendee { get; set; } = new AppointmentAttendee();




    }
}