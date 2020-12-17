import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, FormArray, Validators } from "@angular/forms";
import { AdminService } from "../../shared/admin.service";
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-exam',
  templateUrl: './add-exam.component.html',
  styleUrls: ['./add-exam.component.css']
})
export class AddExamComponent implements OnInit {

  @ViewChild('UploadFileInput') uploadFileInput: ElementRef;
  myfilename = 'Select File';
  //examGroup: FormGroup;
  uploadedFile
  description = [''];
  myfile: any;
  fileMessage = false
  constructor(private fb: FormBuilder, private service: AdminService) { }

  examData: any = {
    examName: "",
    price: "",
    validity: "",
    description: [],
    description_1: "",
    description_2: "",
    description_3: "",
    heading: "",
    link: "",
    about: "",
    features: "",
    uploadFile: "",
    uploadBanner: ""
  }

  examForm = new FormGroup({
    examName: new FormControl('', [Validators.required]),
    price: new FormControl('', [Validators.required]),
    validity: new FormControl('', [Validators.required]),
    heading: new FormControl('', [Validators.required]),
    link: new FormControl('', [Validators.required]),
    description: new FormControl('', [Validators.minLength(1)])
  })

  ngOnInit(): void {

  }

  createItem() {
    return this.fb.group({
      description: ['']
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
      console.log("file : ", file);
    }
  }

  onFileBannerChange(event) {

    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.examData.uploadBanner = file;
      console.log("file : ", file);
    }
  }

  trackByFn(index: any, item: any) {
    return index;
  }

  addDesField(des) {
    this.examData.description.push('');
    this.description.push('');
  }

  submitData() {
    if (this.examData.uploadFile != "" || this.examData.uploadFile != null && this.examData.uploadBanner != "" || this.examData.uploadBanner != "") {
      console.log("Select File : ", this.examData);

      var formData = new FormData();

      formData.append('examName', this.examData.examName);
      formData.append('validity', this.examData.validity);
      formData.append('description', JSON.stringify(this.examData.description));
      // formData.append('description', this.examData.description);
      formData.append('description_1', this.examData.description_1);
      formData.append("description_2", this.examData.description_2);
      formData.append("description_3", this.examData.description_3);
      formData.append("heading", this.examData.heading);
      formData.append("link", this.examData.link);
      formData.append("price", this.examData.price);
      formData.append("about", this.examData.about);
      formData.append("features", this.examData.features);
      //formData.append("image", this.myfile);
      formData.append('uploadFileInput', this.examData.uploadFile);
      formData.append('banner_image', this.examData.uploadBanner);
      console.log(formData);


      this.service.addExam(formData).subscribe(data => {
        console.log("Data Successfully Insert=====>", data);
        Swal.fire('Success..!', 'Succesfully Created!', 'success');
      }, err => {
        if (err.status >= 400) {
          // this.toastr.error('Internal Error', 'Error')
          console.log('Invalid Credential!!!')
        } else {
          // this.toastr.error('Internet Connection Error', 'Error')
          console.log('Internet Connection Error')
        }
      });
    }else{
      this.fileMessage = true
    }

  }

  getExam(id) {
    // alert(id)
    this.service.getExam(id).subscribe(data => {
      console.log(data)
      // this.examData.examName = data.examName
    }), err => {
      console.log(err);
      if (err.status >= 400) {
        console.log('Invalid Credential!!!');
      } else {
        console.log('Internet Connection Error');
      }
    }
  }

}
