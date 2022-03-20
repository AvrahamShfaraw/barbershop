using System;
using System.ComponentModel.DataAnnotations;

namespace Domain
{


    public class AppointmentAttendee
    {

        public string CustomerId { get; set; }
        public Customer Customer { get; set; }
        public Guid AppointmentId { get; set; }
        public Appointment Appointment { get; set; }
        public bool IsHost { get; set; }


    }
}