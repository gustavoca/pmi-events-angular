import { environment } from '../../environments/environment';

import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs/Rx';

import { Participant } from './participant.model';
const BASEURL = 'http://localhost:3000/api';

@Injectable()
export class ParticipantService {
  constructor(private http: Http) {}

  all(eventId) {
    return this.http.get(`${environment.BASEURL}/events/${eventId}/participants`).map(
      (response: Response) => {
        let events = response.json();
        return events;
      }
    );
  }

  find(eventId, participantId) {
    return this.http.get(`${environment.BASEURL}/events/${eventId}/participants/${participantId}`).map(
      (response: Response) => {
        let events = response.json();
        return events;
      }
    );
  }

  save(eventId, participant) {
    return this.http.post(`${environment.BASEURL}/events/${eventId}/participants`, participant).map(
      (response: Response) => {
        return "success";
      }
    );
  }

  delete(eventId, participantId) {
    return this.http.delete(`${environment.BASEURL}/events/${eventId}/participants/${participantId}`).map(
      (response: Response) => {
        let res = response.json();
        return res;
      }
    );
  }

  update(eventId, participant) {
    return this.http.put(`${environment.BASEURL}/events/${eventId}/participants/${participant.id}`, participant).map(
      (response: Response) => {
        return "success";
      }
    );
  }

}
