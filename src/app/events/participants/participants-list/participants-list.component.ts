'use strict';
import { Component, OnInit } from '@angular/core';

import { ParticipantService } from '../../participant.service';
import { Participant } from '../../participant.model';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-participants-list',
  templateUrl: './participants-list.component.html',
  styleUrls: ['./participants-list.component.css']
})
export class ParticipantsListComponent implements OnInit {

  participants: Array<Participant>;
  constructor(private participantService: ParticipantService,
              private router: Router,
              private route: ActivatedRoute) { }

  ngOnInit() {
    let eventId = this.route.snapshot.params['id'];
    this.participantService.all(eventId).subscribe(
      (participants) => this.participants = participants,
      (error) => console.log(error)
    );
  }

}
