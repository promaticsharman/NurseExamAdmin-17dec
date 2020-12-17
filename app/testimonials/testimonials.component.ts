import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AdminService } from 'shared/admin.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-testimonials',
  templateUrl: './testimonials.component.html',
  styleUrls: ['./testimonials.component.css']
})
export class TestimonialsComponent implements OnInit {

  constructor(private fb: FormBuilder, private service: AdminService) { }

  testimonialsData: any = {
    authorName:"",
    designation:"",
    image:"",
    description:""
  }

  testimonialForm = new FormGroup({
    authorName : new FormControl('', [Validators.required]),
    designation : new FormControl('', [Validators.required]),
    description : new FormControl('', [Validators.required])
  })

  ngOnInit(): void {
  }

  onFileChange(event){
    if(event.target.files.length > 0){
      const file = event.target.files[0];
      this.testimonialsData.image = file;
      console.log(file);
    } 
  }

  saveTestimonials(){
     var formData = new FormData();
     formData.append("author_name",this.testimonialsData.authorName);
     formData.append("designation", this.testimonialsData.designation);
     formData.append("image", this.testimonialsData.image);
     formData.append("description", this.testimonialsData.description);

     this.service.createTestimonials(formData).subscribe(data => {
       console.log("Testimonials Successfully Created!");
       Swal.fire('Success..!', 'Successfully Created!', 'success')
     },err => {
       if(err.status >= 400){
         console.log("Inavalid Credentials!");
       }else{
         console.log("Internet Connection Error");
         
       }
     });
  }
}
