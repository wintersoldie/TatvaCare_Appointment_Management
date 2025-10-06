using Microsoft.EntityFrameworkCore;
using Project_Backend.Data;
using Project_Backend.Models;

namespace Project_Backend.Services
{
    public class AppointmentService
    {
        private readonly AppDbContext _context;

        public AppointmentService(AppDbContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<Appointment>> GetAllAsync()
            => await _context.Appointments.ToListAsync();

        public async Task<Appointment?> GetByIdAsync(int id)
            => await _context.Appointments.FindAsync(id);

        public async Task<Appointment> AddAsync(Appointment appt)
        {
            if (HasOverlap(appt))
                throw new InvalidOperationException("Doctor already has an appointment during this time.");

            _context.Appointments.Add(appt);
            await _context.SaveChangesAsync();
            return appt;
        }

        public async Task UpdateAsync(Appointment appt)
        {
            if (HasOverlap(appt))
                throw new InvalidOperationException("Doctor already has an appointment during this time.");

            _context.Entry(appt).State = EntityState.Modified;
            await _context.SaveChangesAsync();
        }

        public async Task DeleteAsync(int id)
        {
            var appt = await _context.Appointments.FindAsync(id);
            if (appt == null) return;
            _context.Appointments.Remove(appt);
            await _context.SaveChangesAsync();
        }

        private bool HasOverlap(Appointment newAppt)
        {
            return _context.Appointments.Any(a =>
                a.DoctorName == newAppt.DoctorName &&
                a.Id != newAppt.Id &&
                newAppt.StartTime < a.EndTime &&
                newAppt.EndTime > a.StartTime);
        }
    }
}
