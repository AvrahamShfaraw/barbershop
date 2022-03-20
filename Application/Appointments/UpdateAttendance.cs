using System;
using System.Threading;
using System.Threading.Tasks;
using Application.core;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Appointments
{
    public class UpdateAttendance
    {
        public class Command : IRequest<Result<Unit>>
        {
            public Guid Id { get; set; }

        }

        public class Handler : IRequestHandler<Command, Result<Unit>>
        {
            private readonly DataContext _context;
            public Handler(DataContext context)
            {

                _context = context;
            }

            public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken)
            {
                var appointment = await _context.Appointments
                .Include(a => a.Attendee).ThenInclude(u => u.Customer)
                .SingleOrDefaultAsync(x => x.AppointmentId == request.Id);

                if (appointment == null) return null;



                var hostUserName = appointment.Attendee?.Customer?.UserName;

                var attendance = appointment.Attendee;

                if (attendance != null && hostUserName != null)
                    appointment.IsCancelled = !appointment.IsCancelled;

                if (attendance != null && hostUserName != null)
                    appointment.IsCancelled = appointment.IsCancelled;

                if (attendance == null)
                {
                    attendance = new AppointmentAttendee
                    {
                        Customer = appointment.Attendee.Customer,
                        Appointment = appointment,
                        IsHost = false
                    };


                    appointment.Attendee = attendance;
                }

                var result = await _context.SaveChangesAsync() > 0;
                return result ? Result<Unit>.Success(Unit.Value) :
                Result<Unit>.Failure("Problem updating attendance");
            }
        }
    }
}