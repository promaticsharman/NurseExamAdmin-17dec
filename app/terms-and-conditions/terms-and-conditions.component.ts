import { Component, OnInit } from '@angular/core';
import { AdminService } from 'shared/admin.service';

@Component({
  selector: 'app-terms-and-conditions',
  templateUrl: './terms-and-conditions.component.html',
  styleUrls: ['./terms-and-conditions.component.css']
})
export class TermsAndConditionsComponent implements OnInit {
  dataSource

  constructor(
    private service: AdminService
  ) { }


  ngOnInit(): void {
    this.getGeneralManagement()
  }

  getGeneralManagement() {
    var obj = {
      type: 'terms_and_condition'
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
      type: 'terms_and_condition',
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
