import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { ViewChild } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Rx';

import { ParticipantCategoryService } from '../../participantCategory.service';
import { ParticipantService } from '../../participant.service';
import { Participant } from '../../participant.model';
import { AlertService } from '../../../_services/alert.service';
import { MessageService } from '../../../_services/message.service';
import { MessageType } from '../../../_models/message.model';
import { ParticipantCategory } from '../../participantCategory.model';
import { EventService } from '../../event.service';


@Component({
  selector: 'app-participants-list',
  templateUrl: './participants-list.component.html',
  styleUrls: ['./participants-list.component.css']
})
export class ParticipantsListComponent implements OnInit {

  @ViewChild('content') private content;
  @ViewChild('payments') private payments;

  eventId: string;
  participants: Array<Participant>;
  participantItemSubscription: Subscription;
  currentParticipant: Participant;
  participantCategories: Array<ParticipantCategory>;
  preSalePercentage: number;

  constructor(private participantService: ParticipantService,
              private messageService: MessageService,
              private alertService: AlertService,
              private participantCategoryService: ParticipantCategoryService,
              private eventService: EventService,
              private router: Router,
              private route: ActivatedRoute,
              private modalService: NgbModal) { }

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
        this.modalService.open(this.content);
        break;
      }
      case MessageType.showPayments: {
        this.currentParticipant = message.text;
        this.currentParticipant.category = this.participantCategories.filter(category => <string>category.id == this.currentParticipant.categoryId)[0];
        this.currentParticipant.preSalePercentage = this.preSalePercentage;
        this.modalService.open(this.payments);
      }
    }

  }
  subscribeToParticipantEvents() {
    this.participantItemSubscription = this.messageService.getMessage().subscribe(this.onParticipantMessage.bind(this));
  }

  initializeForm() {
    this.eventId = this.route.snapshot.params['id'];
    Observable.forkJoin(
      this.participantService.all(this.eventId),
      this.participantCategoryService.byEvent(this.eventId),
      this.eventService.eventById(this.eventId, {"fields": {"preSalePercentage": "true"}})
    ).subscribe(
      data => {
        this.participants = data[0];
        this.participantCategories = data[1];
        this.preSalePercentage = data[2].preSalePercentage;
      },
      error => this.alertService.error(error)
    );
  }

  onNewParticipant() {
    this.router.navigate(['new'], {relativeTo: this.route });
  }

  ngOnDestroy() {
    this.participantItemSubscription.unsubscribe();
  }

}
