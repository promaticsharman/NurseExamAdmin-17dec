import { NgModule } from '@angular/core';
import { CommonModule, } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { AdminGuard } from './../adminAuth/admin.guard';
import { UserListingModule } from './user management/user-listing/user-listing.module';
import { AddExamModule } from './add-exam/add-exam.module';
import { EditExamComponent } from './edit-exam/edit-exam.component';
import { EditExamModule } from './edit-exam/edit-exam.module';
import { AddFaqModule } from './add-faq/add-faq.module';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full',
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: '',
    component: AdminLayoutComponent,
    canActivate: [AdminGuard],
    children: [
      {
        path: '',
        loadChildren: './layouts/admin-layout/admin-layout.module#AdminLayoutModule'
      },
      {
				path: 'user-list',
				loadChildren: () => UserListingModule
      },
      {
				path: 'add-exam',
				loadChildren: () => AddExamModule
      },
      // {
			// 	path: 'edit-exam/:exam_id',
			// 	loadChildren: () => EditExamModule
      // },
      // {
			// 	path: 'add-faq',
			// 	loadChildren: () => AddFaqModule
      // }
    ]
  }
];

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    RouterModule.forRoot(routes, {
      useHash: true
    })
  ],
  exports: [
  ],
})
export class AppRoutingModule { }
