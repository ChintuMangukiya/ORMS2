import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { AgGridAngular, AgGridModule } from 'ag-grid-angular';
import { StudentsComponent } from './students/students.component';
import { HomeComponent } from './home/home.component';
import { AppRoutingModule } from './app-routing.module';
import { AddEditComponent } from './add-edit/add-edit.component';
import { HeaderComponent } from './header/header.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from '../shared/Loading-Spinner/material.module';
import { MatSidenavModule } from '@angular/material/sidenav';
import { ContactComponent } from './contact/contact.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import 'ag-grid-enterprise';
import { LoadingSpinnerComponent } from '../shared/Loading-Spinner/loading-spinner.component';
import { ReportCardComponent } from './report-card/report-card.component';
import { GradePipe } from './grade.pipe';
import { DeleteAlertComponent } from './delete-alert/delete-alert.component';
import { ClassResultComponent } from './classes/class-result/class-result.component';
import { ReportComponent } from './report/report.component';

@NgModule({
  declarations: [
    AppComponent,
    StudentsComponent,
    HomeComponent,
    AddEditComponent,
    HeaderComponent,
    ContactComponent,
    LoadingSpinnerComponent,
    ReportCardComponent,
    GradePipe,
    DeleteAlertComponent,
    ReportComponent,
    ClassResultComponent
  ],
  imports: [
    ReactiveFormsModule,
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    AgGridModule,
    AgGridAngular,
    BrowserAnimationsModule, // AgGridModule imported here
    MaterialModule,
    MatSidenavModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
