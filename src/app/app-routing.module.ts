import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth/auth.guard';
import { MoviesComponent } from './components/movies/movies.component';
import { ProfileComponent } from './components/profile/profile.component';

const routes: Routes = [
  {
    path:'',
    component: MoviesComponent,
    canActivate:[AuthGuard],
  },
  {
    path:'profile',
    component: ProfileComponent,
    canActivate:[AuthGuard],
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
