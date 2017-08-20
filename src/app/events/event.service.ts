import { environment } from '../../environments/environment';

import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs/Rx';

import { Event } from './event.model';
import { Participant } from './participant.model';
const BASEURL = 'http://localhost:3000/api';

@Injectable()
export class EventService {
  constructor(private http: Http) {}

  all() {
    return this.http.get(`${environment.BASEURL}/events`).map(
      (response: Response) => {
        let events = response.json();
        return events;
      }
    );
  }

  save(event) {
    return this.http.post(`${environment.BASEURL}/events`, event).map(
      (response: Response) => {
        return "success";
      }
    );
  }

  update(event) {
    return this.http.patch(`${environment.BASEURL}/events/${event.id}`, event).map(
      (response: Response) => {
        return "success";
      }
    );
  }

  eventById(eventId: string) {
    return this.http.get(`${environment.BASEURL}/events/${eventId}`).map(
      (response: Response) => {
        let event = response.json();
        return event;
      }
    );
  }
}
