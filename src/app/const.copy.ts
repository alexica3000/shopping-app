export class FirebaseVariables {
  private apiKey = '';
  private dataBaseUrlSignUp = ``;
  private dataBaseUrlSignIn = ``;

  get urlSignUp(): string {
    return this.dataBaseUrlSignUp;
  }

  get urlSignIn(): string {
    return this.dataBaseUrlSignIn;
  }
}

export class DataStorage {
  private dataStorageUrl = '';

  get storageUrl(): string {
    return this.dataStorageUrl;
  }
}
