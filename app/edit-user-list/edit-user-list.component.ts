import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, FormArray, Validators } from "@angular/forms";
import { AdminService } from "../../shared/admin.service";
import { ActivatedRoute, Router } from "@angular/router";
import Swal from 'sweetalert2';
// import { Router } from '@angular/router';
@Component({
  selector: 'app-edit-user-list',
  templateUrl: './edit-user-list.component.html',
  styleUrls: ['./edit-user-list.component.css']
})
export class EditUserListComponent implements OnInit {
 Name;
 email;
 phone;
 zipcode;
 status;
 id;
  constructor( private fb: FormBuilder, private service: AdminService,
    private router: Router,
    private route: ActivatedRoute) { }
  editUserForm =  this.fb.group({
    name: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]),
    phone: new FormControl('', [Validators.required]),
    zipCode: new FormControl('', [Validators.required]),
    selectedValue: new FormControl('default'),
  })
  get Email() {
    return this.editUserForm.get('email')
}
onChange (event) {
  console.log(event.target.value)
  // if(event.target.value === 'percentage') {
  //   this.Percentage()
  // } else if(event.target.value === 'average') {
  //   this.Average()
  // }
}
  update(){
  console.log(this.editUserForm.value,"updateForm valuessssdsd")
  var formData = new FormData();
  // console.log(this.Name);
  // console.log(this.email);
  // console.log(this.zipcode);
  // console.log(this.status);
  // console.log(this.phone,"dsbfkiadsgufdsifgaifadsiiaf");
  formData.append('id', this.id);
  formData.append('first_name', this.Name);
  formData.append('email', this.email);
  formData.append('mobile_number',this.phone);
  formData.append('zipcode', this.zipcode);
  formData.append('status', this.status);
  this.service.updateUserList(formData).subscribe(data => {
    console.log("Data Successfully Updated!",data);
    Swal.fire('Success..!', 'Successfully Updated!', 'success')
    this.router.navigate(['/user_list']);
  },err => {
    if(err.status >= 400){
      console.log('Invalid Credential!!!');
    }else{
      console.log('Internet Connection Error');
    }
  })
  
  }
  ngOnInit(): void {
    this.getUser(this.route.snapshot.params.id)
  }
  getUser(id){
    var obj={
      id: id
    };
    this.service.getUserById(obj).subscribe(res => {
      // console.log(res,"get userrr dataaaaa")
     if(res){
      //  console.log(res.data.zipcode,"zipcode data");
      //  console.log(res.data.status,"status data");
      //  console.log(res.data.first_name + res.data.last_name,"Full name data");
      //  console.log(res.data.email,"status data");
      //  console.log(res.data.mobile_number,"Mobile Number data");
      this.id=res.data._id;
      this.Name=res.data.first_name;
      this.email=res.data.email;
      this.phone=res.data.mobile_number;
      this.zipcode=res.data.zipcode;
      this.status=res.data.status;
     
     }
    }), err => {
      console.log(err);
      if(err.status >= 400){
        console.log('Invalid Credential!!!');
      }else{
        console.log('Internet Connection Error');
        console.log('sss');
      }
    }
  }}
