import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContactInfoComponent } from './contact-info/contact-info.component';
import { HomeComponent } from './home/home.component';
import { ResultsComponent } from './results/results.component';
import { WinnersComponent } from './winners/winners.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'results', component:  ResultsComponent },
  { path: 'winners', component: WinnersComponent },
  { path: 'contactInfo', component: ContactInfoComponent },
  { path: '**', redirectTo: 'home', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
