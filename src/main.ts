import { bootstrapApplication } from "@angular/platform-browser";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { importProvidersFrom } from '@angular/core';
import { provideRouter } from "@angular/router";
import {provideHttpClient, withJsonpSupport} from '@angular/common/http'
import { provideState, provideStore } from "@ngrx/store";
import { provideEffects } from "@ngrx/effects";
import { provideStoreDevtools } from "@ngrx/store-devtools";

import { AppComponent } from "@app/app.component";
import { AppRoutes } from "@app/app-router";
import { UsersReducer } from "@state/users/users-store";
import { UsersEffects  } from "@state/users/users-effects";
import { DataService } from "@app/_pages/users/data.service";

bootstrapApplication(AppComponent, {
    providers: [
        provideRouter(AppRoutes),
        provideStore(),
        provideState(UsersReducer),
        provideEffects(UsersEffects),
        provideHttpClient(withJsonpSupport()),
        provideStoreDevtools(),
        DataService,
        importProvidersFrom(BrowserAnimationsModule),
    ]
});