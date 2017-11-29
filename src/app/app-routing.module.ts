import { AuthService } from 'app/login/auth.service';
import { AuthGuard } from './_services/auth.guard.service';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CheckInComponent } from './check-in/check-in.component';
import { EventsComponent } from './events/events.component';
import { EventListComponent } from './events/event-list/event-list.component';
import { ParticipantsComponent } from './events/participants/participants.component';
import { EventEditComponent } from './events/event-edit/event-edit.component';
import { EventShowComponent } from './events/event-show/event-show.component';
import { ParticipantsEditComponent } from './events/participants-edit/participants-edit.component';
import { LoginComponent } from './login/login.component';
import { ParticipantsListComponent } from 'app/events/participants/participants-list/participants-list.component';
import { BadgesComponent } from './events/badges/badges.component';
import { CanLeaveGuard } from './_services/can-leave-guard.service';

const appRoutes: Routes = [
  { path: 'login', component: LoginComponent },
  {
    path: 'events', component: EventsComponent, canActivate: [AuthGuard], canActivateChild: [AuthGuard], children: [
      { path: 'new', component: EventEditComponent, canDeactivate: [CanLeaveGuard] },
      {
        path: ':id/participants', component: ParticipantsComponent, children: [
          { path: ':participantId/edit', component: ParticipantsEditComponent, canDeactivate: [CanLeaveGuard] },
          { path: 'new', component: ParticipantsEditComponent, canDeactivate: [CanLeaveGuard] },
          { path: ':participantId/badge', component: BadgesComponent },
          { path: '', component: ParticipantsListComponent }
        ]
      },
      { path: ':id/edit', component: EventEditComponent, canDeactivate: [CanLeaveGuard] },
      { path: ':id/check-in', component: CheckInComponent },
      { path: '', component: EventShowComponent },
    ]
  },
  // { path: 'check-in', component: CheckInComponent },
  { path: '', redirectTo: '/events', pathMatch: 'full' }
];

@NgModule({
  // imports: [RouterModule.forRoot(appRoutes, { enableTracing: true })],
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule],
  providers: [AuthGuard, AuthService]
})

export class AppRoutingModule {

}
