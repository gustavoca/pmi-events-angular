import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { NgForm, FormGroup, FormControl, FormArray, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from 'app/login/auth.service';
import { AlertService } from '../_services/alert.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [AuthService]
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;

  constructor(private fb: FormBuilder,
    private auth: AuthService,
    private router: Router,
    private alertService: AlertService) { }

  ngOnInit() {
    this.loginForm = this.fb.group({
      'email': new FormControl(null, [Validators.email, Validators.required]),
      'password': new FormControl(null, [Validators.required]),
    });

  }

  onSubmit() {
    const credentials = this.loginForm.value;
    this.auth.login({ credentials }).subscribe(response => {
      this.auth.persist('ACCESS_TOKEN', response.id);
      this.router.navigate(['/events']);
    },
    err => this.alertService.error("email/password Inválido"));
  }

}
