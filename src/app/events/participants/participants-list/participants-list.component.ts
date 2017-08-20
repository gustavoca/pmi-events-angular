'use strict';
import { Component, OnInit } from '@angular/core';

import { EventService } from '../../event.service';
import { Participant } from '../../participant.model';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-participants-list',
  templateUrl: './participants-list.component.html',
  styleUrls: ['./participants-list.component.css']
})
export class ParticipantsListComponent implements OnInit {

  participants: Array<Participant>;
  constructor(private eventService: EventService,
              private router: Router,
              private route: ActivatedRoute) { }

  ngOnInit() {
    let eventId = this.route.snapshot.params['id'];
    this.eventService.allParticipantsByEventId(eventId).subscribe(
      (participants) => this.participants = participants,
      (error) => console.log(error)
    );
  }

}
