using System.Collections.Generic;
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
    public class List
    {

        public class Query : IRequest<Result<List<AppointmentDto>>> { }

        public class Handler : IRequestHandler<Query, Result<List<AppointmentDto>>>
        {
            private readonly DataContext _context;
            private readonly IMapper _mapper;
            public Handler(DataContext context, IMapper mapper)
            {
                _mapper = mapper;
                _context = context;
            }

            public async Task<Result<List<AppointmentDto>>> Handle(Query request, CancellationToken cancellationToken)
            {
                var activities = await _context.Appointments
                .ProjectTo<AppointmentDto>(_mapper.ConfigurationProvider)
                .ToListAsync(cancellationToken);

                return Result<List<AppointmentDto>>.Success(activities);
            }
        }
    }
}