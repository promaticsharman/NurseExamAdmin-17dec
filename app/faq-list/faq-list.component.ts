import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog'
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { AdminService } from 'shared/admin.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-faq-list',
  templateUrl: './faq-list.component.html',
  styleUrls: ['./faq-list.component.css']
})
export class FaqListComponent implements OnInit {

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
  	displayedColumns : string[] = ['position', 'question', 'answer', 'Action']
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
	
	createFaq: any = {
	   question : "",
	   answer : ""
	}  
	  

	constructor(private dialog: MatDialog, private route: ActivatedRoute, private service: AdminService) { }
  
  	ngOnInit(): void {
		this.exam_id =this.route.snapshot.params.exam_id
		this.exam_name =this.route.snapshot.params.exam_name
		this.reqData = {}
		this.reqData.offset = 0
		this.reqData.limit = 10
		this.dataSource = new MatTableDataSource(this.responseData);
		this.dataSource.paginator = this.paginator;
		this.dataSource.sort = this.sort;
		this.datamodel = {}
    	this.faqAllList(this.reqData.limit, this.reqData.offset)
  	}

  	openDialog(){
		const dialogRef = this.dialog.open(DialogOverviewExampleDialog,{
			height: '400px',
			width: '600px',
			id: this.route.snapshot.params.exam_id,
		});
		dialogRef.afterClosed().subscribe(result => {
			console.log('The dialog was closed');
			this.reqData = {}
		    this.reqData.offset = 0
		    this.reqData.limit = 10
		    this.dataSource = new MatTableDataSource(this.responseData);
		    this.dataSource.paginator = this.paginator;
		    this.dataSource.sort = this.sort;
		    this.datamodel = {}
    	    this.faqAllList(this.reqData.limit, this.reqData.offset)
			
		});
	}

    openEditDialog(id){
		const dialogRefEdit = this.dialog.open(EditFaqDialog,{
			height: '400px',
			width: '600px',
			id: id
		});
		dialogRefEdit.afterClosed().subscribe(result => {
			console.log('The dialog was closed');	
			this.reqData = {}
		    this.reqData.offset = 0
		    this.reqData.limit = 10
		    this.dataSource = new MatTableDataSource(this.responseData);
		    this.dataSource.paginator = this.paginator;
		    this.dataSource.sort = this.sort;
		    this.datamodel = {}
    	    this.faqAllList(this.reqData.limit, this.reqData.offset)
		});
	}

	ngAfterViewInit() {
		this.dataSource.paginator = this.paginator
	}
	
	faqAllList(limit, offset){
		this.service.getFaqsByExamID(limit, offset,this.exam_id).subscribe(data => {
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
		})
	}

    deleteFaq(id){
		Swal.fire({
		  title: 'Are you sure want to remove?',
		  text: 'You will not be able to recover this FAQ!',
		  icon: 'warning',
		  showCancelButton: true,
		  confirmButtonText: 'Yes, delete it!',
		  cancelButtonText: 'No, keep it'
		}).then((result) => {
		  if (result.value) {
			this.service.deleteFaq(id).subscribe(data => {
				console.log(data);
				Swal.fire(
					'Deleted!',
					'This FAQ has been deleted.',
					'success'
				)
				this.ngOnInit();
      });
		  } else if (result.dismiss === Swal.DismissReason.cancel) {
			Swal.fire(
			  'Cancelled',
			  'This FAQ is safe :)',
			  'error'
			)
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
}

@Component({
	selector: 'dialog-overview-example-dialog',
	templateUrl: 'dialog-overview-example-dialog.html',
  })
  export class DialogOverviewExampleDialog {
  
	createFaq: any = {
		question : "",
		answer : ""
	  }
	constructor(private fb: FormBuilder,
	  public dialogRef: MatDialogRef<DialogOverviewExampleDialog>, private service: AdminService, private route: ActivatedRoute,
	  public dialogRefEdit : MatDialogRef<DialogOverviewExampleDialog>) {}
	
	  faqForm = new FormGroup({
		faqQuestion : new FormControl('', [Validators.required]),
		faqAnswer : new FormControl('', [Validators.required]) 
	  })
	  
	onNoClick(): void {
	  this.dialogRef.close();
	}
	
	ngOnInit(): void {
	}

	addFaq(){
		//alert(this.dialogRef.id);
		var formData = new FormData();
		
		formData.append('question', this.createFaq.question);
		formData.append('answer', this.createFaq.answer);
		formData.append('exam_id', this.dialogRef.id);
		
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


@Component({
	selector: 'edit-faq-dialog',
	templateUrl: 'edit-faq-dialog.html',
  })
  export class EditFaqDialog {
  
	createFaq: any = {
		question : "",
		answer : ""
	  }
	constructor(
	  public dialogRef: MatDialogRef<EditFaqDialog>, private service: AdminService, private route: ActivatedRoute,
	  public dialogRefEdit : MatDialogRef<EditFaqDialog>) {}

	onNoClick(): void {
	  this.dialogRefEdit.close();
	}
	
	ngOnInit(): void {
	    this.service.getFaq(this.dialogRefEdit.id).subscribe(res =>{
		console.log("Data : ",res);
		this.createFaq.question = res.data.question
		this.createFaq.answer = res.data.answer
	 })
	}

	editFaq(){
		var formData = new FormData();
		
		formData.append('question', this.createFaq.question);
		formData.append('answer', this.createFaq.answer);
		formData.append('id', this.dialogRefEdit.id);
		
		this.service.editFaqs(formData).subscribe(data => {
		  console.log("Data Successfully Updated!",data);
		  Swal.fire('Success..!', 'Successfully Updated!', 'success')
		},err => {
		  if(err.status >= 400){
			console.log('Invalid Credential!!!');
		  }else{
			console.log('Internet Connection Error');
		  }
		})
	}
}