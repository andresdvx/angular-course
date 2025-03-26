import { Injectable } from '@angular/core';

// providedIn = 'root' => Angular creates a single, shared instance of the service and injects into any class that asks for it
// Angular will inject the same instance of the service into every class that requires it

// providedIn = 'any' => Angular creates a new instance of the service for each class that requires it

// providedIn = 'platform' => Angular creates a single, shared instance of the service for each platform (web worker, server, etc.)

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private isAuthenticated: boolean = false;

  changeAuthentication() {
    this.isAuthenticated = !this.isAuthenticated;
  }

  login() {
    console.info('login');
  }
}
