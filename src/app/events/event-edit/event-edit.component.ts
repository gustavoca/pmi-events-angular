import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

import { ParticipantCategoryService } from '../participantCategory.service';
import { ParticipantCategory } from '../participantCategory.model';

@Component({
  selector: 'app-event-edit',
  templateUrl: './event-edit.component.html',
  styleUrls: ['./event-edit.component.css']
})
export class EventEditComponent implements OnInit {
  id: number;
  editMode: boolean;
  participantCategories: Array<ParticipantCategory>;

  constructor(private route: ActivatedRoute,
              private participantCategoryService: ParticipantCategoryService) {}

  ngOnInit() {
    this.participantCategories = this.participantCategoryService.all();
    this.route.params
      .subscribe(
        (params: Params) => {
          this.id = +params['id'];
          this.editMode = params['id'] != null;
        }
      );
  }

  onAddEvent(form) {
    console.log(form.value);
  }

}
