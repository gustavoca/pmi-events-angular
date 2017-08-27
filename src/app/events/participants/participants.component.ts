import { Component, OnInit } from '@angular/core';
import { MessageService } from '../../_services/message.service';

@Component({
  selector: 'app-participants',
  templateUrl: './participants.component.html',
  styleUrls: ['./participants.component.css'],
  providers: [MessageService]
})
export class ParticipantsComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
