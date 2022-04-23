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
            if (!userManager.Users.Any() && !context.Appointments.Any() && !context.Waitings.Any())
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


                var Waitings = new List<Waiting>
                {
                    new Waiting {
                        DisplayName="TOM",
                        UserName="tom",
                        PhoneNumber="0501234567",
                        BarberName="יהודה",
                        Date= new DateTime().ToString()
                    },
                    new Waiting {
                        DisplayName="BOB",
                        UserName="bob",
                        PhoneNumber="0501234568",
                        BarberName="סלמון",
                        Date= new DateTime().ToString()
                    }
                };

                var appointments = new List<Appointment>
                            {
                                new Appointment {
                                    AppointmentDate ="Fri Feb 11 2022 11:00:00 GMT+0200 (שעון ישראל (חורף))",
                                    BarberName ="סלמון",
                                    Attendee = new AppointmentAttendee{
                                        Customer = users[0],
                                        IsHost = true
                                    }
                                    },

                                new Appointment {
                                    AppointmentDate = "Fri Feb 11 2022 11:00:00 GMT+0200 (שעון ישראל (חורף))",
                                    BarberName ="סלמון",
                                    Attendee = new AppointmentAttendee{
                                        Customer = users[1],
                                        IsHost = true,

                                    }

                                },
                                new Appointment {
                                    AppointmentDate = "Fri Feb 11 2022 11:00:00 GMT+0200 (שעון ישראל (חורף))",
                                    BarberName ="יהודה",
                                    Attendee = new AppointmentAttendee{
                                        Customer = users[2],
                                        IsHost = true
                                    }

                                }

                            };



                await context.Appointments.AddRangeAsync(appointments);
                await context.Waitings.AddRangeAsync(Waitings);
                await context.SaveChangesAsync();

            };

        }

    }

}




















