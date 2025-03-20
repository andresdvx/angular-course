import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { provideAnimations } from '@angular/platform-browser/animations';
import { MessageService } from 'primeng/api';
import { AppComponent } from './app/app.component';

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter([]), // Configura rutas si es necesario
    provideHttpClient(), // Para usar HttpClient
    provideAnimations(), // Para animaciones de PrimeNG
    MessageService, // Servicio de PrimeNG para Toast
  ],
}).catch((err) => console.error(err));