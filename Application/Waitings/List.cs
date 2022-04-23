using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Waitings
{
    public class List
    {

        public class Query : IRequest<core.Result<List<Waiting>>> { }

        public class Handler : IRequestHandler<Query, core.Result<List<Waiting>>>
        {
            private readonly DataContext _context;
            private readonly IMapper _mapper;
            public Handler(DataContext context, IMapper mapper)
            {
                _mapper = mapper;
                _context = context;
            }

            public async Task<core.Result<List<Waiting>>> Handle(Query request, CancellationToken cancellationToken)
            {
                var waitings = await _context.Waitings
                .ProjectTo<Waiting>(_mapper.ConfigurationProvider)
                .ToListAsync(cancellationToken);

                return core.Result<List<Waiting>>.Success(waitings);
            }
        }
    }
}