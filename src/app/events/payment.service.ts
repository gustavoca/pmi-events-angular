import { environment } from '../../environments/environment';

import { Injectable } from '@angular/core';
import { Response } from '@angular/http';
import 'rxjs/Rx';

import { Participant } from './participant.model';
import { HttpClient } from '../http-client';
const BASEURL = 'http://localhost:3000/api';

@Injectable()
export class PaymentService {
  constructor(private http: HttpClient) {}

  all(eventId, participantId) {
    return this.http.get(`${environment.BASEURL}/events/${eventId}/participants/${participantId}/payments`).map(
      (response: Response) => {
        let payments = response.json();
        return payments;
      }
    );
  }

  save(eventId, participantId, payment) {
    return this.http.post(`${environment.BASEURL}/events/${eventId}/participants/${participantId}/payments`, payment).map(
      (response: Response) => {
        let res = response.json();
        return res;
      }
    );
  }

  delete(eventId, participantId, paymentId) {
    return this.http.delete(`${environment.BASEURL}/events/${eventId}/participants/${participantId}/payments/${paymentId}`).map(
      (response: Response) => {
        let res = response.json();
        return res;
      }
    );
  }
}
