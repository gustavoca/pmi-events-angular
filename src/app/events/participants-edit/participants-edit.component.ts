import { Component, OnInit } from '@angular/core';
import { NgForm, FormGroup, FormControl, FormArray, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Params } from '@angular/router';
import { Location } from '@angular/common';

import { ParticipantCategoryService } from '../participantCategory.service';
import { ParticipantService } from '../participant.service';
import { EventService } from '../event.service';
import { Participant } from '../participant.model';
import { ParticipantCategory } from '../participantCategory.model';
import { AlertService } from '../../_services/alert.service';

@Component({
  selector: 'app-participants-edit',
  templateUrl: './participants-edit.component.html',
  styleUrls: ['./participants-edit.component.css']
})
export class ParticipantsEditComponent implements OnInit {
  participantForm: FormGroup;
  participant: Participant;
  categories: Array<ParticipantCategory>;
  modalities: Array<string> = ["Venta", "Pre-venta"];

  eventId: string;
  selectedCategoryId: string;
  selectedModality: string;
  currentTotalToPay: number;
  currentTotal: number;
  currentDiscount: number;
  participantId: string;
  preSalePercentage: number;

  constructor(private route: ActivatedRoute,
              private location: Location,
              private participantCategoryService: ParticipantCategoryService,
              private participantService: ParticipantService,
              private eventService: EventService,
              private alertService: AlertService,
              private fb: FormBuilder) { }

  ngOnInit() {
    this.initializeForm();
    this.listenRouteParams();
  }

  initializeForm() {
    this.setupParticipantForm();
    this.eventId = this.route.parent.snapshot.params['id'];
    this.eventService.eventById(this.eventId, {"fields": {"preSalePercentage": "true"}}).subscribe(
      (event) => this.preSalePercentage = event.preSalePercentage,
      (error) => this.alertService.error(error)
    );
    this.participantCategoryService.byEvent(this.eventId).subscribe(
      (participantCategories) => {
        this.categories = participantCategories;
        this.selectedCategoryId = participantCategories[0].name;
        this.selectedModality = this.modalities[0];
        this.calculatePayment();
      },
      (error) => this.alertService.error(error)
    );
  }

  listenRouteParams() {
    this.route.params.subscribe(
      (params: Params) => {
        this.participantId = params['participantId'];
        if (this.participantId) {
          this.participantService.find(this.eventId, this.participantId).subscribe(
            (participant: Participant) => {
              this.participant = participant;
              this.selectedCategoryId = this.categories.filter(category => category.id.toString() == participant.categoryId)[0].name;
              this.calculatePayment();
              this.populateForm();
            },
            (error) => console.log(error)
          );
        }
      }
    );
  }

  calculatePayment() {
    this.currentTotal = this.categories.filter(category => category.name == this.selectedCategoryId)[0].price;
    this.currentDiscount = this.selectedModality == 'Venta' ? 0 : this.calculateDiscount();
    this.currentTotalToPay = this.currentTotal - this.currentDiscount;
  }

  calculateDiscount() {
    return this.currentTotal * (this.preSalePercentage / 100);
  }

  populateForm() {
    this.participantForm.patchValue({
      names: this.participant.names,
      firstSurname: this.participant.firstSurname,
      lastSurname: this.participant.lastSurname,
      registeredAt: new Date(this.participant.registeredAt).toISOString().slice(0,-14),
      phone: this.participant.phone,
      email: this.participant.email,
      categoryId: this.categories.filter(category => category.id.toString() == this.participant.categoryId)[0].name,
      modality: this.participant.modality,
      socialReason: this.participant.socialReason,
      nit: this.participant.nit,
      note: this.participant.note,
    });
  }

  generateQrCode() {
    return "";
  }

  onSubmit() {
    let values = this.participantForm.value;
    if (this.participant) {
      this.updateParticipant(values);
    }
    else { //new participant
      this.save(values);
    }
  }

  save(values) {
    let participant = new Participant(null,
                                values.names,
                                values.firstSurname,
                                values.lastSurname,
                                values.registeredAt,
                                values.phone,
                                values.email,
                                this.generateQrCode(),
                                this.categories.filter(category => category.name == values.categoryId)[0].id,
                                values.modality,
                                values.socialReason,
                                values.nit,
                                values.note);
    this.participantService.save(this.eventId, participant).subscribe(
      (result) => {
        this.location.back();
        this.alertService.success(`Nuevo participante guardado exitosamente.`, true);
      },
      (error) => this.alertService.error(error)
    );
  }
  updateParticipant(values) {
    this.participant.names = values.names;
    this.participant.firstSurname = values.firstSurname;
    this.participant.lastSurname = values.lastSurname;
    this.participant.registeredAt = values.registeredAt;
    this.participant.phone = values.phone;
    this.participant.email = values.email;
    this.participant.categoryId = this.categories.filter(category => category.name == values.categoryId)[0].id;
    this.participant.modality = values.modality;
    this.participant.socialReason = values.socialReason;
    this.participant.nit = values.nit;
    this.participant.note = values.note;
    this.participantService.update(this.eventId, this.participant).subscribe(
      (result) => {
        this.location.back();
        this.alertService.success(`Participante guardado exitosamente.`, true);
      },
      (error) => this.alertService.error(error)
    );
  }

  setupParticipantForm() {
    this.participantForm = this.fb.group({
      'names'       : new FormControl(null, [Validators.required]),
      'firstSurname': new FormControl(null, [Validators.required]),
      'lastSurname':  new FormControl(null),
      'registeredAt': new FormControl(null, [Validators.required]),
      'phone':        new FormControl(null),
      'email':        new FormControl(null),
      'categoryId':   new FormControl(null),
      'modality':     new FormControl(null),
      'total':        new FormControl({value: "", disabled: true}),
      'discount':     new FormControl({value: "", disabled: true}),
      'toPay':        new FormControl({value: "", disabled: true}),
      'socialReason': new FormControl(null),
      'nit':          new FormControl(null),
      'note':         new FormControl(null)
    });
  }
}
