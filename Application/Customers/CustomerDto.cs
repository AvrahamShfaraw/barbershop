using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using Domain;

namespace Application.Customers
{
    public class CustomerDto
    {


        public Guid CutomerId { get; set; }
        public string UserName { get; set; }
        public string DisplayName { get; set; }
        public string PhoneNumber { get; set; }

        public AppointmentAttendee Appointment { get; set; }

    }
}