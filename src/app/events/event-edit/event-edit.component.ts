import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { NgForm, FormGroup, FormControl, FormArray, FormBuilder } from '@angular/forms';
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
  // @ViewChild('f') eventForm: NgForm;
  eventForm: FormGroup;
  id: string;
  editMode: boolean;
  participantCategories: Array<ParticipantCategory>;
  event: Event;

  constructor(private route: ActivatedRoute,
              private participantCategoryService: ParticipantCategoryService,
              private eventService: EventService,
              private fb: FormBuilder) {}

  ngOnInit() {
    this.participantCategories = this.participantCategoryService.all();
    this.setupEventForm();
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

  setupEventForm() {
    this.eventForm = new FormGroup({
      'name': new FormControl(null),
      'preSalePercentage': new FormControl(null),
      'description': new FormControl(null),
      'participantCategories': new FormArray(this.createCategoriesForm())
    });
  }

  createCategoriesForm() {
    return this.participantCategories.map(category => this.fb.group({
        'name': category.name,
        'price': category.price,
        'id': category.id }
    ));
  }

  populateForm() {
    this.participantCategories = this.event.participantCategories;
    this.eventForm.patchValue({
      name                  : this.event.name,
      preSalePercentage     : this.event.preSalePercentage,
      description           : this.event.description
    });
  }

  formatCategories() {
    return this.participantCategories.reduce( (formated, current) => {
      formated[current.id] = current.price;
      return formated;
    }, {});
  }

  onSubmit() {
    let values = this.eventForm.value;
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
