import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {catchError} from 'rxjs/operators';
import {FirebaseVariables} from '../../const';

export interface AuthResponseData {
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
  registered?: boolean;
}

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  private errorMessage = 'An unknown error occured!';

  constructor(private http: HttpClient, private firebase: FirebaseVariables) {}

  signup(email: string, password: string): Observable<AuthResponseData> {
    return this.http.post<AuthResponseData>(this.firebase.getBaseUrlSignUp(), {email, password, returnSecureToken: true})
      .pipe(catchError(errorResponse => {

        if (!errorResponse.error || !errorResponse.error.error) {
          return throwError(this.errorMessage);
        }

        switch (errorResponse.error.error.message) {
          case 'EMAIL_EXISTS':
            this.errorMessage = 'This email exists already.';
        }
        return throwError(this.errorMessage);
      }));
  }

  login(email: string, password: string): Observable<AuthResponseData> {
    return this.http.post<AuthResponseData>(this.firebase.getBaseUrlSignIn(), {email, password, returnSecureToken: true});
  }
}
