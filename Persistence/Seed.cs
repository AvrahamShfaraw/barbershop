using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Domain;
using Microsoft.AspNetCore.Identity;

namespace Persistence
{
    public class Seed
    {
        public static async Task SeedData(DataContext context, UserManager<Customer> userManager)
        {
            if (!userManager.Users.Any() && !context.Appointments.Any())
            {
                var users = new List<Customer>
                {
                    new Customer
                    {
                        PhoneNumber = "number",
                        UserName = "bob",
                        DisplayName = "BOB",


                    },
                    new Customer
                    {
                        PhoneNumber = "number",
                        UserName = "jane",
                         DisplayName = "Jane"

                    },
                    new Customer
                    {
                        PhoneNumber = "number",
                        UserName = "tom",
                        DisplayName = "Tom"

                    },
                };

                foreach (var user in users)
                {
                    await userManager.CreateAsync(user, "Pa$$w0rd");
                }




                var appointments = new List<Appointment>
                            {
                                new Appointment {
                                    AppointmentDate ="Fri Feb 11 2022 11:00:00 GMT+0200 (שעון ישראל (חורף))",
                                    Attendee = new AppointmentAttendee{
                                        Customer = users[0],
                                        IsHost = true
                                    }
                                    },

                                new Appointment {
                                    AppointmentDate = "Fri Feb 11 2022 11:00:00 GMT+0200 (שעון ישראל (חורף))",
                                    Attendee = new AppointmentAttendee{
                                        Customer = users[1],
                                        IsHost = true
                                    }

                                },
                                new Appointment {
                                    AppointmentDate = "Fri Feb 11 2022 11:00:00 GMT+0200 (שעון ישראל (חורף))",
                                    Attendee = new AppointmentAttendee{
                                        Customer = users[2],
                                        IsHost = true
                                    }

                                }

                            };



                await context.Appointments.AddRangeAsync(appointments);
                await context.SaveChangesAsync();

            };

        }

    }

}




















