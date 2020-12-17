import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSelect } from "@angular/material/select";
import { ActivatedRoute, Router } from '@angular/router';
import { AdminService } from 'shared/admin.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-add-study-material',
  templateUrl: './add-study-material.component.html',
  styleUrls: ['./add-study-material.component.css']
})
export class AddStudyMaterialComponent implements OnInit {
  @ViewChild('mySelect') mySelect: MatSelect;
  
  selected:any
  
  studyMaterial = {
    content:"",
    pdfFile:""
  }

  constructor(private service: AdminService, private route: ActivatedRoute) { }

  ngOnInit(): void {
  }

  onChange(){
    //alert(this.mySelect.value)
    this.selected = this.mySelect.value;
  }

  onFileBannerChange(event) {
  
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      console.log("file : " , file);
      this.studyMaterial.pdfFile = file;
    }
  }

  addStudyMaterial(){
    console.log(this.studyMaterial)
    var formdata = new FormData();

    formdata.append('content', this.studyMaterial.content);
    formdata.append('type', this.selected);
    formdata.append('pdfFile', this.studyMaterial.pdfFile);
    formdata.append('topic_id', this.route.snapshot.params.topic_id)
    this.service.addStudyMaterial(formdata).subscribe(data => {
      console.log("Data Successfully Insert : ",data);
      Swal.fire('Success..!', 'Succesfully Created!', 'success');
      },err => {
      if (err.status >= 400) {
		    // this.toastr.error('Internal Error', 'Error')
		    console.log('Invalid Credential!!!')
		  } else {
		    // this.toastr.error('Internet Connection Error', 'Error')
		    console.log('Internet Connection Error')
		  }
    })
   
  }
  

}
