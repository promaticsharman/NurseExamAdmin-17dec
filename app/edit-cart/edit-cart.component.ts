import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AdminService } from 'shared/admin.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-edit-cart',
  templateUrl: './edit-cart.component.html',
  styleUrls: ['./edit-cart.component.css']
})
export class EditCartComponent implements OnInit {

  cartContent
  featureHeading
  feature = [0];
  features = [];
  cartID
  constructor(private service: AdminService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.cartID = this.route.snapshot.params.cart_id;
    this.service.getCartById(this.cartID).subscribe(data => {
      console.log("Get Cart By ID : ",data);
      this.cartContent = data.data.content
      this.featureHeading = data.data.feature_heading
      this.feature = data.data.feature
      this.features = this.feature
    })
  }

  trackByFn(){
    return
  }

  addFeatures(i){
    this.feature.push(i)
  }

  submitCart(){
    console.log(this.cartContent);
    console.log(this.featureHeading);
    console.log(this.features)

    var formData = new FormData();
    formData.append('id', this.cartID)
    formData.append('content',this.cartContent);
    formData.append('feature_heading',this.featureHeading);
    formData.append('feature',JSON.stringify(this.features));
    this.service.updateCart(formData).subscribe(data => {
      console.log(data);
      Swal.fire('Success..!', 'Succesfully Updated!', 'success')
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
