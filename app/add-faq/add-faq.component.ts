import { Component, OnInit } from '@angular/core';
import { AdminService } from 'shared/admin.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-faq',
  templateUrl: './add-faq.component.html',
  styleUrls: ['./add-faq.component.css']
})
export class AddFaqComponent implements OnInit {

  createFaq: any = {
    question : "",
    answer : ""
  }

  constructor(private service: AdminService) { }

  ngOnInit(): void {
  }

  addFaq(){
    var formData = new FormData();

    formData.append('question', this.createFaq.question);
    formData.append('answer', this.createFaq.answer);

    this.service.createFaq(formData).subscribe(data => {
      console.log("Data Successfully Inserted!",data);
      Swal.fire('Success..!', 'Successfully Created!', 'success')
    },err => {
      if(err.status >= 400){
        console.log('Invalid Credential!!!');
      }else{
        console.log('Internet Connection Error');
      }
    })
  }

}
