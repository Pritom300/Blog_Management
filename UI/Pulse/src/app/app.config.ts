// import { ApplicationConfig, importProvidersFrom } from '@angular/core';
// import { provideRouter, withComponentInputBinding } from '@angular/router';

// import { routes } from './app.routes';
// import { HTTP_INTERCEPTORS, provideHttpClient } from '@angular/common/http';
// import { MarkdownModule } from 'ngx-markdown';
// import { authInterceptor } from './core/interceptors/auth.interceptor';

// export const appConfig: ApplicationConfig = {
//   providers: [provideRouter(routes,withComponentInputBinding()),
//     provideHttpClient(),
//      importProvidersFrom(
//       MarkdownModule.forRoot()
//     ),
//     {
//       provide: HTTP_INTERCEPTORS,
//       useClass: authInterceptor,
//       multi: true,  // Allow multiple interceptors
//     },
//   ]
// };
import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { HTTP_INTERCEPTORS, provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { MarkdownModule } from 'ngx-markdown';
import { CookieService } from 'ngx-cookie-service';

import { routes } from './app.routes';
import { AuthInterceptor } from './core/interceptors/auth.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes, withComponentInputBinding()),
    CookieService,
    
    // 1. Tell HttpClient to look for DI-based interceptors
    provideHttpClient(
      withInterceptorsFromDi()
    ),

    // 2. Provide the Class-based interceptor using the multi-token
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    },

    importProvidersFrom(MarkdownModule.forRoot()),
  ]
};