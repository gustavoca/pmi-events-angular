import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { NgForm, FormGroup, FormControl, FormArray, FormBuilder, Validators } from '@angular/forms';
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
    this.setupEventForm();
    this.participantCategories = this.participantCategoryService.all();
    this.route.params
      .subscribe(
        (params: Params) => {
          this.id = params['id'];
          if (this.id) {
            this.eventService.eventById(this.id).subscribe(
              (event: Event) => {
                this.event = event;
                this.populateForm();
              },
              (error) => console.log(error)
            );
          }
          else {
            this.loadCategories();
          }
          // this.editMode = params['id'] != null;
        }
      );
  }

  loadCategories() {
    const control = <FormArray>this.eventForm.controls.participantCategories;
    this.participantCategories.forEach(category => {
      control.push(this.createCategoryForm(category));
    });
    console.log(control.controls);
  }

  setupEventForm() {
    this.eventForm = this.fb.group({
      'name': new FormControl(null, [Validators.required]),
      'preSalePercentage': new FormControl(null, [Validators.required]),
      'description': new FormControl(null),
      'participantCategories': this.fb.array([])
    });
  }

  createCategoryForm(category) {
    return this.fb.group({
        'name': category.name,
        'price': [category.price, [Validators.pattern('^[0-9]*$')]],
        'id': category.id
    });
  }

  populateForm() {
    this.participantCategories = this.event.participantCategories;
    this.eventForm.patchValue({
      name                  : this.event.name,
      preSalePercentage     : this.event.preSalePercentage,
      description           : this.event.description
    });
    this.loadCategories();
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
                            values.participantCategories);
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
    this.event.participantCategories = values.participantCategories;
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
