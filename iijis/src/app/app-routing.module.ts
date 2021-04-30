import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './interceptors/auth.guard';
import { Role } from './models/user.model';

const routes: Routes = [
  { path: '',  loadChildren: () => import('./home/home.module').then(m => m.HomeModule)},
  { path: 'admin',  loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule) ,
    canActivate: [AuthGuard], data: { roles: [Role.admin]} },
  { path: 'login',  loadChildren: () => import('./login/login.module').then(m => m.LoginModule) },
  { path: 'submission',  loadChildren: () => import('./submission/submission.module').then(m => m.SubmissionModule),canActivate: [AuthGuard], data: { roles: [Role.user]}  },
  { path: 'submissions',  loadChildren: () => import('./submissions/submissions.module').then(m => m.SubmissionsModule),canActivate: [AuthGuard], data: { roles: [Role.user, Role.admin]}  },
  { path: 'settings',  loadChildren: () => import('./settings/settings.module').then(m => m.SettingsModule),canActivate: [AuthGuard], data: { roles: [Role.user, Role.admin]}  },
  { path: 'logout',  loadChildren: () => import('./logout/logout.module').then(m => m.LogoutModule) },
  { path: 'register',  loadChildren: () => import('./register/register.module').then(m => m.RegisterModule) },
  { path: 'aims',  loadChildren: () => import('./aims/aims.module').then(m => m.AimsModule) },
  { path: 'board',  loadChildren: () => import('./board/board.module').then(m => m.BoardModule) },
  { path: 'guidelines',  loadChildren: () => import('./guidelines/guidelines.module').then(m => m.GuidelinesModule) },
  { path: 'current',  loadChildren: () => import('./current/current.module').then(m => m.CurrentModule) },
  { path: 'archives',  loadChildren: () => import('./archives/archives.module').then(m => m.ArchivesModule) },
  { path: 'contact',  loadChildren: () => import('./contact/contact.module').then(m => m.ContactModule) },
  { path: 'releases',  loadChildren: () => import('./releases/releases.module').then(m => m.ReleasesModule) },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
