import { Component, OnInit, ViewChild } from '@angular/core';
import { AppointmentService } from '../../services/appointment.service';
import { Appointment } from '../../model/appointment';
import { FormBuilder, FormGroup } from '@angular/forms';
import { finalize } from 'rxjs';
import { AppointmentFormComponent } from '../appointment-form/appointment-form.component';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-appointment-list',
  templateUrl: './appointment-list.component.html',
  styleUrl: './appointment-list.component.scss'
})

//1. Modall to open form. 2.try yo implement simple jwt. 3. implment pagination if time permits
export class AppointmentListComponent implements OnInit {
  appointments: Appointment[] = [];
  filteredAppointments: Appointment[] = [];
  pagedAppointments: Appointment[] = [];
  loading = false;
  searchForm: FormGroup;
  loggedIn = false;

  currentPage = 1;
  pageSize = 5;
  Math = Math;

  @ViewChild(AppointmentFormComponent) appointmentFormComp!: AppointmentFormComponent;

  constructor(
    private appointmentService: AppointmentService,
    private fb: FormBuilder,
    private authService: AuthService,
  ) {
    this.searchForm = this.fb.group({
      searchTerm: ['']
    });
  }

  ngOnInit(): void {
    this.loggedIn = this.authService.isLoggedIn();
    if (this.loggedIn) this.loadAppointments();
  }

  onLogin(): void {
    this.authService.login('demoUser', 'demoPass').subscribe({
      next: () => {
        this.loggedIn = true;
        this.loadAppointments();
      },
      error: (err) => console.error('Login failed:', err)
    });
  }

  onLogout(): void {
    this.authService.logout();
    this.loggedIn = false;
    this.appointments = [];
    this.filteredAppointments = [];
  }

  loadAppointments(): void {
    this.loading = true;
    this.appointmentService.getAll()
      .pipe(finalize(() => (this.loading = false)))
      .subscribe({
        next: (data) => {
          this.appointments = data;
          this.filteredAppointments = [...this.appointments];
          this.setPage(1);
        },
        error: (err) => console.error('Error loading appointments:', err)
      });
  }

  onSearch(): void {
    const term = this.searchForm.value.searchTerm?.toLowerCase().trim();
    if (!term) {
      this.filteredAppointments = [...this.appointments];
      this.setPage(1);
      return;
    }

    this.filteredAppointments = this.appointments.filter(
      (a) =>
        a.patientName.toLowerCase().includes(term) ||
        a.doctorName.toLowerCase().includes(term)
    );
    this.setPage(1);
  }

  onReset(): void {
    this.searchForm.reset();
    this.filteredAppointments = [...this.appointments];
    this.setPage(1);
  }

  onView(appt: Appointment): void {
    alert(
      `Appointment #${appt.id}\n\n` +
      `Patient: ${appt.patientName}\nDoctor: ${appt.doctorName}\n` +
      `Start: ${new Date(appt.startTime).toLocaleString()}\nEnd: ${new Date(appt.endTime).toLocaleString()}`
    );
  }

  onDelete(id?: number): void {
    if (!id) return;
    if (confirm('Are you sure you want to delete this appointment?')) {
      this.appointmentService.delete(id).subscribe({
        next: () => {
          this.appointments = this.appointments.filter(a => a.id !== id);
          this.filteredAppointments = this.filteredAppointments.filter(a => a.id !== id);
          this.setPage(this.currentPage);
        },
        error: (err) => console.error('Delete failed:', err)
      });
    }
  }

  onEdit(appt: Appointment) {
    this.appointmentFormComp.openForEdit(appt);
  }

  setPage(page: number): void {
    const totalPages = Math.ceil(this.filteredAppointments.length / this.pageSize);
    if (page < 1 || page > totalPages) return;
    this.currentPage = page;

    const startIndex = (page - 1) * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    this.pagedAppointments = this.filteredAppointments.slice(startIndex, endIndex);
  }

  nextPage(): void {
    this.setPage(this.currentPage + 1);
  }

  prevPage(): void {
    this.setPage(this.currentPage - 1);
  }
}
