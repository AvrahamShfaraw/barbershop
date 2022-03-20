using Domain;
using FluentValidation;

namespace Application.Appointments
{
    public class AppointmentValidator : AbstractValidator<Appointment>
    {

        public AppointmentValidator()
        {
            RuleFor(x => x.AppointmentDate).NotEmpty();




        }

    }
}