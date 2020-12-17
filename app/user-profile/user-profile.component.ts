import { environment } from './../../environments/environment.prod';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, FormArray, Validators } from "@angular/forms";
import { from } from 'rxjs';
import { AdminService } from "../../shared/admin.service";
import { MustMatch } from "./../user-profile/must-match";
import Swal from 'sweetalert2';

@Component({
    selector: 'app-user-profile',
    templateUrl: './user-profile.component.html',
    styleUrls: ['./user-profile.component.css']
})

export class UserProfileComponent implements OnInit {
    imageSrc: string;
    username;
    email;
    firstname;
    lastname;
    address;
    password;
    city;
    country;
    postalcode;
    file;
    id;
    image
    img_url
    constructor(
      private fb: FormBuilder, private service: AdminService
      ) { }

    ngOnInit(): void {
      this.img_url = environment.profile_img
      this.service.getAdminProfileById().subscribe(data => {
        console.log("data: ",data)
        if(data){
        this.id=data.data[0]._id;
        this.username=data.data[0].name;
        this.email=data.data[0].email;
        this.firstname=data.data[0].first_name;
        this.lastname=data.data[0].last_name;
        this.address=data.data[0].address;
        this.city=data.data[0].city;
        this.country=data.data[0].country;
        this.postalcode=data.data[0].postal_code;
        this.imageSrc=data.data[0].profile_image;
        }
      })
    
    }
            updateForm =  this.fb.group({
            userName: new FormControl('', [Validators.required]),
            email: new FormControl('', [Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]),
            firstName: new FormControl('', [Validators.required]),
            lastName: new FormControl('', [Validators.required]),
            address: new FormControl('', [Validators.required]),
            city: new FormControl('', [Validators.required]),
            country: new FormControl('', [Validators.required]),
            postalCode: new FormControl('', [Validators.required]),
            password: new FormControl('', Validators.compose([
                Validators.required,
                Validators.minLength(8),
                Validators.maxLength(30),


            ])),
            confirmPassword: new FormControl('', Validators.compose([
                Validators.required,
                Validators.minLength(8),
                Validators.maxLength(30),

            ]))
        }, {
            validator: MustMatch('password', 'confirmPassword')
        });
        
        get f() { return this.updateForm.controls; }
        //   console.log(f[lastname]);
         
        get Email() {
            return this.updateForm.get('email')
        }
       
        onFileChanged(event) {
          const file = event.target.files[0]
        }

        onFileChange(evt) {
          if (!evt.target) {
            return;
          }
          if (!evt.target.files) {
            return;
          }
          if (evt.target.files.length !== 1) {
            return;
          }
          const file = evt.target.files[0];
          if (file.type !== 'image/jpeg' && file.type !== 'image/png' && file.type !== 'image/jpg') {
            // this.toastr.warning('Please upload image file')
            return;
          }
          console.log(evt.target.files[0])
          this.imageSrc = evt.target.files[0];
          const fr = new FileReader();
          fr.onloadend = (loadEvent) => {
            let mainImage = fr.result;
            this.image = mainImage;
          };
          fr.readAsDataURL(file);
      
          // if (event.target.files.length > 0) {
          //   const file = event.target.files[0];
          //   this.bannerData.image = file;
          //   console.log(file);
          // }
      
        }
       update(){
        // if (this.updateForm.valid){
        //     alert("thank you ! your form is submitted successfully")
        //     console.log(this.updateForm.value);
        //    }else{
        //    alert("please fill all the details")
        //    }
           var formData = new FormData();
           console.log(this.username);
           console.log(this.email);
           console.log(this.firstname);
           console.log(this.lastname);
           console.log(this.address);
          //  console.log(this.password);
           console.log(this.city);
           console.log(this.country);
           console.log(this.postalcode);
           console.log(this.imageSrc);
           console.log("User ID  : ",this.id)

           formData.append('id', this.id);
           formData.append('name', this.username);
           formData.append('email', this.email);
           formData.append('first_name', this.firstname);
           formData.append('last_name', this.lastname);
           formData.append('address', this.address);
          //  formData.append('password', this.password);
           formData.append('city', this.city);
           formData.append('country', this.country);
           formData.append('postal_code', this.postalcode);
           formData.append('profile_image', this.imageSrc);

 
           this.service.updateAdminProfile(formData).subscribe(data => {
            console.log("Data Successfully Updated!",data);
            Swal.fire('Success..!', 'Successfully Updated!', 'success')
          },err => {
            if(err.status >= 400){
              console.log('Invalid Credential!!!');
            }else{
              console.log('Internet Connection Error');
            }
          })
       }}
        