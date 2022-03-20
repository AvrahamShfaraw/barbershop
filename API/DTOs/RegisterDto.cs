using System.ComponentModel.DataAnnotations;

namespace API.Controllers.DTOs
{
    public class RegisterDto
    {
        [Required]
        public string UserName { get; set; }
        [Required]
        public string DisplayName { get; set; }

        [Required]
        public string PhoneNumber { get; set; }

        [Required]

        public string Password { get; set; }


    }
}