import { NgModule } from '@angular/core';
import { RouterModule,Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { Page1Component } from './page1/page1.component';
import { Page2Component } from './page2/page2.component';
import { Page3Component } from './page3/page3.component';


export const routes: Routes = [
    {path: '', redirectTo: '/login', pathMatch:'full' },
    {path: 'login', component: LoginComponent},
    {path: 'home',component: HomeComponent,
        children: [
            {path: 'page1', component: Page1Component},
            {path: 'page2', component: Page2Component},
            {path: 'page3', component: Page3Component}
        ]},
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
  })
  export class AppRoutingModule { }
