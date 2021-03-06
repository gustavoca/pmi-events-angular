import { BrowserModule } from '@angular/platform-browser';
import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule, RequestOptions } from '@angular/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { NgxQRCodeModule } from '@techiediaries/ngx-qrcode';
import { FilterPipeModule } from 'ngx-filter-pipe';

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
import { ParticipantItemComponent } from './events/participants/participants-list/participant-item/participant-item.component';
import { AlertService } from './_services/alert.service';
import { AlertComponent } from './_directives/alert.component';
import { QrShowComponent } from './events/qr-show/qr-show.component';
import { PaymentsComponent } from './events/payments/payments.component';
import { CanLeaveGuard } from './_services/can-leave-guard.service';
import { BadgesComponent } from './events/badges/badges.component';
import { LoginComponent } from './login/login.component';

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
    ParticipantItemComponent,
    AlertComponent,
    QrShowComponent,
    PaymentsComponent,
    BadgesComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AppRoutingModule,
    ReactiveFormsModule,
    NgxQRCodeModule,
    FilterPipeModule,
    NgbModule.forRoot()
  ],
  providers: [
    AlertService,
    CanLeaveGuard
  ],
  schemas: [NO_ERRORS_SCHEMA],
  bootstrap: [AppComponent]
})
export class AppModule { }
