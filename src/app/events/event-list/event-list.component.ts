'use strict';
import { Component, OnInit } from '@angular/core';
import { Event } from '../event.model';
import { EventService } from '../event.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-event-list',
  templateUrl: './event-list.component.html',
  styleUrls: ['./event-list.component.css']
})
export class EventListComponent implements OnInit {
  events: Array<Event>;
  constructor(private eventService: EventService,
              private router: Router,
              private route: ActivatedRoute) { }

  ngOnInit() {
    this.events = this.eventService.allEvents();
  }
}
