'use strict';
import { Component, OnInit, Output } from '@angular/core';
import { EventService } from './event.service';
import { ParticipantCategoryService } from './participantCategory.service';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.css'],
  providers: [EventService, ParticipantCategoryService]
})
export class EventsComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  newEvent() {

  }
}