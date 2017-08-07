import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CheckInComponent } from './check-in/check-in.component';
import { EventsComponent } from './events/events.component';
import { EventListComponent } from './events/event-list/event-list.component';
import { ParticipantsComponent } from './events/participants/participants.component';
import { EventEditComponent } from './events/event-edit/event-edit.component';
import { EventShowComponent } from './events/event-show/event-show.component';
import { ParticipantsListComponent } from './events/participants/participants-list/participants-list.component';


const appRoutes: Routes = [
  { path: '', redirectTo: '/events', pathMatch: 'full' },
  { path: 'events', component: EventsComponent, children: [
    { path: '', component: EventShowComponent },
    { path: 'new', component: EventEditComponent },
    { path: ':id/participants', component: ParticipantsComponent, children: [
      { path: '', component: ParticipantsListComponent }
    ]},
    { path: ':id/edit', component: EventEditComponent },
  ]},
  { path: 'check-in', component: CheckInComponent }
]

@NgModule ({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})

export class AppRoutingModule {

}
