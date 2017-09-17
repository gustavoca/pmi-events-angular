import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CheckInComponent } from './check-in/check-in.component';
import { EventsComponent } from './events/events.component';
import { EventListComponent } from './events/event-list/event-list.component';
import { ParticipantsComponent } from './events/participants/participants.component';
import { EventEditComponent } from './events/event-edit/event-edit.component';
import { EventShowComponent } from './events/event-show/event-show.component';
import { ParticipantsEditComponent } from './events/participants-edit/participants-edit.component';
import { ParticipantsListComponent } from 'app/events/participants/participants-list/participants-list.component';
import { CanLeaveGuard } from './_services/can-leave-guard.service';

const appRoutes: Routes = [
  {
    path: 'events', component: EventsComponent, children: [
      { path: 'new', component: EventEditComponent },
      {
        path: ':id/participants', component: ParticipantsComponent, children: [
          { path: ':participantId/edit', component: ParticipantsEditComponent },
          { path: 'new', component: ParticipantsEditComponent },
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
]

@NgModule({
  // imports: [RouterModule.forRoot(appRoutes, { enableTracing: true })],
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})

export class AppRoutingModule {

}
