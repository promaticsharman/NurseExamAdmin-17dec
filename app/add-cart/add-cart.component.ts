import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AdminService } from 'shared/admin.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-cart',
  templateUrl: './add-cart.component.html',
  styleUrls: ['./add-cart.component.css']
})
export class AddCartComponent implements OnInit {

  constructor(private service: AdminService, private router: Router) { }

  cartContent
  featureHeading
  feature = [0];
  features = [];
  ngOnInit(): void {
  }

  addFeatures(i){
    this.feature.push(i)
  }

  submitCart(){
    console.log(this.cartContent);
    console.log(this.featureHeading);
    console.log(this.features)

    var formData = new FormData();
    formData.append('content',this.cartContent);
    formData.append('feature_heading',this.featureHeading);
    formData.append('feature',JSON.stringify(this.features));
    this.service.addCart(formData).subscribe(data => {
      console.log(data);
      Swal.fire('Success..!', 'Succesfully Created!', 'success')
      this.router.navigate(['/cart-list']);
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
