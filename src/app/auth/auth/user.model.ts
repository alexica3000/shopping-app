export class User {
  constructor(public email: string, public id: string, private ntoken: string, private ntokenExpirationDate: Date) {

  }

  get token(): string {
    if (!this.ntokenExpirationDate || new Date() > this.ntokenExpirationDate) {
      return null;
    }

    return this.ntoken;
  }
}
