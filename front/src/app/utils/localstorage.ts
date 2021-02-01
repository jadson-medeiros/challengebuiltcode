export class LocalStorageUtils {

  public getUser() {
      return JSON.parse(localStorage.getItem('challengeBuilt.user'));
  }

  public saveLocalStorageUser(response: any) {
      this.saveTokenUser(response.accessToken);
      this.saveUser(response.userToken);
  }

  public cleanLocalStorageUser() {
      localStorage.removeItem('challengeBuilt.token');
      localStorage.removeItem('challengeBuilt.user');
  }

  public getTokenUser(): string {
      return localStorage.getItem('challengeBuilt.token');
  }

  public saveTokenUser(token: string) {
      localStorage.setItem('challengeBuilt.token', token);
  }

  public saveUser(user: string) {
      localStorage.setItem('challengeBuilt.user', JSON.stringify(user));
  }
}
