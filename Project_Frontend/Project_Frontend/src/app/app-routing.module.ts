import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppointmentFormComponent } from './components/appointment-form/appointment-form.component';
import { AppointmentListComponent } from './components/appointment-list/appointment-list.component';

const routes: Routes = [
  { path: '', redirectTo: 'appointment-list', pathMatch: 'full'},
  { path: 'appointment-form', component: AppointmentFormComponent },
  { path: 'appointment-list', component: AppointmentListComponent },
   { path: '**', redirectTo: 'appointment-form' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
