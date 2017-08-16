import { Component, OnInit, Input } from '@angular/core';
import { Event } from '../../event.model';
import { Router, ActivatedRoute } from '@angular/router';
@Component({
  selector: '[app-event-item]',
  templateUrl: './event-item.component.html',
  styleUrls: ['./event-item.component.css']
})
export class EventItemComponent implements OnInit {

  @Input() event: Event;

  constructor(private router: Router,
              private route: ActivatedRoute) { }

  ngOnInit() {
  }

  onEditEvent() {
    console.log('exec edit');
    this.router.navigate([this.event.id, 'edit'], {relativeTo: this.route });
  }

  onNewParticipant() {
    console.log('exec particip');
    this.router.navigate([this.event.id, 'participants', 'new'], {relativeTo: this.route });
  }

  onDeleteEvent() {
    // this.router.navigate(['edit'], {relativeTo: this.route });
  }
}
