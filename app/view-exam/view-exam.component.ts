import { SelectionModel } from '@angular/cdk/collections';
import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { AdminService } from 'shared/admin.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-view-exam',
  templateUrl: './view-exam.component.html',
  styleUrls: ['./view-exam.component.css']
})
export class ViewExamComponent implements OnInit {
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
  displayedColumns : string[] = ['position', 'examName', 'price', 'Action']
  dataSource:any
  element_id
	allReplacement = 54321
	data = []
	selectedUsers = []
	selection
  filter_by
  
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  
constructor(public adminService: AdminService, private router: Router) {
  this.selection = new SelectionModel(true, []);
  this.dataSource = new MatTableDataSource(this.responseData);
   }

  ngOnInit(): void {
    this.reqData = {}
		this.reqData.offset = 0
		this.reqData.limit = 10
		this.dataSource = new MatTableDataSource(this.responseData);
		this.dataSource.paginator = this.paginator;
		this.dataSource.sort = this.sort;
		this.datamodel = {}
    this.getAllExamList(this.reqData.limit, this.reqData.offset)
  }

  ngAfterViewInit() {
		this.dataSource.paginator = this.paginator
	}

  getAllExamList(limit, offset){
    this.adminService.getExamList(limit, offset).subscribe(data => {
      console.log(data)
      if(data){
		this.length = data.data.count
        this.dataSource = data.data.data;
        console.log(this.dataSource);
      }
    }, err => {
        console.log(err);
        if(err.status >= 400){
          console.log('Invalid Credential!!!');
        }else{
          console.log('Internet Connection Error');
        }
    })
  }

  

  getPageSizeOptions() {
		return [5,10, 20, 30];
	}

  paginationOptionChange(evt) {
		console.log(evt)
		this.reqData.offset = (evt.pageIndex * evt.pageSize).toString()
		this.reqData.limit = evt.pageSize
		console.log(this.reqData)
		this.adminService.getExamList(this.reqData.limit, this.reqData.offset).subscribe(data => {
			console.log(data)
			if (data) {
				this.responseData = data.data.data.rows
				this.length = data.data.count
				this.dataSource = new MatTableDataSource(data.data.data);
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


  deleteExam(id){
		Swal.fire({
		  title: 'Are you sure want to remove?',
		  text: 'You will not be able to recover this Exam!',
		  icon: 'warning',
		  showCancelButton: true,
		  confirmButtonText: 'Yes, delete it!',
		  cancelButtonText: 'No, keep it'
		}).then((result) => {
		  if (result.value) {
			this.adminService.deleteExam(id).subscribe(data => {
				console.log(data);
				Swal.fire(
					'Deleted!',
					'This Exam has been deleted.',
					'success'
				)
				this.ngOnInit();
      });
		  } else if (result.dismiss === Swal.DismissReason.cancel) {
			Swal.fire(
			  'Cancelled',
			  'This Exam is safe :)',
			  'error'
			)
		  }
		})
	}
}

