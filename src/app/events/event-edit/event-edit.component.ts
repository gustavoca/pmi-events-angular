import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { NgForm, FormGroup, FormControl, FormArray, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Location } from '@angular/common';
import { Observable } from 'rxjs/observable';

import { ParticipantCategoryService } from '../participantCategory.service';
import { ParticipantCategory } from '../participantCategory.model';
import { Event } from '../event.model';
import { EventService } from '../event.service';
import { AlertService } from '../../_services/alert.service';
import { CanLeaveGuard } from '../../_services/can-leave-guard.service';

@Component({
  selector: 'app-event-edit',
  templateUrl: './event-edit.component.html',
  styleUrls: ['./event-edit.component.css']
})
export class EventEditComponent implements OnInit, CanLeaveGuard {
  eventForm: FormGroup;
  id: string;
  editMode: boolean;
  participantCategories: Array<ParticipantCategory>;
  event: Event;
  title: string;
  changesSaved: boolean = false;

  constructor(private route: ActivatedRoute,
              private participantCategoryService: ParticipantCategoryService,
              private location: Location,
              private eventService: EventService,
              private alertService: AlertService,
              private router: Router,
              private fb: FormBuilder) {}

  ngOnInit() {
    this.initializeForm();
    this.listenRouteParams();
  }

  initializeForm() {
    this.title = "Nuevo Evento";
    this.setupEventForm();
  }

  getParticipantCategoryForm() {
    return <FormArray>this.eventForm.get('participantCategories');
  }

  onCancel() {
    this.goToSourceLink();
  }

  goToSourceLink() {
    this.router.navigate(['../../'], {relativeTo: this.route});
  }

  canDeactivate(): Observable<boolean> | Promise<boolean> | boolean {
    if(this.eventForm.dirty && !this.changesSaved) {
      return confirm("Existen cambios no guardados en el formulario. Salir de todos modos?");
    }
    else {
      return true;
    }
  }

  listenRouteParams() {
    this.participantCategories = this.participantCategoryService.all();
    this.route.params
      .subscribe(
        (params: Params) => {
          this.id = params['id'];
          if (this.id) {
            this.eventService.eventById(this.id).subscribe(
              (event: Event) => {
                this.event = event;
                this.title = `${this.event.name}`;
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
  }

  setupEventForm() {
    this.eventForm = this.fb.group({
      'name': new FormControl(null, [Validators.required]),
      'description': new FormControl(null),
      'participantCategories': this.fb.array([])
    });
  }

  createCategoryForm(category) {
    return this.fb.group({
        'name': category.name,
        'price': [category.price, [Validators.pattern('^[0-9]+\.?[0-9]*$')]],
        'presalePrice': [category.presalePrice, [Validators.pattern('^[0-9]+\.?[0-9]*$')]],
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
      this.updateEvent(values);
    }
    else { //new event
      this.save(values);
    }
  }

  save(values) {
    let event = new Event(null,
                          values.name,
                          values.description,
                          values.preSalePercentage,
                          [],
                          values.participantCategories);
    this.eventService.save(event).subscribe(
      (result) => {
        this.changesSaved = true;
        this.goToSourceLink();
        this.alertService.success(`Nuevo evento guardado exitosamente.`, true);
      },
      (error) => this.alertService.error(error)
    );
  }

  updateEvent(values) {
    this.event.name = values.name;
    this.event.description = values.description;
    this.event.preSalePercentage = values.preSalePercentage;
    this.event.participantCategories = values.participantCategories;
    this.eventService.update(this.event).subscribe(
      (result) => {
        this.changesSaved = true;
        this.goToSourceLink();
        this.alertService.success(`Evento actualizado exitosamente.`, true);
      },
      (error) => console.log(error)
    );
  }

  // createParticipantCategories(categories: Object) {
  //   let newParticipantCategories = [];
  //   console.log("", categories);
  //   for (let index in categories) {
  //     newParticipantCategories.push(new ParticipantCategory(
  //       index,
  //       this.participantCategories.filter(cat => cat.id === index)[0].name,
  //       categories[index],
  //       0
  //     ));
  //   }
  //   return newParticipantCategories;
  // }

}
