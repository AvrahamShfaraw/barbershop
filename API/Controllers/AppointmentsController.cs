using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Application.Appointments;
using Domain;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace API.Controllers
{
    public class AppointmentsController : BaseApiController
    {
        [HttpGet]
        public async Task<IActionResult> GetActivities()
        {
            return HandleResult(await Mediator.Send(new List.Query()));
        }


        [HttpGet("{id}")]
        public async Task<IActionResult> GetActivity(Guid id)
        {

            return HandleResult(await Mediator.Send(new Details.Query { Id = id }));
        }


        [HttpPost]
        public async Task<IActionResult> CreateActivity(Appointment appointment)
        {
            return HandleResult(await Mediator.Send(new Create.Command { Appointment = appointment }));

        }

        [Authorize(Policy = "IsAppointmentHost")]
        [HttpPut("{id}")]
        public async Task<IActionResult> EditActivity(Guid id, Appointment appointment)
        {
            appointment.AppointmentId = id;
            return HandleResult(await Mediator.Send(new Edit.Command { Appointment = appointment }));
        }

        [Authorize(Policy = "IsAppointmentHost")]
        [HttpDelete("{id}")]

        public async Task<IActionResult> DeleteActivity(Guid id)
        {
            return HandleResult(await Mediator.Send(new Delete.Command { Id = id }));
        }

        [HttpPost("{id}/attend")]
        public async Task<IActionResult> Attend(Guid id)
        {
            return HandleResult(await Mediator.Send(new UpdateAttendance.Command { Id = id }));

        }
    }
}