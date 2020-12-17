import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, FormArray } from "@angular/forms";
import { AdminService } from "../../shared/admin.service";
import { ActivatedRoute, Router } from "@angular/router";

import Swal from 'sweetalert2';

@Component({
  selector: 'app-edit-exam',
  templateUrl: './edit-exam.component.html',
  styleUrls: ['./edit-exam.component.css']
})
export class EditExamComponent implements OnInit {

  @ViewChild('UploadFileInput') uploadFileInput: ElementRef;
  myfilename = 'Select File';
  //examGroup: FormGroup;
  uploadedFile
  description =[''];
  myfile:any;
  constructor(private fb: FormBuilder, private service: AdminService, private route: ActivatedRoute) { }

  examData: any = {
    id:"",
    examName: "",
    price: "",
    validity: "",
    description : [],
    description_1: "",
    description_2: "",
    description_3: "",
    heading: "",
    link: "",
    about: "",
    features: "",
    uploadFile:"",
    uploadBanner:""
  }

  ngOnInit(): void {
    this.getExam(this.route.snapshot.params.exam_id)
  }
  
  createItem() {
    return this.fb.group({
    description:['']
    })
  }
  // fileChangeEvent(event: any) {
  //  console.log(event.target.files);
  //     const file = event.target.files[0];
  //     this.examData.uploadedFile = file;    
  // }

  onFileChange(event) {
  
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
       this.examData.uploadFile = file;
      console.log("file : " , file);
    }
  }

  onFileBannerChange(event) {
  
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
       this.examData.uploadBanner = file;
      console.log("file : " , file);
    }
  }

  trackByFn(index: any, item: any) {
    return index;
 }

  addDesField(des){
    this.examData.description.push('');
    // this.description.push('');
  }

  submitData(){
    console.log("Select File : " , this.examData);

    var formData = new FormData();
    formData.append('id', this.route.snapshot.params.exam_id);
    formData.append('examName', this.examData.examName);
    formData.append('validity', this.examData.validity);
    formData.append('description', JSON.stringify(this.examData.description));
    formData.append('description_1', this.examData.description_1);
    formData.append("description_2", this.examData.description_2);
    formData.append("description_3", this.examData.description_3);
    formData.append("heading", this.examData.heading);
    formData.append("link", this.examData.link);
    formData.append("price", this.examData.price);
    formData.append("about", this.examData.about);
    formData.append("features", this.examData.features);
    //formData.append("image", this.myfile);
    formData.append('uploadFileInput',this.examData.uploadFile);
    formData.append('banner_image',this.examData.uploadBanner);
    console.log(formData);
    
    
    this.service.editExam(formData).subscribe(data => {
      console.log("Data Successfully Updated=====>",data);
      Swal.fire('Success..!', 'Succesfully Updated!', 'success')
    },err => {
      if (err.status >= 400) {
		    // this.toastr.error('Internal Error', 'Error')
		    console.log('Invalid Credential!!!')
		  } else {
		    // this.toastr.error('Internet Connection Error', 'Error')
		    console.log('Internet Connection Error')
		  }
    });
  }

  getExam(id){
    this.service.getExam(id).subscribe(data => {
      console.log(data)
      this.examData.examName = data.data.examName
      this.examData.price = data.data.price
      this.examData.validity = data.data.validity
      this.examData.description = data.data.description
      this.examData.description_1 = data.data.description_1
      this.examData.description_2 = data.data.description_2
      this.examData.description_3 = data.data.description_3
      this.examData.heading = data.data.heading
      this.examData.link = data.data.link
      this.examData.about = data.data.about
      this.examData.features = data.data.features
      this.examData.uploadFile = data.data.uploadFile
      this.examData.uploadFile = data.data.uploadBanner 
    }), err => {
      console.log(err);
      if(err.status >= 400){
        console.log('Invalid Credential!!!');
      }else{
        console.log('Internet Connection Error');
      }
    }
  }



}
