import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-participants-edit',
  templateUrl: './participants-edit.component.html',
  styleUrls: ['./participants-edit.component.css']
})
export class ParticipantsEditComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  logData(form: NgForm) {
    console.log(form);
  }

}
