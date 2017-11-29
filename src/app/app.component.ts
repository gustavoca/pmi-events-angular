'use strict';
import { Component } from '@angular/core';
import { HttpClient } from './http-client';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [HttpClient]
})
export class AppComponent {
}
