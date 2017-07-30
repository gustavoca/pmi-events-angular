import { ParticipantCategory } from './ParticipantCategory.model';

export class ParticipantCategoryService {
  private categories: Array<ParticipantCategory> = [
    new ParticipantCategory(1, "Público General"),
    new ParticipantCategory(2, "Miembro"),
    new ParticipantCategory(3, "Estudiante Pre-Grado"),
    new ParticipantCategory(4, "Institución Aliada"),
    new ParticipantCategory(5, "Empleado de Patrocinador"),
    new ParticipantCategory(6, "Grupo de 5-10 Personas"),
    new ParticipantCategory(7, "Grupo de 10+ Personas"),
    new ParticipantCategory(8, "Asistente al Congreso"),
    new ParticipantCategory(9, "Patrocinador"),
    new ParticipantCategory(10, "Invitado"),
    new ParticipantCategory(11, "Voluntario"),
    new ParticipantCategory(12, "Directiva"),
    new ParticipantCategory(13, "Disertante")
  ];

  all() {
    return this.categories;
  }
}
