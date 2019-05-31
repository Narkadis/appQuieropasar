import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { OffersComponent } from './components/offers/offers.component';
import { DetailsComponent } from './components/details/details.component';
import { ListComponent } from './components/admin/list/list.component';
import { LoginComponent } from './components/user/login/login.component';
import { RegisterComponent } from './components/user/register/register.component';
import { ProfileComponent } from './components/user/profile/profile.component';
import { Page404Component } from './components/page404/page404.component';
import { AuthGuard } from './guard/auth.guard';

const routes: Routes = [
  {path: '', component:HomeComponent},
  {path: 'offers', component: OffersComponent, canActivate: [AuthGuard] },
  {path: 'chicas/:id', component: DetailsComponent},
  {path: 'admin/list', component:ListComponent, canActivate: [AuthGuard]},
  {path: 'user/login', component:LoginComponent},
  {path: 'user/register', component:RegisterComponent},
  {path: 'user/profile', component:ProfileComponent, canActivate: [AuthGuard]},
  {path: '**', component:Page404Component},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
