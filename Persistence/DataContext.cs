using Domain;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace Persistence
{
    public class DataContext : IdentityDbContext<Customer>
    {

        public DataContext(DbContextOptions options) : base(options)
        {
        }

        public DbSet<Appointment> Appointments { get; set; }
        public DbSet<AppointmentAttendee> AppointmentAttendees { get; set; }
        public DbSet<Waiting> Waitings { get; set; }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);
            builder.Entity<AppointmentAttendee>(x => x.HasKey(aa => new { aa.CustomerId, aa.AppointmentId }));

            builder.Entity<AppointmentAttendee>()
            .HasOne(u => u.Customer)
            .WithMany(a => a.Appointments)
            .HasForeignKey(aa => aa.CustomerId);

            builder.Entity<AppointmentAttendee>()
            .HasOne(u => u.Appointment)
            .WithOne(a => a.Attendee)
            .HasForeignKey<AppointmentAttendee>(aa => aa.AppointmentId);




        }
    }

}