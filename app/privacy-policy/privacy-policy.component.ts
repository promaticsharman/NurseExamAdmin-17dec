import { Component, OnInit } from '@angular/core';
import { AdminService } from 'shared/admin.service';

@Component({
  selector: 'app-privacy-policy',
  templateUrl: './privacy-policy.component.html',
  styleUrls: ['./privacy-policy.component.css']
})
export class PrivacyPolicyComponent implements OnInit {
  dataSource

  constructor(
    private service: AdminService
  ) { }


  ngOnInit(): void {
    this.getGeneralManagement()
  }

  getGeneralManagement() {
    var obj = {
      type: 'privacy_policy'
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
      type: 'privacy_policy',
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
