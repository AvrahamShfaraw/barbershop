using System;
using System.ComponentModel.DataAnnotations;

namespace Domain
{
    public class Waiting
    {
        [Key]
        public Guid id { get; set; }
        public string UserName { get; set; }
        public string DisplayName { get; set; }
        public string PhoneNumber { get; set; }
        public string BarberName { get; set; }
        public string Date { get; set; }

    }
}