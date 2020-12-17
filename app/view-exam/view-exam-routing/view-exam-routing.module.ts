import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ViewExamComponent } from '../view-exam.component';
import { RouterModule, Routes } from '@angular/router';
import { AddExamComponent } from 'app/add-exam/add-exam.component';

const routes: Routes = [
  {
    path:'/',
    component:AddExamComponent
  }
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ViewExamRoutingModule { }
