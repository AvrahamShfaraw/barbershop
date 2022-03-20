using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using Microsoft.AspNetCore.Identity;

namespace Domain
{
    public class Customer : IdentityUser
    {

        public string DisplayName { get; set; }
        public ICollection<AppointmentAttendee> Appointments { get; set; }
    }
}