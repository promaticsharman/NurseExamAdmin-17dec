import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DialogOverviewExampleDialog, FaqListComponent } from './faq-list.component';
import { MatDialogModule } from '@angular/material/dialog';



@NgModule({
  declarations: [FaqListComponent,DialogOverviewExampleDialog],
  imports: [
    CommonModule,
    MatDialogModule
  ]
})
export class FaqListModule { }
