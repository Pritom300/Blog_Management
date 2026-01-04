import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter, withComponentInputBinding } from '@angular/router';

import { routes } from './app.routes';
import { provideHttpClient } from '@angular/common/http';
import { MarkdownModule } from 'ngx-markdown';

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes,withComponentInputBinding()),
    provideHttpClient(),
     importProvidersFrom(
      MarkdownModule.forRoot()
    ),
  ]
};
