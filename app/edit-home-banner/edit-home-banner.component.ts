import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from 'environments/environment.prod';
import { AdminService } from 'shared/admin.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-edit-home-banner',
  templateUrl: './edit-home-banner.component.html',
  styleUrls: ['./edit-home-banner.component.css']
})
export class EditHomeBannerComponent implements OnInit {


  bannerData: any = {
    top_heading: "",
    heading: "",
    description: "",
    image: ""
  }
  showLoader
  image
  banner_image
  img_url
  constructor(private fb: FormBuilder, private service: AdminService, private route: ActivatedRoute,private router: Router) { }

  ngOnInit(): void {
    this.img_url = environment.img_path + "HomeBanner/"

    console.log(this.route.snapshot.params.id);
    this.getBanner(this.route.snapshot.params.id);
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
    this.bannerData.image = evt.target.files[0];
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

  getBanner(id) {
    console.log(this.bannerData);
    this.showLoader = true
    this.service.getHomeBannerById(id).subscribe(data => {
      console.log(data)
      this.showLoader = false
      this.bannerData.top_heading = data.data.top_heading;
      this.bannerData.heading = data.data.heading;
      this.bannerData.description = data.data.description;
      this.bannerData.image = data.data.banner_image;
      this.banner_image = data.data.banner_image

    }), err => {
      console.log(err);
      if (err.status >= 400) {
        console.log('Invalid Credential!!!');
      } else {
        console.log('Internet Connection Error');
      }
    }
  }

  editBanner() {
    var formData = new FormData();
    formData.append("id", this.route.snapshot.params.banner_id);
    formData.append("top_heading", this.bannerData.top_heading);
    formData.append("heading", this.bannerData.heading);
    formData.append("description", this.bannerData.description);
    formData.append("image", this.bannerData.image);
    this.showLoader = true
    this.service.editBanner(formData).subscribe(data => {
      this.showLoader = false
      console.log(data, "Banner Successfully Updated!");
      Swal.fire('Success..!', 'Successfully Updated!', 'success')
      this.router.navigate(['/home-banner']);
    }, err => {
      if (err.status >= 400) {
        console.log("Inavalid Credentials!");
      } else {
        console.log("Internet Connection Error");
      }
    });
  }

}
