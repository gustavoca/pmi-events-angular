'use strict';
import { Component } from '@angular/core';
import { HttpClient } from './http-client';
import { PagerService } from './_services/pagination.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [HttpClient,
              PagerService]
})
export class AppComponent {
}
