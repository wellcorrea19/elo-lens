import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'home',
    loadChildren: () => import('./pages/home/home.module').then( m => m.HomePageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./pages/auth/login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'send-docs',
    loadChildren: () => import('./pages/send-docs/send-docs.module').then( m => m.SendDocsPageModule)
  },
  {
    path: 'info-docs',
    loadChildren: () => import('./pages/info-docs/info-docs.module').then( m => m.InfoDocsPageModule)
  },
  {
    path: 'send-comprov',
    loadChildren: () => import('./pages/send-comprov/send-comprov.module').then( m => m.SendComprovPageModule)
  },
  {
    path: 'info-comprov',
    loadChildren: () => import('./pages/info-comprov/info-comprov.module').then( m => m.InfoComprovPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
