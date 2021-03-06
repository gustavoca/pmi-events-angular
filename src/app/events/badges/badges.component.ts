import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';

import { Participant, Modality } from '../participant.model';
import { ParticipantCategory } from '../participantCategory.model';
import { ParticipantService } from '../participant.service';


@Component({
  selector: 'app-badges',
  templateUrl: './badges.component.html',
  styleUrls: ['./badges.component.css']
})
export class BadgesComponent implements OnInit {

  participantId: string;
  eventId: string;
  participant: Participant;
  participantName: string;
  constructor(private route: ActivatedRoute,
              private participantService: ParticipantService) { }

  ngOnInit() {
    this.eventId = this.route.parent.snapshot.params['id'];
    // this.participant.names = "bla";
    this.listenRouteParams();
  }

  listenRouteParams() {
    this.route.params.subscribe(
      (params: Params) => {
        this.participantId = params['participantId'];
        if (this.participantId) {
          this.participantService.find(this.eventId, this.participantId).subscribe(
            (participant: Participant) => {
              this.participant = participant;
              this.participantName = `${this.participant.names} ${this.participant.firstSurname} ${this.participant.lastSurname}`;
            },
            (error) => console.log(error)
          );
        }
      }
    );
  }
}
