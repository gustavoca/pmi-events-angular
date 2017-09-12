import { Component, OnInit, Input } from '@angular/core';
import { NgForm, FormGroup, FormControl, FormArray, FormBuilder, Validators } from '@angular/forms';
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
    this.updatePayment();
  }

  updatePayment() {
    this.totalToPay = this.participant.toPay();
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
        this.alertService.success(`eeexito.`);
        this.participant._payments.push(newPayment);
        this.updatePayment();
      },
      (error) => this.alertService.error(error)
    );
  }

  setupPaymentForm() {
    this.paymentForm = this.fb.group({
      'amount': new FormControl(null, [Validators.required])
    });
  }
}
