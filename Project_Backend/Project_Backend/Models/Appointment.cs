﻿namespace Project_Backend.Models
{
    public class Appointment
    {
        public int? Id { get; set; }
        public string PatientName { get; set; } = string.Empty;
        public string DoctorName { get; set; } = string.Empty;
        public DateTime StartTime { get; set; }
        public DateTime EndTime { get; set; }
    }
}
