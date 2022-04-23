using System;
using System.Threading.Tasks;
using Application.Waitings;
using Domain;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class WaitingController : BaseApiController
    {
        [HttpGet]
        public async Task<IActionResult> GetWaitings()
        {
            return HandleResult(await Mediator.Send(new List.Query()));
        }


        [HttpGet("{id}")]
        public async Task<IActionResult> GetWaiting(Guid id)
        {

            return HandleResult(await Mediator.Send(new Details.Query { Id = id }));
        }


        [HttpPost]
        public async Task<IActionResult> CreateWaiting(Waiting waiting)
        {
            return HandleResult(await Mediator.Send(new Create.Command { Waiting = waiting }));

        }
        [HttpDelete("{id}")]

        public async Task<IActionResult> DeleteActivity(Guid id)
        {
            return HandleResult(await Mediator.Send(new Delete.Command { Id = id }));
        }
    }
}