import { Component, OnInit, Pipe, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { AdminService } from 'shared/admin.service';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import Swal from 'sweetalert2';

@Pipe({
	name: 'sanitizeHtml'
})

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

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
  displayedColumns : string[] = ['position', 'content', 'feature_heading', 'feature', 'Action']
  dataSource:any
  element_id
	allReplacement = 54321
	data = []
	selectedUsers = []
	selection
	filter_by
	exam_id
	exam_name
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  constructor(private _sanitizer: DomSanitizer,private service: AdminService) { }

  ngOnInit(): void {
    this.reqData = {}
		this.reqData.offset = 0
		this.reqData.limit = 10
		this.dataSource = new MatTableDataSource(this.responseData);
		this.dataSource.paginator = this.paginator;
		this.dataSource.sort = this.sort;
		this.datamodel = {}

		this.getAllCarts(this.reqData.limit, this.reqData.offset)
  }

  transform(v: string): SafeHtml {
	return this._sanitizer.bypassSecurityTrustHtml(v);
}

  ngAfterViewInit() {
		this.dataSource.paginator = this.paginator
  }
  
  getPageSizeOptions() {
		return [5,10, 20, 30];
  }
  
  paginationOptionChange(evt) {
		console.log(evt)
		this.reqData.offset = (evt.pageIndex * evt.pageSize).toString()
		this.reqData.limit = evt.pageSize
		console.log(this.reqData)
		this.service.getAllCarts(this.reqData.limit, this.reqData.offset).subscribe(data => {
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
	
	getAllCarts(limit, offset){
		this.service.getAllCarts(limit, offset).subscribe(data => {
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

	deleteCart(id){
		Swal.fire({
			title: 'Are you sure want to remove?',
			text: 'You will not be able to recover this Cart!',
			icon: 'warning',
			showCancelButton: true,
			confirmButtonText: 'Yes, delete it!',
			cancelButtonText: 'No, keep it'
		  }).then((result) => {
			if (result.value) {
			  this.service.deleteCart(id).subscribe(data => {
				  console.log(data);
				  Swal.fire(
					  'Deleted!',
					  'This Cart has been deleted.',
					  'success'
				  )
				  this.ngOnInit();
		});
			} else if (result.dismiss === Swal.DismissReason.cancel) {
			  Swal.fire(
				'Cancelled',
				'This Cart is safe :)',
				'error'
			  )
			}
		  })
	}

}
