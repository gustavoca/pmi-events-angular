import { environment } from '../../environments/environment';

import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs/Rx';

import { Participant } from './participant.model';
const BASEURL = 'http://localhost:3000/api';

@Injectable()
export class PaymentService {
  constructor(private http: Http) {}

  all(eventId, participantId) {
    return this.http.get(`${environment.BASEURL}/events/${eventId}/participants/${participantId}/payments`).map(
      (response: Response) => {
        let events = response.json();
        return events;
      }
    );
  }

  save(eventId, participantId, payment) {
    return this.http.post(`${environment.BASEURL}/events/${eventId}/participants/${participantId}/payments`, payment).map(
      (response: Response) => {
        return "success";
      }
    );
  }

  delete(eventId, participantId, paymentId) {
    return this.http.delete(`${environment.BASEURL}/events/${eventId}/participants/${participantId}`).map(
      (response: Response) => {
        let res = response.json();
        return res;
      }
    );
  }
}
