import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { Participant } from '../../../participant.model';

@Component({
  selector: '[app-participant-item]',
  templateUrl: './participant-item.component.html',
  styleUrls: ['./participant-item.component.css']
})
export class ParticipantItemComponent implements OnInit {

  @Input() participant: Participant;
  constructor(private router: Router,
              private route: ActivatedRoute) { }

  ngOnInit() {
  }

}
