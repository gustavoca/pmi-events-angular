import { Injectable } from '@angular/core';
import { Response } from '@angular/http';
import 'rxjs/Rx';

import { ParticipantCategory } from './participantCategory.model';
import { Participant } from './participant.model';
import { environment } from '../../environments/environment';
import { HttpClient } from '../http-client';
const BASEURL = 'http://localhost:3000/api';

@Injectable()
export class ParticipantCategoryService {

  private categories: Array<ParticipantCategory> = [
    new ParticipantCategory("1", "Público General", 0, 0),
    new ParticipantCategory("2", "Miembro", 0, 0),
    new ParticipantCategory("3", "Estudiante Pre-Grado", 0, 0),
    new ParticipantCategory("4", "Institución Aliada", 0, 0),
    new ParticipantCategory("5", "Empleado de Patrocinador", 0, 0),
    new ParticipantCategory("6", "Grupo de 5-10 Personas", 0, 0),
    new ParticipantCategory("7", "Grupo de 10+ Personas", 0, 0),
    new ParticipantCategory("8", "Asistente al Congreso", 0, 0),
    new ParticipantCategory("9", "Patrocinador", 0, 0),
    new ParticipantCategory("10", "Invitado", 0, 0),
    new ParticipantCategory("11", "Voluntario", 0, 0),
    new ParticipantCategory("12", "Directiva", 0, 0),
    new ParticipantCategory("13", "Disertante", 0, 0)
  ];

  constructor(private http: HttpClient) {}

  all() {
    return this.categories;
  }

  byEvent(eventId) {
    return this.http.get(`${environment.BASEURL}/events/${eventId}/participant_categories`).map(
      (response: Response) => {
        let participantCategories = response.json();
        return participantCategories;
      }
    );
  }
}
