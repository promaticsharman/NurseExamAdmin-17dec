import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { AdminService } from 'shared/admin.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-testimonials-list',
  templateUrl: './testimonials-list.component.html',
  styleUrls: ['./testimonials-list.component.css']
})
export class TestimonialsListComponent implements OnInit {

  checked = false;
	indeterminate = false;
	labelPosition: 'before' | 'after' = 'after';
	disabled = false;
	tableData
	backUpTableData
	showLoader
	reqData
	getData
	datamodel
	length
	timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone
	filterValue
	responseData = []
  displayedColumns : string[] = ['position', 'author_name', 'designation', 'description', 'Action']
  dataSource:any
  element_id
	allReplacement = 54321
	data = []
	selectedUsers = []
	selection
	filter_by
	
	@ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  constructor(private dialog: MatDialog, private route: ActivatedRoute, private service: AdminService) { }

  ngOnInit(): void {
    this.reqData = {}
		this.reqData.offset = 0
		this.reqData.limit = 10
		this.dataSource = new MatTableDataSource(this.responseData);
		this.dataSource.paginator = this.paginator;
		this.dataSource.sort = this.sort;
		this.datamodel = {}
    this.getAllTestimonials(this.reqData.limit, this.reqData.offset)
  }

  ngAfterViewInit() {
		this.dataSource.paginator = this.paginator
	}

  getAllTestimonials(limit, offset){
    this.service.getAllTestimonials(limit, offset).subscribe(data => {
      console.log(data);
      if(data){
        this.length = data.data.count;
        this.dataSource = data.data;
        console.log(this.dataSource);
      } 
    },err => {
      console.log(err);
      if(err.status >= 400){
        console.log('Invalid Credential!!!');
      }else{
        console.log('Internet Connection Error');
      }  
    });
  }

  getPageSizeOptions() {
		return [5,10, 20, 30];
  }
  
  paginationOptionChange(evt) {
		console.log(evt)
		this.reqData.offset = (evt.pageIndex * evt.pageSize).toString()
		this.reqData.limit = evt.pageSize
		console.log(this.reqData)
		this.service.getFaqAllList(this.reqData.limit, this.reqData.offset).subscribe(data => {
			console.log(data)
			if (data) {
				this.responseData = data.data.rows
				this.length = data.data.count
				this.dataSource = new MatTableDataSource(data.data);
				this.dataSource.sort = this.sort;
				console.log(this.dataSource)
				if (this.filterValue) {
					this.dataSource.filter = this.filterValue
				}
			}
		}, err => {
			console.log(err)
			if (err.status >= 400) {
				// this.toastr.error('Internal Error', 'Error')
			} else {
				// this.toastr.error('Internet Connection Error', 'Error')
				console.log('Internet Connection Error')
			}
		})
  }

  deleteTestimonials(id){
		Swal.fire({
		  title: 'Are you sure want to remove?',
		  text: 'You will not be able to recover this Testimonial!',
		  icon: 'warning',
		  showCancelButton: true,
		  confirmButtonText: 'Yes, delete it!',
		  cancelButtonText: 'No, keep it'
		}).then((result) => {
		  if (result.value) {
			this.service.deleteTestimonials(id).subscribe(data => {
				console.log(data);
				Swal.fire(
					'Deleted!',
					'This Testimonial has been deleted.',
					'success'
				)
				this.ngOnInit();
      });
		  } else if (result.dismiss === Swal.DismissReason.cancel) {
			Swal.fire(
			  'Cancelled',
			  'This Testimonial is safe :)',
			  'error'
			)
		  }
		})
  }
} 
