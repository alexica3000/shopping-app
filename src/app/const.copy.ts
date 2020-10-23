export class FirebaseVariables {
  private apiKey = '';
  private baseUrlSignUp = ``;
  private baseUrlSignIn = ``;

  getBaseUrlSignUp(): string {
    return this.baseUrlSignUp;
  }

  getBaseUrlSignIn(): string {
    return this.baseUrlSignIn;
  }
}
