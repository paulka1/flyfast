import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { TravelListComponent } from './components/travel-list/travel-list.component';
import { ReservationFormComponent } from './components/reservation-form/reservation-form.component';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CardComponent } from './UI/card.component';
import { HeaderComponent } from './components/header/header-component';
import { CurrencyConvertorComponent } from './components/currency-convertor/currency-convertor.component';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { SearchFormComponent } from './components/search-form/search-form.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatMomentDateModule } from "@angular/material-moment-adapter";

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    TravelListComponent,
    ReservationFormComponent,
    CardComponent,
    HeaderComponent,
    CurrencyConvertorComponent,
    SearchFormComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    MatExpansionModule,
    MatCheckboxModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatMomentDateModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
