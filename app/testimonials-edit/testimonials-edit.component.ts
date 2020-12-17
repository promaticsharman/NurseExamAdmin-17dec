import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { AdminService } from 'shared/admin.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-testimonials-edit',
  templateUrl: './testimonials-edit.component.html',
  styleUrls: ['./testimonials-edit.component.css']
})
export class TestimonialsEditComponent implements OnInit {

  constructor(private fb: FormBuilder, private service: AdminService, private route: ActivatedRoute) { }

  testimonialsData: any = {
    authorName:"",
    designation:"",
    image:"",
    description:""
  }

  ngOnInit(): void {
    this.getTestimonial(this.route.snapshot.params.testimonial_id);
  }

  onFileChange(event){
    if(event.target.files.length > 0){
      const file = event.target.files[0];
      this.testimonialsData.image = file;
      console.log(file);
    } 
  }

  getTestimonial(id){
    console.log(this.testimonialsData);
    
    this.service.getTestimonialById(id).subscribe(data => {
      console.log(data)
      this.testimonialsData.authorName = data.data.author_name;
      this.testimonialsData.designation = data.data.designation;
      this.testimonialsData.image = data.data.image;
      this.testimonialsData.description = data.data.description;
    }), err => {
      console.log(err);
      if(err.status >= 400){
        console.log('Invalid Credential!!!');
      }else{
        console.log('Internet Connection Error');
      }
    }
  }

  updateTestimonials(){
    console.log(this.route.snapshot.params.testimonial_id);
    console.log(this.testimonialsData.authorName);
    console.log(this.testimonialsData.designation);
    console.log(this.testimonialsData.image);
    console.log(this.testimonialsData.description);
    
    
     var formData = new FormData();
     formData.append('id', this.route.snapshot.params.testimonial_id);
     formData.append("author_name",this.testimonialsData.authorName);
     formData.append("designation", this.testimonialsData.designation);
     formData.append("description", this.testimonialsData.description);
     
     this.service.updateTestimonials(formData).subscribe(data => {
       console.log(data,"Testimonials Successfully Updated!");
       Swal.fire('Success..!', 'Successfully Updated!', 'success')
     },err => {
       if(err.status >= 400){
         console.log("Inavalid Credentials!");
       }else{
         console.log("Internet Connection Error");
         
       }
     });
  }

}
