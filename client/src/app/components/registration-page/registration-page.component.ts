import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Observable, throwError } from 'rxjs';
import { User } from 'src/app/models/User';
import { catchError } from 'rxjs/operators';

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

  private handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      console.error(
        `Backend returned code ${error.status}, body was: `, error.error);
    }
    // Return an observable with a user-facing error message.
    return throwError(() => new Error('Something bad happened; please try again later.'));
  }

  addUser(): void {
    this.http.post<User>('http://localhost:1234/adduser', {
      userName: this.registrationForm.value.username,
      userPassword: this.registrationForm.value.password,
      userEmailAddress: this.registrationForm.value.email
    })
    .pipe(
      catchError(this.handleError)
    )
    .subscribe((response) => {
      if(response) console.log('added', response);
      if(!response) console.log('error', response)
    })
  }
}
