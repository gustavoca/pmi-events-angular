'use strict';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';

import { EventService } from '../event.service';
import { Event } from '../event.model';

import { AlertService } from '../../_services/alert.service';
import { MessageService } from '../../_services/message.service';
import { MessageType } from '../../_models/message.model';

@Component({
  selector: 'app-event-list',
  templateUrl: './event-list.component.html',
  styleUrls: ['./event-list.component.css']
})
export class EventListComponent implements OnInit {
  events: Event[];
  eventItemSubscription: Subscription;
  constructor(private eventService: EventService,
              private router: Router,
              private route: ActivatedRoute,
              private alertService: AlertService,
              private messageService: MessageService) { }

  ngOnInit() {
    this.subscribeToEventItem();
    this.eventService.all(["id", "name", "createdAt"]).subscribe(
      (events: Event[]) => this.events = events,
      (error) => this.alertService.error(error)
    );
  }

  subscribeToEventItem() {
    this.eventItemSubscription = this.messageService.getMessage().subscribe(this.onEventItemMessage.bind(this));
  }

  onEventItemMessage(message) {
    switch(message.type) {
      case MessageType.deleteEvent: {
        this.events = this.events.filter(event => event.id != message.text);
        break;
      }
    }
  }
  ngOnDestroy() {
    this.eventItemSubscription.unsubscribe();
  }
}
