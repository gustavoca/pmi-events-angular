import { environment } from '../../environments/environment';

import { Injectable } from '@angular/core';
import { Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';

import { Participant } from './participant.model';
import { Filter } from '../_services/filter.service';
import { HttpClient } from '../http-client';
import { ParticipantCategoryService } from './participantCategory.service';

const BASEURL = 'http://localhost:3000/api';

@Injectable()
export class ParticipantService {
  constructor(private http: HttpClient,
              private participantCategoryService: ParticipantCategoryService) {}

  all(eventId, filter?) {
    return this.http.get(`${environment.BASEURL}/events/${eventId}/participants${filter ? Filter.encode(filter): ''}`).map(
      (response: Response) => {
        let res = response.json();
        let participants = res.map(p => new Participant(p.id,
                                                  p.names,
                                                  p.firstSurname,
                                                  p.lastSurname,
                                                  p.registeredAt,
                                                  p.phone,
                                                  p.lunch,
                                                  p.discount,
                                                  p.email,
                                                  p.qrCode,
                                                  p.categoryId,
                                                  p.modality,
                                                  p.socialReason,
                                                  p.attended,
                                                  p.nit,
                                                  p.note,
                                                  p._payments));
        return participants;
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
        let res = response.json();
        return res;
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
