import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {catchError} from 'rxjs/operators';

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
  private apiKey = 'AIzaSyDGjXTyvY7034B4wLCPZCWoNXt2BchTk_w';
  private baseUrlSignUp = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${this.apiKey}`;
  private baseUrlSignIn = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${this.apiKey}`;

  constructor(private http: HttpClient) {}

  signup(email: string, password: string): Observable<AuthResponseData> {
    return this.http.post<AuthResponseData>(this.baseUrlSignUp, {email, password, returnSecureToken: true})
      .pipe(catchError(errorResponse => {
        let errorMessage = 'An unknown error occured!';

        if (!errorResponse.error || !errorResponse.error.error) {
          return throwError(errorMessage);
        }

        switch (errorResponse.error.error.message) {
          case 'EMAIL_EXISTS':
            errorMessage = 'This email exists already.';
        }
        return throwError(errorMessage);
      }));
  }

  login(email: string, password: string): Observable<AuthResponseData> {
    return this.http.post<AuthResponseData>(this.baseUrlSignIn, {email, password, returnSecureToken: true});
  }
}
