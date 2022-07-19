import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AccessDeniedComponent } from './access-denied/access-denied.component';
import { AppMaterialModule } from './app-material/app-material.module';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ConfirmDialogComponent } from './confirm-dialog/confirm-dialog.component';
import { SiteHeaderComponent } from './layout/site-header/site-header.component';
import { SiteLayoutComponent } from './layout/site-layout/site-layout.component';
import { LoginComponent } from './login/login.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { LoaderComponent } from './shared/loader/loader.component';
import { AuthGuard } from './utils/auth.guards';
import { JwtInterceptor } from './utils/interceptor';

@NgModule({
  declarations: [
    AppComponent,
    NotFoundComponent,
    AccessDeniedComponent,
    LoginComponent,
    SiteLayoutComponent,
    SiteHeaderComponent,
    ConfirmDialogComponent,
    LoaderComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AppMaterialModule,
    MatFormFieldModule, 
    MatInputModule,
    ReactiveFormsModule
  ],
  providers: [ { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true }, AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
