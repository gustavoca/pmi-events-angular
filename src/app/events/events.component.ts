'use strict';
import { Component, OnInit, Output } from '@angular/core';
import { EventService } from './event.service';
import { ParticipantCategoryService } from './participantCategory.service';
import { ParticipantService } from './participant.service';
import { PaymentService } from './payment.service';
import { MessageService } from '../_services/message.service';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.css'],
  providers: [EventService,
              ParticipantCategoryService,
              ParticipantService,
              PaymentService,
              MessageService]
})
export class EventsComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  newEvent() {
  }

  updateEvent() {
  }

  deleteEvent() {
  }
}
