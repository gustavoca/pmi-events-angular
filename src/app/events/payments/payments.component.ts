import { Component, OnInit, Input } from '@angular/core';
import { NgForm, FormGroup, FormControl, FormArray, FormBuilder, Validators, ValidatorFn, AbstractControl } from '@angular/forms';
import { ActivatedRoute, Params } from '@angular/router';

import { Participant } from '../participant.model';
import { PaymentService } from '../payment.service';
import { Payment } from '../payment.model';
import { AlertService } from '../../_services/alert.service';
import { ParticipantCategory } from '../participantCategory.model';

@Component({
  selector: 'app-payments',
  templateUrl: './payments.component.html',
  styleUrls: ['./payments.component.css']
})
export class PaymentsComponent implements OnInit {

  @Input() participant: Participant;

  paymentForm: FormGroup;
  eventId: string;
  totalToPay: number;
  paid: number;
  onAccount: number;

  constructor(private fb: FormBuilder,
              private paymentService: PaymentService,
              private alertService: AlertService,
              private route: ActivatedRoute) { }

  ngOnInit() {
    this.initializeForm();
  }

  initializeForm() {
    this.eventId = this.route.parent.snapshot.params['id'];
    this.setupPaymentForm();
    this.refreshPayment();
  }

  refreshPayment() {
    this.totalToPay = this.participant.toPay();
    if ( !this.participant._payments ) this.participant._payments = [];
    this.paid = this.participant._payments.reduce((result, payment) => result + payment.amount, 0);
    this.onAccount = this.totalToPay - this.paid;
  }

  onSubmit() {
    let values = this.paymentForm.value;
    let newPayment = new Payment( null,
                                  values.amount,
                                  new Date());
    this.paymentService.save(this.eventId, this.participant.id, newPayment).subscribe(
      (result) => {
        newPayment.id = result.id;
        this.participant._payments.push(newPayment);
        this.refreshPayment();
      },
      (error) => this.alertService.error(error)
    );
  }

  setupPaymentForm() {
    this.paymentForm = this.fb.group({
      'amount': new FormControl(null, [ Validators.pattern('^[0-9]+\.?[0-9]*$'),
                                        this.checkAmount()])
    });
  }

  onDeletePayment(payment) {
    this.paymentService.delete(this.eventId, this.participant.id, payment.id).subscribe(
      (result) => {

        this.participant._payments = this.participant._payments.filter(participant => participant.id != payment.id);
        this.refreshPayment();
      },
      (error) => this.alertService.error(error)
    );
  }

  checkAmount(): ValidatorFn {
    return (control: AbstractControl): {[key: string]: any} => {
      let invalid = ((this.participant.leftToPay() - control.value) < 0) ? true : false;
      return invalid ? {'forbiddenName': {value: control.value}} : null;
    };
  }
}
