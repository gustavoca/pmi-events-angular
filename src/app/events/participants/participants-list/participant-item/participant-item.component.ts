import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { Participant } from '../../../participant.model';
import { ParticipantService } from '../../../participant.service';
import { AlertService } from '../../../../_services/alert.service';
import { MessageService } from '../../../../_services/message.service';
import { MessageType } from '../../../../_models/message.model';

@Component({
  selector: '[app-participant-item]',
  templateUrl: './participant-item.component.html',
  styleUrls: ['./participant-item.component.css']
})
export class ParticipantItemComponent implements OnInit {

  @Input() participant: Participant;
  @Input() eventId: string;
  constructor(private router: Router,
              private route: ActivatedRoute,
              private participantService: ParticipantService,
              private alertService: AlertService,
              private messageService: MessageService) { }

  ngOnInit() {
  }

  onEditParticipant() {
    this.router.navigate([this.participant.id, 'edit'], {relativeTo: this.route });
  }

  onShowQrCode() {
    this.messageService.sendMessage(MessageType.showQr, this.participant);
  }

  onDeleteParticipant() {
    this.participantService.delete(this.eventId, this.participant.id).subscribe(
      (res) => {
        this.alertService.success(`Participante eliminado.`);
        this.messageService.sendMessage(MessageType.deleteParticipant, this.participant.id);
      },
      (error) => this.alertService.error(error)
    );
  }
}
