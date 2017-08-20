import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
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
    this.participantCategories = this.event.participantCategories;
    this.eventForm.form.patchValue({
      name                  : this.event.name,
      preSalePercentage     : this.event.preSalePercentage,
      description           : this.event.description,
      participantCategories : {1: "212", 2: "1123"}
    });
  }

  formatCategories() {
    return this.participantCategories.reduce( (formated, current) => {
      formated[current.id] = current.price;
      return formated;
    }, {});
  }

  onSubmit(form) {
    let values = form.value;
    if (this.event) {
      console.log("UPDATING");
      this.updateEvent(values);
    }
    else { //new event
      let event = new Event(null,
                            values.name,
                            values.description,
                            values.preSalePercentage,
                            [],
                            this.createParticipantCategories(values.participantCategories));
      this.eventService.save(event).subscribe(
        (result) => {
          console.log(result);
        },
        (error) => console.log(error)
      );
    }
  }

  updateEvent(values) {
    this.event.name = values.name;
    this.event.description = values.description;
    this.event.preSalePercentage = values.preSalePercentage;
    this.event.participantCategories = this.createParticipantCategories(values.participantCategories);
    this.eventService.update(this.event).subscribe(
      (result) => {
        console.log(result);
      },
      (error) => console.log(error)
    );
  }

  createParticipantCategories(categories: Object) {
    let newParticipantCategories = [];
    for (let index in categories) {
      newParticipantCategories.push(new ParticipantCategory(
        index,
        this.participantCategories.filter(cat => cat.id === index)[0].name,
        categories[index]
      ));
    }
    return newParticipantCategories;
  }

}
