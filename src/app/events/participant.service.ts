import { environment } from '../../environments/environment';

import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs/Rx';

import { Participant } from './participant.model';
import { Filter } from '../_services/filter.service';

const BASEURL = 'http://localhost:3000/api';

@Injectable()
export class ParticipantService {
  constructor(private http: Http) {}

  all(eventId, filter?) {
    // console.log(Filter.encode(filter));
    return this.http.get(`${environment.BASEURL}/events/${eventId}/participants${filter ? Filter.encode(filter): ''}`).map(
      (response: Response) => {
        let res = response.json();
        let events = res.map(p => new Participant(p.id,
                                                  p.names,
                                                  p.firstSurname,
                                                  p.lastSurname,
                                                  p.registeredAt,
                                                  p.phone,
                                                  p.email,
                                                  p.qrCode,
                                                  p.categoryId,
                                                  p.modality,
                                                  p.socialReason,
                                                  p.nit,
                                                  p.note,
                                                  p._payments));
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

  private loadParticipant(participant) {
    return new Participant();
  }

}
