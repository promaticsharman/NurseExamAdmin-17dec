import { Component, OnInit } from '@angular/core';
//import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
//import * as Editor from '@ckeditor/ckeditor5-angular';
import { AdminService } from 'shared/admin.service';

@Component({
  selector: 'app-about-us',
  templateUrl: './about-us.component.html',
  styleUrls: ['./about-us.component.css']
})
export class AboutUsComponent implements OnInit {

  dataSource

  constructor(
    private service: AdminService
  ) { }


  ngOnInit(): void {
    this.getGeneralManagement()
  }

  getGeneralManagement() {
    var obj = {
      type: 'about_us'
    }
    this.service.getGeneralManagement(obj).subscribe(data => {
      console.log(data);
      if (data.code == 200) {
        this.dataSource = data.data.content;
      }
    }, err => {
      console.log(err);
      if (err.status >= 400) {
        console.log('Invalid Credential!!!');
      } else {
        console.log('Internet Connection Error');
      }
    })
  }

  updateGeneralManagement() {
    var obj = {
      type: 'about_us',
      content: this.dataSource
    }
    this.service.updateGeneralManagement(obj).subscribe(data => {
      console.log(data);
      if (data.code == 200) {
        // this.dataSource = data.data.content;
        this.getGeneralManagement()
      }
    }, err => {
      console.log(err);
      if (err.status >= 400) {
        console.log('Invalid Credential!!!');
      } else {
        console.log('Internet Connection Error');
      }
    })
  }

}
