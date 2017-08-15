import { ParticipantCategory } from './participantCategory.model';

export class ParticipantCategoryService {
  private categories: Array<ParticipantCategory> = [
    new ParticipantCategory("1", "Público General", 0),
    new ParticipantCategory("2", "Miembro", 0),
    new ParticipantCategory("3", "Estudiante Pre-Grado", 0),
    new ParticipantCategory("4", "Institución Aliada", 0),
    new ParticipantCategory("5", "Empleado de Patrocinador", 0),
    new ParticipantCategory("6", "Grupo de 5-10 Personas", 0),
    new ParticipantCategory("7", "Grupo de 10+ Personas", 0),
    new ParticipantCategory("8", "Asistente al Congreso", 0),
    new ParticipantCategory("9", "Patrocinador", 0),
    new ParticipantCategory("10", "Invitado", 0),
    new ParticipantCategory("11", "Voluntario", 0),
    new ParticipantCategory("12", "Directiva", 0),
    new ParticipantCategory("13", "Disertante", 0)
  ];

  all() {
    return this.categories;
  }
}
