import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';


import { AppRoutingModule } from './app.routing';
import { ComponentsModule } from './components/components.module';

import { AppComponent } from './app.component';

import { DashboardComponent } from './dashboard/dashboard.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { TableListComponent } from './table-list/table-list.component';
import { TypographyComponent } from './typography/typography.component';
import { IconsComponent } from './icons/icons.component';
import { MapsComponent } from './maps/maps.component';
import { NotificationsComponent } from './notifications/notifications.component';
import { UpgradeComponent } from './upgrade/upgrade.component';

import {
  AgmCoreModule
} from '@agm/core';
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { LoginComponent } from './login/login.component';
import { AboutUsComponent } from './about-us/about-us.component';
import { AddExamComponent } from './add-exam/add-exam.component';
import { AddExamModule } from './add-exam/add-exam.module';
// import { UserListingComponent } from './user management/user-listing/user-listing.component';

import {MatButtonModule} from '@angular/material/button';
import { EditorModule } from '@tinymce/tinymce-angular';
import { TermsAndConditionsModule } from "./terms-and-conditions/terms-and-conditions.module";
import { TermsAndConditionsComponent } from './terms-and-conditions/terms-and-conditions.component';
import { ContactUsComponent } from './contact-us/contact-us.component';
import { ContactUsModule } from './contact-us/contact-us.module';
import { PrivacyPolicyComponent } from './privacy-policy/privacy-policy.component';
import { PrivacyPolicyModule } from './privacy-policy/privacy-policy.module';
import { ViewExamComponent } from './view-exam/view-exam.component';
import { ViewExamModule } from './view-exam/view-exam.module';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { EditExamComponent } from './edit-exam/edit-exam.component';
import { EditExamModule } from './edit-exam/edit-exam.module';
import { DialogOverviewExampleDialog, EditFaqDialog, FaqListComponent } from './faq-list/faq-list.component';
import { AddFaqComponent } from './add-faq/add-faq.component';
import { MatDialogModule } from '@angular/material/dialog';
import { TestimonialsComponent } from './testimonials/testimonials.component';
import { TestimonialsListComponent } from './testimonials-list/testimonials-list.component';
import { TestimonialsEditComponent } from './testimonials-edit/testimonials-edit.component';
import { AddExamQuestionsComponent } from './add-exam-questions/add-exam-questions.component';
import { MatRadioModule } from "@angular/material/radio";
import { AddCategoryDialog, BookCategoryComponent, EditCategoryDialog } from './book-category/book-category.component';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { QuestionListComponent } from './question-list/question-list.component';
import { AddBookDialog, BookListComponent, EditBookDialog } from './book-list/book-list.component';
import { MatListModule } from "@angular/material/list";
import { MatCheckboxModule } from '@angular/material/checkbox';
import { EditExamQuestionsComponent } from './edit-exam-questions/edit-exam-questions.component';
import { AddChapter, ChapterListComponent, EditChapter } from './chapter-list/chapter-list.component';
import { AddTopic, EditTopic, TopicListComponent } from './topic-list/topic-list.component';
import { StudyMaterialListComponent } from './study-material-list/study-material-list.component';
import { AddStudyMaterialComponent } from './add-study-material/add-study-material.component';
import { EditStudyMaterialComponent } from './edit-study-material/edit-study-material.component';
import { HomeBannerListComponent } from './home-banner-list/home-banner-list.component';
import { AddHomeBannerComponent } from './add-home-banner/add-home-banner.component';
import { EditHomeBannerComponent } from './edit-home-banner/edit-home-banner.component';
import { CartComponent } from './cart/cart.component';
import { AddCartComponent } from './add-cart/add-cart.component';
import { EditCartComponent } from './edit-cart/edit-cart.component';
import { ToastrModule } from 'ngx-toastr';
import { EditUserListComponent } from './edit-user-list/edit-user-list.component';  
@NgModule({
  imports: [
    BrowserAnimationsModule,
    BrowserModule,
    FormsModule,
    CommonModule,
    ReactiveFormsModule,
    MatInputModule,
    MatFormFieldModule,
    HttpModule,
    HttpClientModule,
    ComponentsModule,
    RouterModule,
    AppRoutingModule,
    AddExamModule,
    EditExamModule,
    MatButtonModule,
    EditorModule,
    TermsAndConditionsModule,
    ContactUsModule,
    PrivacyPolicyModule,
    MatTableModule,
    MatPaginatorModule,
    MatMenuModule,
    MatIconModule,
    MatDialogModule,
    MatRadioModule,
    MatSelectModule,
    MatListModule,
    MatCheckboxModule,
    ToastrModule.forRoot() 
    // AgmCoreModule.forRoot({
    //   apiKey: 'YOUR_GOOGLE_MAPS_API_KEY'
    // })
  ],
  declarations: [
    AppComponent,
    AdminLayoutComponent,
    LoginComponent,
    AboutUsComponent,
    AddExamComponent,
    TermsAndConditionsComponent,
    ContactUsComponent,
    PrivacyPolicyComponent,
    ViewExamComponent,
    EditExamComponent,
    FaqListComponent,
    AddFaqComponent,
    DialogOverviewExampleDialog,
    EditFaqDialog,
    TestimonialsComponent,
    TestimonialsListComponent,
    TestimonialsEditComponent,
    AddExamQuestionsComponent,
    BookCategoryComponent,
    AddCategoryDialog,
    EditCategoryDialog,
    QuestionListComponent,
    BookListComponent,
    AddBookDialog,
    EditBookDialog,
    EditExamQuestionsComponent,
    ChapterListComponent,
    AddChapter,
    EditChapter,
    TopicListComponent,
    AddTopic,
    EditTopic,
    StudyMaterialListComponent,
    AddStudyMaterialComponent,
    EditStudyMaterialComponent,
    HomeBannerListComponent,
    AddHomeBannerComponent,
    EditHomeBannerComponent,
    CartComponent,
    AddCartComponent,
    EditCartComponent,
    EditUserListComponent
    // UserListingComponent

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
