using Microsoft.EntityFrameworkCore;
using Project_Backend.Models;

namespace Project_Backend.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }
        public DbSet<Appointment> Appointments => Set<Appointment>();
    }
}
