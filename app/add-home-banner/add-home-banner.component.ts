import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AdminService } from 'shared/admin.service';
import Swal from 'sweetalert2';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-add-home-banner',
  templateUrl: './add-home-banner.component.html',
  styleUrls: ['./add-home-banner.component.css']
})
export class AddHomeBannerComponent implements OnInit {
  constructor(private router: Router,private fb: FormBuilder, private service: AdminService) { }

  bannerData: any = {
    top_heading: "",
    heading: "",
    image: "",
    description: ""
  }
  image

  bannerForm = new FormGroup({
    topHeading : new FormControl('',[Validators.required]),
    heading : new FormControl('',[Validators.required]),
    bannerDescription : new FormControl('',[Validators.required])
  })

  ngOnInit(): void {
  }

  onFileChange(evt) {
    // if (event.target.files.length > 0) {
    //   const file = event.target.files[0];
    //   this.bannerData.image = file;
    //   console.log(file);
    // }

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
  }

  save() {
    var formData = new FormData();
    formData.append("top_heading", this.bannerData.top_haeding);
    formData.append("heading", this.bannerData.heading);
    formData.append("banner_image", this.bannerData.image);
    formData.append("description", this.bannerData.description);

    this.service.addHomeBanner(formData).subscribe(data => {
      console.log("Banner added Successfully Created!");
      Swal.fire('Success..!', 'Added Successfully Created!', 'success')
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
