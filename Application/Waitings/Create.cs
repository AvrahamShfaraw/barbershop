using System.Threading;
using System.Threading.Tasks;
using Application.core;
using Application.Intreface;
using Domain;
using MediatR;
using Persistence;

namespace Application.Waitings
{
    public class Create
    {
        public class Command : IRequest<core.Result<Unit>>
        {
            public Waiting Waiting { get; set; }

        }



        public class Handler : IRequestHandler<Command, core.Result<Unit>>
        {
            private readonly DataContext _context;


            public Handler(DataContext context, IUserAccessor userAccessor)
            {

                this._context = context;


            }



            public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken)
            {

                _context.Waitings.Add(request.Waiting);


                var result = await _context.SaveChangesAsync() > 0;

                if (!result) return Result<Unit>.Failure("Failed to create Activity");

                return Result<Unit>.Success(Unit.Value);




            }
        }
    }
}