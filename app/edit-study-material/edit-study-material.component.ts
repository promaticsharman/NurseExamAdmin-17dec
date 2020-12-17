import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSelect } from '@angular/material/select';
import { ActivatedRoute } from '@angular/router';
import { AdminService } from 'shared/admin.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-edit-study-material',
  templateUrl: './edit-study-material.component.html',
  styleUrls: ['./edit-study-material.component.css']
})
export class EditStudyMaterialComponent implements OnInit {
  @ViewChild('mySelect') mySelect: MatSelect;
  
  selected:any
  
  studyMaterial = {
    content:"",
    pdfFile:""
  }
  constructor(private service: AdminService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.service.getStudyMaterialById(this.route.snapshot.params.studyMaterial_id).subscribe(data => {
      console.log(data);
      this.studyMaterial.content = data.data.content
      this.studyMaterial.pdfFile = data.data.pdfFile
      this.selected = data.data.type
    }), err => {
      console.log(err);
      if(err.status >= 400){
        console.log('Invalid Credential!!!');
      }else{
        console.log('Internet Connection Error');
      }
    }
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

  updateStudyMaterial(){
    console.log(this.studyMaterial)
    var formdata = new FormData();

    formdata.append('id', this.route.snapshot.params.studyMaterial_id)
    formdata.append('content', this.studyMaterial.content);
    formdata.append('type', this.selected);
    formdata.append('pdfFile', this.studyMaterial.pdfFile);
    //formdata.append('topic_id', this.route.snapshot.params.topic_id)
    this.service.updateStudyMaterial(formdata).subscribe(data => {
      console.log("Data Successfully Updated : ",data);
      Swal.fire('Success..!', 'Succesfully Updated!', 'success');
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
