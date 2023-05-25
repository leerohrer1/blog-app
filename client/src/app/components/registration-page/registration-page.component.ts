import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { User } from 'src/app/models/User';

@Component({
  selector: 'app-registration-page',
  templateUrl: './registration-page.component.html',
  styleUrls: ['./registration-page.component.css'],
})
export class RegistrationPageComponent implements OnInit {
  registrationForm!: FormGroup;

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly http: HttpClient
  ) {}

  ngOnInit(): void {
    this.initializeForm();
  }

  initializeForm(): void {
    this.registrationForm = this.formBuilder.group({
      username: '',
      password: '',
      email: '',
    });
  }

  addUser(user: User): void {
    this.http.post<User>('http://localhost:1234/adduser', {
      userName: user.userName,
      userPassword: user.userPassword,
      userEmailAddress: user.userEmail
    })
    .subscribe((response) => {
      if(response) console.log('added', response);
      if(!response) console.log('error', response)
    })
  }
}
