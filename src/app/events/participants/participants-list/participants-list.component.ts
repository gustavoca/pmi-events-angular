import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { ViewChild } from '@angular/core';
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { ParticipantService } from '../../participant.service';
import { Participant } from '../../participant.model';
import { AlertService } from '../../../_services/alert.service';
import { MessageService } from '../../../_services/message.service';
import { MessageType } from '../../../_models/message.model';


@Component({
  selector: 'app-participants-list',
  templateUrl: './participants-list.component.html',
  styleUrls: ['./participants-list.component.css']
})
export class ParticipantsListComponent implements OnInit {

  @ViewChild('content') private content;
  eventId: string
  participants: Array<Participant>;
  participantItemSubscription: Subscription;
  constructor(private participantService: ParticipantService,
              private messageService: MessageService,
              private alertService: AlertService,
              private router: Router,
              private route: ActivatedRoute,
              private modalService: NgbActiveModal) { }

  ngOnInit() {
    this.initializeForm();
    this.subscribeToParticipantEvents();
  }

  onParticipantMessage(message) {
    switch(message.type) {
      case MessageType.deleteParticipant: {
        this.participants = this.participants.filter(participant => participant.id != message.text);
        break;
      }
      case MessageType.showQr: {
        console.log("should show qr", message.text);
        console.log(this.modalService);
        this.modalService.open(this.content);
        break;
      }
    }

  }
  subscribeToParticipantEvents() {
    this.participantItemSubscription = this.messageService.getMessage().subscribe(this.onParticipantMessage);
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
    this.participantItemSubscription.unsubscribe();
  }

}
