import { Component, OnInit, Input } from '@angular/core';
import { Event } from '../../event.model';
import { Router, ActivatedRoute } from '@angular/router';

import { AlertService } from '../../../_services/alert.service';
import { MessageService } from '../../../_services/message.service';
import { MessageType } from '../../../_models/message.model';
import { EventService } from '../../event.service';

@Component({
  selector: '[app-event-item]',
  templateUrl: './event-item.component.html',
  styleUrls: ['./event-item.component.css']
})
export class EventItemComponent implements OnInit {

  @Input() event: Event;

  constructor(private router: Router,
              private route: ActivatedRoute,
              private eventService: EventService,
              private alertService: AlertService,
              private messageService: MessageService) { }

  ngOnInit() {
  }

  onEditEvent() {
    this.router.navigate([this.event.id, 'edit'], {relativeTo: this.route });
  }

  onShowParticipants() {
    this.router.navigate([this.event.id, 'participants'], {relativeTo: this.route});
  }

  onCheckIn() {
    this.router.navigate([this.event.id, 'check-in'], {relativeTo: this.route});
  }

  onDeleteEvent() {
    this.eventService.delete(this.event.id).subscribe(
      (res) => {
        this.alertService.success(`Evento eliminado.`);
        this.messageService.sendMessage(MessageType.deleteEvent, this.event.id);
      },
      (error) => this.alertService.error(error)
    );
  }
}
