import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Params } from '@angular/router';

import { ParticipantCategoryService } from '../participantCategory.service';
import { ParticipantCategory } from '../participantCategory.model';
import { Event } from '../event.model';
import { EventService } from '../event.service';

@Component({
  selector: 'app-event-edit',
  templateUrl: './event-edit.component.html',
  styleUrls: ['./event-edit.component.css']
})
export class EventEditComponent implements OnInit {
  @ViewChild('f') eventForm: NgForm;
  id: string;
  editMode: boolean;
  participantCategories: Array<ParticipantCategory>;
  event: Event;

  constructor(private route: ActivatedRoute,
              private participantCategoryService: ParticipantCategoryService,
              private eventService: EventService) {}

  ngOnInit() {
    this.participantCategories = this.participantCategoryService.all();
    this.route.params
      .subscribe(
        (params: Params) => {
          this.id = params['id'];
          this.eventService.eventById(this.id).subscribe(
            (event: Event) => {
              this.event = event;
              this.populateForm();
            },
            (error) => console.log(error)
          );
          // this.editMode = params['id'] != null;
        }
      );
  }

  populateForm() {
    console.log("", this.event);
    console.log("", this.eventForm);
    this.eventForm.form.patchValue({
      name              : this.event.name,
      preSalePercentage : this.event.preSalePercentage,
      description       : this.event.description
    });
    
  }

  onAddEvent(form) {
    console.log(form.value);
  }

}
