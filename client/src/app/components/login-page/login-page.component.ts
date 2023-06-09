import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { User } from 'src/app/models/User';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit {
  loginForm!: FormGroup;

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly http: HttpClient
  ) {}

  ngOnInit(): void {
    this.initializeForm();
  }

  initializeForm(): void {
    this.loginForm = this.formBuilder.group({
      username: '',
      password: '',
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

  login(): void {
    this.http.post<User>('http://localhost:1234/login', {
      userName: this.loginForm.value.username,
      userPassword: this.loginForm.value.password,
    })
    .pipe(
      catchError(this.handleError)
    )
    .subscribe((response) => {
      if(response) console.log('login success', response);
      if(!response) console.log('login error', response)
    })
  }
}
