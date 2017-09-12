import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Routes, RouterModule } from '@angular/router';
import { Observable } from 'rxjs/Rx';

import { ParticipantService } from '../events/participant.service';
import { ParticipantCategory } from '../events/participantCategory.model';
import { Participant } from '../events/participant.model';
import { EventService } from '../events/event.service';
@Component({
  selector: 'app-check-in',
  templateUrl: './check-in.component.html',
  styleUrls: ['./check-in.component.css']
})
export class CheckInComponent implements OnInit {

  eventId: string;
  participants: Participant[];
  participantNames: Array<string>;
  preSalePertencage: number;
  search: any;
  participantCategories: ParticipantCategory[];

  constructor(private route: ActivatedRoute,
              private participantService: ParticipantService,
              private eventService: EventService) { }

  ngOnInit() {
    this.initializeForm();
    this.listenRouteParams();
  }

  initializeForm() {

  }

  listenRouteParams() {
    this.route.params.subscribe(
      (params: Params) => {
        this.eventId = params['id'];
        Observable.forkJoin(
          this.eventService.eventById(this.eventId, {"fields": {"preSalePercentage": "true", "participantCategories": "true"}}),
          this.participantService.all(this.eventId, ["names", "firstSurname", "lastSurname"])
        ).subscribe(
          (data) => {
            this.preSalePertencage = data[0].preSalePertencage;
            this.participantCategories = data[0].participantCategories;
            this.participantNames = data[1].map(participant => `${participant.names} ${participant.firstSurname} ${participant.lastSurname}`);
            console.log(this.participantNames);
            this.search = (text$: Observable<string>) =>
            text$
              .debounceTime(200)
              .distinctUntilChanged()
              .map(term => term.length < 2 ? []
                : this.participantNames.filter(v => v.toLowerCase().indexOf(term.toLowerCase()) > -1).slice(0, 10));
          },
          (error) => console.log(error)
        );
      }
    );
  }
}
