import { Component, OnInit } from '@angular/core';
import { NgForm, FormGroup, FormControl, FormArray, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Location } from '@angular/common';
import { Observable } from 'rxjs/Rx';

import { ParticipantCategoryService } from '../participantCategory.service';
import { ParticipantService } from '../participant.service';
import { EventService } from '../event.service';
import { Participant, Modality } from '../participant.model';
import { ParticipantCategory } from '../participantCategory.model';
import { AlertService } from '../../_services/alert.service';

import { CanLeaveGuard } from '../../_services/can-leave-guard.service';

@Component({
  selector: 'app-participants-edit',
  templateUrl: './participants-edit.component.html',
  styleUrls: ['./participants-edit.component.css']
})
export class ParticipantsEditComponent implements OnInit {
  participantForm: FormGroup;
  participant: Participant;
  categories: Array<ParticipantCategory>;
  modalities: Array<string> = [Modality.Sale, Modality.PreSale];
  title: string = "Nuevo Participante";

  categoryName: string;
  eventId: string;
  currentTotalToPay: number;
  currentTotal: number;
  currentDiscount: number;
  participantId: string;
  preSalePercentage: number;
  changesSaved: boolean = false;
  attended: boolean;

  constructor(private route: ActivatedRoute,
              private location: Location,
              private participantCategoryService: ParticipantCategoryService,
              private participantService: ParticipantService,
              private eventService: EventService,
              private alertService: AlertService,
              private router: Router,
              private canLeaveGuard: CanLeaveGuard,
              private fb: FormBuilder) { }

  ngOnInit() {
    this.initializeForm();
    this.listenRouteParams();
  }

  onCancel() {
    this.goToSourceLink();
  }

  goToSourceLink() {
    if (this.participant.id) {
      this.router.navigate(['../../'], {relativeTo: this.route});
    }
    else {
      this.router.navigate(['../'], {relativeTo: this.route});
    }
  }

  initializeForm() {
    this.setupParticipantForm();
    this.participant = new Participant();
    this.eventId = this.route.parent.snapshot.params['id'];
    Observable.forkJoin(
      this.eventService.eventById(this.eventId, {"fields": {"preSalePercentage": "true"}}),
      this.participantCategoryService.byEvent(this.eventId)
    ).subscribe(
      data => {
        this.preSalePercentage = data[0].preSalePercentage;
        this.categories = data[1];
        this.participant = this.loadParticipant();
        this.categoryName = this.participant.category.name;
        this.calculatePayment();
      },
      error => this.alertService.error(error)
    );
  }

  listenRouteParams() {
    this.route.params.subscribe(
      (params: Params) => {
        this.participantId = params['participantId'];
        if (this.participantId) {
          this.participantService.find(this.eventId, this.participantId).subscribe(
            (participant: Participant) => {
              this.participant = this.loadParticipant(participant);
              this.categoryName = this.participant.category.name;
              this.calculatePayment();
              this.populateForm();
              if (participant) this.title = this.participant.names;
            },
            (error) => console.log(error)
          );
        }
      }
    );
  }

  loadParticipant(participant?: Participant) {
    let loadedParticipant: Participant;
    if (participant) {
      loadedParticipant = new Participant(participant.id,
                                          participant.names,
                                          participant.firstSurname,
                                          participant.lastSurname,
                                          participant.registeredAt,
                                          participant.phone,
                                          participant.email,
                                          participant.qrCode,
                                          participant.categoryId,
                                          participant.modality,
                                          participant.socialReason,
                                          participant.attended,
                                          participant.nit,
                                          participant.note,
                                          participant._payments);
      loadedParticipant.category = this.categories.filter(category => <string>category.id == loadedParticipant.categoryId)[0];
    }
    else {
      loadedParticipant = new Participant();
      loadedParticipant.category = this.categories[0];
      loadedParticipant.categoryId = loadedParticipant.category.id;

      loadedParticipant.modality = this.modalities[0];
    }
    loadedParticipant.preSalePercentage = this.preSalePercentage

    return loadedParticipant;
  }

  calculatePayment() {
    this.participant.category = this.categories.filter(category => category.name == this.categoryName)[0];
    this.currentTotal = this.participant.totalToPay();
    this.currentDiscount = this.participant.discount();
    this.currentTotalToPay = this.participant.toPay();
  }

  populateForm() {
    this.participantForm.patchValue({
      names: this.participant.names,
      firstSurname: this.participant.firstSurname,
      lastSurname: this.participant.lastSurname,
      registeredAt: new Date(this.participant.registeredAt).toISOString().slice(0,-14),
      phone: this.participant.phone,
      email: this.participant.email,
      categoryName: this.participant.category.name,
      modality: this.participant.modality,
      socialReason: this.participant.socialReason,
      nit: this.participant.nit,
      note: this.participant.note,
      attended: this.participant.attended
    });
  }

  generateQrCode() {
    return "";
  }

  onSubmit() {
    let values = this.participantForm.value;
    if (this.participant.id) {
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
                                this.categories.filter(category => category.name == values.categoryName)[0].id,
                                values.modality,
                                values.socialReason,
                                false,
                                values.nit,
                                values.note,
                                []);
    this.participantService.save(this.eventId, participant).subscribe(
      (result) => {
        this.changesSaved = true;
        this.goToSourceLink();
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
    this.participant.categoryId = this.categories.filter(category => category.name == values.categoryName)[0].id;
    this.participant.modality = values.modality;
    this.participant.socialReason = values.socialReason;
    this.participant.nit = values.nit;
    this.participant.note = values.note;
    this.participant.attended = values.attended;
    this.participantService.update(this.eventId, this.participant).subscribe(
      (result) => {
        this.changesSaved = true;
        this.goToSourceLink();
        this.alertService.success(`Participante guardado exitosamente.`, true);
      },
      (error) => this.alertService.error(error)
    );
  }

  canDeactivate(): Observable<boolean> | Promise<boolean> | boolean {
    if(this.participantForm.dirty && !this.changesSaved) {
      return confirm("Existen cambios no guardados en el formulario. Salir de todos modos?");
    }
    else {
      return true;
    }
  }

  setupParticipantForm() {
    this.participantForm = this.fb.group({
      'names'       : new FormControl(null, [Validators.required]),
      'firstSurname': new FormControl(null, [Validators.required]),
      'lastSurname' : new FormControl(null),
      'registeredAt': new FormControl(null, [Validators.required]),
      'phone'       : new FormControl(null, [Validators.required, Validators.pattern('^[0-9]+'), Validators.pattern('^.{7,10}$')]),
      'email'       : new FormControl(null, [Validators.email]),
      'categoryName': new FormControl(null),
      'modality'    : new FormControl(null),
      'total'       : new FormControl({value: "", disabled: true}),
      'discount'    : new FormControl({value: "", disabled: true}),
      'toPay'       : new FormControl({value: "", disabled: true}),
      'socialReason': new FormControl(null, [Validators.required]),
      'nit'         : new FormControl(null, [Validators.required]),
      'note'        : new FormControl(null, [Validators.required]),
      'attended'    : new FormControl(null)
    });
  }
}
