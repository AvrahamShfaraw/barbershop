using System;
using System.Threading;
using System.Threading.Tasks;
using Application.core;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Appointments
{
    public class Details
    {
        public class Query : IRequest<Result<AppointmentDto>>
        {
            public Guid Id { get; set; }
        }

        public class Handler : IRequestHandler<Query, Result<AppointmentDto>>
        {
            private readonly DataContext _context;
            private readonly IMapper _mapper;
            public Handler(DataContext context, IMapper mapper)
            {
                _mapper = mapper;
                _context = context;
            }

            public async Task<Result<AppointmentDto>> Handle(Query request, CancellationToken cancellationToken)
            {


                var activity = await _context.Appointments
                .ProjectTo<AppointmentDto>(_mapper.ConfigurationProvider)
                .FirstOrDefaultAsync(x => x.AppointmentId == request.Id);

                return Result<AppointmentDto>.Success(activity);

            }


        }
    }
}