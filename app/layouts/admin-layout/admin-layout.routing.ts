import { EditUserListComponent } from './../../edit-user-list/edit-user-list.component';
// import { UserProfileComponent } from './../../user-profile/user-profile.component';
import { UserListingComponent } from './../../user management/user-listing/user-listing.component';
import { Routes } from '@angular/router';

import { DashboardComponent } from '../../dashboard/dashboard.component';
import { UserProfileComponent } from '../../user-profile/user-profile.component';
import { TableListComponent } from '../../table-list/table-list.component';
import { TypographyComponent } from '../../typography/typography.component';
import { IconsComponent } from '../../icons/icons.component';
import { MapsComponent } from '../../maps/maps.component';
import { NotificationsComponent } from '../../notifications/notifications.component';
import { UpgradeComponent } from '../../upgrade/upgrade.component';
import { LoginComponent } from '../../login/login.component';
import { AboutUsComponent } from 'app/about-us/about-us.component';
import { AddExamComponent } from "../../add-exam/add-exam.component";
import { TermsAndConditionsComponent } from 'app/terms-and-conditions/terms-and-conditions.component';
import { ContactUsComponent } from 'app/contact-us/contact-us.component';
import { PrivacyPolicyComponent } from 'app/privacy-policy/privacy-policy.component';
import { ViewExamComponent } from 'app/view-exam/view-exam.component';
import { EditExamComponent } from 'app/edit-exam/edit-exam.component';
import { FaqListComponent } from 'app/faq-list/faq-list.component';
import { AddFaqComponent } from 'app/add-faq/add-faq.component';
import { TestimonialsComponent } from 'app/testimonials/testimonials.component';
import { TestimonialsListComponent } from 'app/testimonials-list/testimonials-list.component';
import { TestimonialsEditComponent } from 'app/testimonials-edit/testimonials-edit.component';
import { AddExamQuestionsComponent } from 'app/add-exam-questions/add-exam-questions.component';
import { BookCategoryComponent } from 'app/book-category/book-category.component';
import { QuestionListComponent } from 'app/question-list/question-list.component';
import { BookListComponent } from 'app/book-list/book-list.component';
import { EditExamQuestionsComponent } from 'app/edit-exam-questions/edit-exam-questions.component';
import { ChapterListComponent } from 'app/chapter-list/chapter-list.component';
import { TopicListComponent } from 'app/topic-list/topic-list.component';
import { StudyMaterialListComponent } from 'app/study-material-list/study-material-list.component';
import { AddStudyMaterialComponent } from 'app/add-study-material/add-study-material.component';
import { EditStudyMaterialComponent } from 'app/edit-study-material/edit-study-material.component';
import { HomeBannerListComponent } from 'app/home-banner-list/home-banner-list.component';
import { AddHomeBannerComponent } from 'app/add-home-banner/add-home-banner.component';
import { EditHomeBannerComponent } from 'app/edit-home-banner/edit-home-banner.component';
import { CartComponent } from 'app/cart/cart.component';
import { AddCartComponent } from 'app/add-cart/add-cart.component';
import { EditCartComponent } from 'app/edit-cart/edit-cart.component';

export const AdminLayoutRoutes: Routes = [
    // {
    //   path: '',
    //   children: [ {
    //     path: 'dashboard',
    //     component: DashboardComponent
    // }]}, {
    // path: '',
    // children: [ {
    //   path: 'userprofile',
    //   component: UserProfileComponent
    // }]
    // }, {
    //   path: '',
    //   children: [ {
    //     path: 'icons',
    //     component: IconsComponent
    //     }]
    // }, {
    //     path: '',
    //     children: [ {
    //         path: 'notifications',
    //         component: NotificationsComponent
    //     }]
    // }, {
    //     path: '',
    //     children: [ {
    //         path: 'maps',
    //         component: MapsComponent
    //     }]
    // }, {
    //     path: '',
    //     children: [ {
    //         path: 'typography',
    //         component: TypographyComponent
    //     }]
    // }, {
    //     path: '',
    //     children: [ {
    //         path: 'upgrade',
    //         component: UpgradeComponent
    //     }]
    // }
    { path: 'dashboard',      component: DashboardComponent },
    { path: 'user-profile',   component: UserProfileComponent },
    { path: 'table-list',     component: TableListComponent },
    { path: 'typography',     component: TypographyComponent },
    { path: 'icons',          component: IconsComponent },
    { path: 'maps',           component: MapsComponent },
    { path: 'notifications',  component: NotificationsComponent },
    { path: 'upgrade',        component: UpgradeComponent },
    { path: 'upgrade',        component: UpgradeComponent },
    { path: 'about',          component: AboutUsComponent },
    { path: 'terms-and-conditions',          component: TermsAndConditionsComponent },
    { path: 'contact-us',          component: ContactUsComponent },
    { path: 'privacy-policy',          component: PrivacyPolicyComponent },
    { path: 'add-exam',       component: AddExamComponent},
    { path : 'view-exam', component: ViewExamComponent},
    { path : 'edit-exam/:exam_id', component: EditExamComponent},
    { path : 'faq-list/:exam_id/:exam_name', component: FaqListComponent},
    { path : 'testimonials', component: TestimonialsListComponent},
    { path : 'createTestimonials', component: TestimonialsComponent},
    { path : 'editTestimonials/:testimonial_id', component: TestimonialsEditComponent},
    { path : 'add-exam-questions/:topic_id/:topic_name', component: AddExamQuestionsComponent},
    { path : 'book-category', component: BookCategoryComponent},
    { path : 'book-list', component: BookListComponent},
    { path : 'questions-list/:topic_id/:topic_name', component : QuestionListComponent},
    { path : 'exam_Questions/:topic_id/:que_id', component : EditExamQuestionsComponent},
    { path : 'chapter_list/:exam_id/:exam_name', component : ChapterListComponent},
    { path : 'topic_list/:chapter_id/:exam_id/:exam_name/:chapter_name', component : TopicListComponent},
    { path : 'study_material_list/:topic_id/:topic_name', component : StudyMaterialListComponent},
    { path : 'add-study-material/:topic_id', component : AddStudyMaterialComponent},
    { path : 'edit-study-material/:studyMaterial_id', component : EditStudyMaterialComponent},
    { path : 'home-banner', component : HomeBannerListComponent},
    { path : 'add-home-banner', component : AddHomeBannerComponent},
    { path : 'edit-home-banner/:id', component : EditHomeBannerComponent},
    { path : 'cart-list', component : CartComponent},
    { path : 'add-cart', component : AddCartComponent},
    { path : 'edit-cart/:cart_id', component: EditCartComponent},
    { path:  'user_list',component:UserListingComponent},
    // { path : 'add-faq', component: AddFaqComponent}
     { path: 'login',component: LoginComponent },
     { path: 'edit_user_list/:id',component:EditUserListComponent },
];
