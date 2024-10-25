import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ClassesComponent } from './classes/classes.component';
import { StatisticsComponent } from './statistics/statistics.component';
import { ContactComponent } from './contact/contact.component';
import { AddEditComponent } from './add-edit/add-edit.component';
import { ReportCardComponent } from './report-card/report-card.component';
import { DeleteAlertComponent } from './delete-alert/delete-alert.component';
import { ClassResultComponent } from './classes/class-result/class-result.component';

export const routes: Routes = [
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: 'home', component: HomeComponent },
    { path: 'classes', component: ClassesComponent },
    { path: 'stats', component: StatisticsComponent },
    { path: 'contact', component: ContactComponent },
    { path: 'add', component: AddEditComponent },
    { path: 'edit/:id', component: AddEditComponent },
    { path: 'report-card/:id', component: ReportCardComponent },
    { path: 'delete/:id', component: DeleteAlertComponent },
    { path: 'class/:id', component: ClassResultComponent },
    { path: '**', redirectTo: 'home' }
];