import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule, RequestOptions } from '@angular/http';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AppComponent } from './app.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { CheckInComponent } from './check-in/check-in.component';
import { EventsComponent } from './events/events.component';
import { EventListComponent } from './events/event-list/event-list.component';
import { ParticipantsComponent } from './events/participants/participants.component';
import { ParticipantsListComponent } from './events/participants/participants-list/participants-list.component';
import { EventItemComponent } from './events/event-list/event-item/event-item.component';
import { AppRoutingModule } from './app-routing.module';
import { EventEditComponent } from './events/event-edit/event-edit.component';
import { EventShowComponent } from './events/event-show/event-show.component';
import { ParticipantsEditComponent } from './events/participants-edit/participants-edit.component';

@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    CheckInComponent,
    EventsComponent,
    EventListComponent,
    ParticipantsComponent,
    ParticipantsListComponent,
    EventItemComponent,
    EventEditComponent,
    EventShowComponent,
    ParticipantsEditComponent,
    ParticipantsListComponent
  ],
  imports: [
    NgbModule.forRoot(),
    BrowserModule,
    FormsModule,
    HttpModule,
    AppRoutingModule,
    ReactiveFormsModule
  ],
  providers: [
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
