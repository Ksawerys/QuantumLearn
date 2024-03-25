import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideAnimations } from '@angular/platform-browser/animations';
import {provideHttpClient, withInterceptors} from "@angular/common/http";
import {MessageService} from "primeng/api";
import { provideClientHydration } from '@angular/platform-browser';

export const appConfig: ApplicationConfig = {
  providers: [MessageService,provideRouter(routes), provideAnimations(), provideHttpClient()]
};
