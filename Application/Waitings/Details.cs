using System;
using System.Threading;
using System.Threading.Tasks;
using Application.core;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Waitings
{
    public class Details
    {
        public class Query : IRequest<Result<Waiting>>
        {
            public Guid Id { get; set; }
        }

        public class Handler : IRequestHandler<Query, Result<Waiting>>
        {
            private readonly DataContext _context;
            private readonly IMapper _mapper;
            public Handler(DataContext context, IMapper mapper)
            {
                _mapper = mapper;
                _context = context;
            }



            public async Task<Result<Waiting>> Handle(Query request, CancellationToken cancellationToken)
            {
                var waiting = await _context.Waitings
               .ProjectTo<Waiting>(_mapper.ConfigurationProvider)
               .FirstOrDefaultAsync(x => x.id == request.Id);

                return Result<Waiting>.Success(waiting);
            }
        }
    }
}