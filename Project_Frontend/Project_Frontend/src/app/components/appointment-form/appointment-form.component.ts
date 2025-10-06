import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { AppointmentService } from '../../services/appointment.service';
import { Appointment } from '../../model/appointment';

@Component({
  selector: 'app-appointment-form',
  templateUrl: './appointment-form.component.html',
  styleUrl: './appointment-form.component.scss'
})
export class AppointmentFormComponent implements OnChanges {
  @Input() selectedAppointment?: Appointment | null = null;
  @Output() appointmentSaved = new EventEmitter<void>();

  appointmentForm: FormGroup;
  submitting = false;
  showModal = false;
  editMode = false;

  doctorList = ['Dr. Mehta', 'Dr. Sharma', 'Dr. Patel', 'Dr. Iyer'];

  constructor(
    private fb: FormBuilder,
    private appointmentService: AppointmentService
  ) {
    this.appointmentForm = this.fb.group(
      {
        id: [null],
        patientName: [
          '',
          [Validators.required, Validators.pattern('^[A-Za-z ]+$')]
        ],
        doctorName: ['', Validators.required],
        startTime: ['', Validators.required],
        endTime: ['', Validators.required]
      },
      { validators: this.dateTimeValidator }
    );
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['selectedAppointment'] && this.selectedAppointment) {
      this.openModal(true, this.selectedAppointment);
    }
  }

  dateTimeValidator(form: AbstractControl): ValidationErrors | null {
    const start = form.get('startTime')?.value;
    const end = form.get('endTime')?.value;
    if (start && end) {
      const startTime = new Date(start).getTime();
      const endTime = new Date(end).getTime();
      if (endTime <= startTime) return { invalidTimeRange: true };
    }
    return null;
  }

  openModal(edit = false, appt?: Appointment) {
    // debugger;
    this.showModal = true;
    this.editMode = edit;

    if (edit && appt) {
      this.appointmentForm.patchValue({
        id: appt.id,
        patientName: appt.patientName,
        doctorName: appt.doctorName,
        startTime: appt.startTime?.slice(0, 16),
        endTime: appt.endTime?.slice(0, 16)
      });
    } else {
      this.appointmentForm.reset();
    }
  }

  openForEdit(appt: Appointment) {
      this.openModal(true, appt);
    }

  closeModal() {
    this.showModal = false;
    this.editMode = false;
    this.selectedAppointment = null;
  }

  onSubmit() {
    // debugger;
    if (this.appointmentForm.invalid) return;
    const formValue = this.appointmentForm.value;
    this.submitting = true;

    const request$ = this.editMode
      ? this.appointmentService.update(formValue)
      : this.appointmentService.create(formValue);

    request$.subscribe({
      next: () => {
        this.submitting = false;
        this.closeModal();
        this.appointmentSaved.emit();
        alert(this.editMode ? 'Appointment updated!' : 'Appointment created!');
      },
      error: (err) => {
        this.submitting = false;
        if (err.status === 409) {
          alert('Doctor already has an appointment during this time.');
        } else {
          alert('Something went wrong.');
        }
      }
    });
  }
}