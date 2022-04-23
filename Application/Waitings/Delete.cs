using System;
using System.Threading;
using System.Threading.Tasks;
using Application.core;
using MediatR;
using Persistence;

namespace Application.Waitings
{
    public class Delete
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
                var waiting = await _context.Waitings.FindAsync(request.Id);

                // if (activity == null) return null;

                _context.Remove(waiting);

                var result = await _context.SaveChangesAsync() > 0;

                if (!result) return Result<Unit>.Failure("Faild to delete the Appointment");

                return Result<Unit>.Success(Unit.Value);
            }
        }
    }

}