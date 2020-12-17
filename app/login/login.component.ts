import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { AdminService } from '../../shared/admin.service';
import { ToastrService } from "ngx-toastr";
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {
  email
  password
  remember_me
  Form
  constructor(
    public service: AdminService,
    private fb: FormBuilder,
    private router: Router, 
    private toastr : ToastrService
  ) {
    this.Form = fb.group({
      'email': [null, Validators.compose([Validators.required, Validators.pattern('^[a-zA-Z0-9]+(\.[_a-z0-9]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,15})$'), Validators.minLength(1)])],
      'password': [null, Validators.compose([Validators.required])],
    })
  }

  ngOnInit(): void {
  }

  submit() {
    console.log(this.Form.value)
    var form = {
      email: this.Form.value.email,
      password: this.Form.value.password,
    }
    this.service.adminLogin(form).subscribe(
      (res) => {
        localStorage.setItem("data",JSON.stringify(res.data));
        localStorage.setItem('isLoggedin','true')
        localStorage.setItem("token",JSON.stringify(res.token));
        this.router.navigate(['/dashboard']);
        console.log(res);
      },err => {
        // console.log(err,"teffffddfffdsststst")
          if (err.status >= 400) {
          
            this.toastr.error(err.error.errors.msg)
          } else {
            this.toastr.error('Internet Connection Error', 'Error')
            console.log('Internet Connection Error')}
          });
    // this.service.adminlogin(form).subscribe(data => {
    //   if (data) {
    //     console.log(data)
       
    
    // localStorage.setItem('isLoggedin', 'true')
    
    //     console.log("successfully logged in!");
    //     localStorage['userDetails'] = JSON.stringify(data.data);
        // this.router.navigate(['/dashboard']);
    //   }
    // }, err => {
    //   console.log(err)
    //   if (err.status >= 400) {
    //     //this.toastr.error('Internal Error', 'Error')
    //   } else {
    //     //this.toastr.error('Internet Connection Error', 'Error')
    //     console.log('Internet Connection Error')
    //   }
    // })
  }

  }
