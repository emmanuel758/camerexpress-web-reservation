import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { NgxScrollTopModule } from 'ngx-scrolltop';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field'
import { FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatBadgeModule } from '@angular/material/badge';
import { MatDialogModule } from '@angular/material/dialog';
import { MatCardModule } from '@angular/material/card';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { NotifierModule } from 'angular-notifier';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatMenuModule } from '@angular/material/menu';
import { MatSelectModule } from '@angular/material/select';
import { RouterModule } from '@angular/router';
import { HomeComponent } from './Components/pages/home/home.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { AddItineraireComponent } from './Components/dialogs/add-itineraire/add-itineraire.component';
import { DeleteComponent } from './Components/dialogs/delete/delete.component';
import { ErrorStateMatcher } from '@angular/material/core';
import { MyErrorStateMatcher } from './Components/Utils/MyErroStateMatcher';
import { FullLoaderComponent } from './Components/components/full-loader/full-loader.component';
import { DatePipe } from '@angular/common';
import { NavbarComponent } from './Components/components/navbar/navbar.component';
import { FooterComponent } from './Components/components/footer/footer.component';
import { BadgeComponent } from './Components/components/badge/badge.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AddItineraireComponent,
    DeleteComponent,
    FullLoaderComponent,
    NavbarComponent,
    FooterComponent,
    BadgeComponent,
  ],
  imports: [
    BrowserAnimationsModule,
    AppRoutingModule,
    RouterModule,
    NgxScrollTopModule,
    HttpClientModule,
    FormsModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatDialogModule,
    MatSnackBarModule,
    MatMenuModule,
    MatSelectModule,
    MatBadgeModule,
    MatProgressSpinnerModule,
    MatProgressBarModule,
    MatTableModule,
    MatPaginatorModule,
    ReactiveFormsModule,
    MatNativeDateModule,
    MatDatepickerModule,
    NotifierModule.withConfig({
      position: {
        horizontal: {
          position: 'right'
        }
      }, animations: {
        show: {
          speed: 300
        }
      }
    }),
  ],
  providers: [
    { provide: ErrorStateMatcher, useClass: MyErrorStateMatcher },
    { provide: DatePipe }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
