import { Component, Inject, Injectable } from '@angular/core';

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

// service by component
@Component({
    selector: 'app-root',
    template: '<p>app-root service</p>',
    providers: [AppRootService]
})
export class AppRootService{
    AppRootService = Inject(AppRootService);
}