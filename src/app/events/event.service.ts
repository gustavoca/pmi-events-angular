import { environment } from '../../environments/environment';

import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs/Rx';

import { Event } from './event.model';
import { Participant } from './participant.model';
import { Filter } from '../_services/filter.service';
const BASEURL = 'http://localhost:3000/api';

@Injectable()
export class EventService {
  constructor(private http: Http) {}

  all(filter?) {
    return this.http.get(`${environment.BASEURL}/events${filter ? Filter.encode(filter): ''}`).map(
      (response: Response) => {
        let events = response.json();
        return events;
      }
    );
  }

  save(event) {
    return this.http.post(`${environment.BASEURL}/events`, event).map(
      (response: Response) => {
        let events = response.json();
        return events;
      }
    );
  }

  update(event) {
    return this.http.patch(`${environment.BASEURL}/events/${event.id}`, event).map(
      (response: Response) => {
        let events = response.json();
        return events;
      }
    );
  }

  delete(eventId) {
    return this.http.delete(`${environment.BASEURL}/events/${eventId}`).map(
      (response: Response) => {
        let events = response.json();
        return events;
      }
    );
  }

  eventById(eventId: string, params = undefined) {
    let fields;
    if (params && params.fields) fields = `?filter=${encodeURIComponent(JSON.stringify(params))}`;
    return this.http.get(`${environment.BASEURL}/events/${eventId}${fields ? fields : ''}`).map(
      (response: Response) => {
        let event = response.json();
        return event;
      }
    );
  }
}
