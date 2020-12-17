import { Component, OnInit } from '@angular/core';

declare const $: any;
declare interface RouteInfo {
    path: string;
    title: string;
    icon: string;
    class: string;
    subcat:{};
}
export const ROUTES: RouteInfo[] = [
    { path: '/dashboard', title: 'Dashboard',  icon: 'dashboard', class: '', subcat:[]} ,
    { path: '/testimonials', title: 'Testimonials',  icon: 'dashboard', class: '', subcat:[]} ,    
    { path: '*', title: 'Manage Exams',  icon:'assignment', class: '' , subcat:[
      { path: '/view-exam', title: 'View Exams',  icon:'wysiwyg', class: '' }
    ] 
    },
    {
      path: '*', title: 'Manage Books',  icon:'library_books', class: '' , subcat:[
        { path: '/book-category', title: 'Book Category',  icon:'category', class: '' },
        { path: '/book-list', title: 'View Books',  icon:'book', class: '' }
      ]
    },
    { path: '*', title: 'User Management',  icon:'people', class: '' , subcat:[
      { path: '/user_list', title: 'User List',  icon:'info', class: '' }
    ] 
    },
    { path: '*', title: 'Home Page Management',  icon:'home', class: '' , subcat:[
      {path: '/home-banner', title: 'Banner List',  icon:'view_carousel', class: ''},
      ]
    },
    { path: '*', title: 'General Management',  icon:'settings', class: '' , subcat:[
      {path: '/about', title: 'About Us',  icon:'info', class: ''},
      {path: '/terms-and-conditions', title: 'Terms and Conditions',  icon:'fact_check', class: ''},
      {path: '/contact-us', title: 'Contact Us',  icon:'perm_phone_msg', class: ''},
      {path: '/privacy-policy', title: 'Privacy Policy',  icon:'privacy_tip', class: ''}
      ]
    },
    {
      path: '/cart-list', title: 'Cart Page Management',  icon:'shopping_cart', class: '' , subcat:[]
    }
    // { path: '/table-list', title: 'Table List',  icon:'content_paste', class: '', subcat:[] },
    // { path: '/user-list', title: 'User List',  icon:'content_paste', class: '' , subcat:[] },
    // { path: '/user-profile', title: 'User Profile',  icon:'person', class: '' , subcat:[] },    
    // { path: '/typography', title: 'Typography',  icon:'library_books', class: '' , subcat:[] },
    // { path: '/icons', title: 'Icons',  icon:'bubble_chart', class: '' , subcat:[] },
    // { path: '/maps', title: 'Maps',  icon:'location_on', class: '' , subcat:[] },
    // { path: '/notifications', title: 'Notifications',  icon:'notifications', class: '', subcat:[] },
    
    // { path: '/upgrade', title: 'Upgrade to PRO',  icon:'unarchive', class: 'active-pro' },
];

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  menuItems: any[];
  subcat: any[];
  constructor() { }

  ngOnInit() {
    this.menuItems = ROUTES.filter(menuItem => menuItem);
    //console.log(this.menuItems);
    // this.subcat = ROUTES.filter(this.menuItems.find(subcat => subcat));
    
  }
  isMobileMenu() {
      if ($(window).width() > 991) {
          return false;
      }
      return true;
  };
}
