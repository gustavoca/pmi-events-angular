'use strict';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';

import { ParticipantService } from '../../participant.service';
import { Participant } from '../../participant.model';
import { AlertService } from '../../../_services/alert.service';
import { MessageService } from '../../../_services/message.service';

@Component({
  selector: 'app-participants-list',
  templateUrl: './participants-list.component.html',
  styleUrls: ['./participants-list.component.css']
})
export class ParticipantsListComponent implements OnInit {

  eventId: string
  participants: Array<Participant>;
  participantItemSubscription: Subscription;
  constructor(private participantService: ParticipantService,
              private messageService: MessageService,
              private alertService: AlertService,
              private router: Router,
              private route: ActivatedRoute) { }

  ngOnInit() {
    this.initializeForm();
    this.subscribeToParticipantEvents();
  }

  subscribeToParticipantEvents() {
    this.participantItemSubscription = this.messageService.getMessage().subscribe(
      (deletedParticipantId) => { //alwayws will send a delete for now
        this.participants = this.participants.filter(participant => participant.id != deletedParticipantId.text);
      }
    );
  }

  initializeForm() {
    this.eventId = this.route.snapshot.params['id'];
    this.participantService.all(this.eventId).subscribe(
      (participants) => this.participants = participants,
      (error) => this.alertService.error(error)
    );
  }

  onNewParticipant() {
    this.router.navigate(['new'], {relativeTo: this.route });
  }

  ngOnDestroy() {
    // unsubscribe to ensure no memory leaks
    this.participantItemSubscription.unsubscribe();
  }

}
