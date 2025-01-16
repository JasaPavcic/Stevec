import { NgModule } from '@angular/core';
import { RouterModule,Routes } from '@angular/router';
import { LoginComponent } from '../components/login/login.component';
import { HomeComponent } from '../components/home/home.component';
import { Page1Component } from '../components/page1/page1.component';
import { Page2Component } from '../components/page2/page2.component';
import { Page3Component } from '../components/page3/page3.component';
import { StatsComponent } from '../components/stats/stats.component';


export const routes: Routes = [
    {path: '', redirectTo: '/login', pathMatch:'full' },
    {path: 'login', component: LoginComponent},
    {path: 'home',component: HomeComponent,
        children: [
            {path: 'page1', component: Page1Component},
            {path: 'page2', component: Page2Component},
            {path: 'page3', component: Page3Component},
            {path: 'stats', component: StatsComponent}
        ]},
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
  })
  export class AppRoutingModule { }
