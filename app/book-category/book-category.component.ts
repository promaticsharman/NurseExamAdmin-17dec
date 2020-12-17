import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { AdminService } from 'shared/admin.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-book-category',
  templateUrl: './book-category.component.html',
  styleUrls: ['./book-category.component.css']
})
export class BookCategoryComponent implements OnInit {

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
  displayedColumns : string[] = ['position', 'category', 'description', 'Action']
  dataSource:any
  element_id
	allReplacement = 54321
	data = []
	selectedUsers = []
	selection
	filter_by
	
	@ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  addCategory: any = {
    category : "",
    description : ""
 } 

  constructor(private dialog: MatDialog, private route: ActivatedRoute, private service: AdminService) { }

  ngOnInit(): void {
    this.reqData = {}
		this.reqData.offset = 0
		this.reqData.limit = 10
		this.dataSource = new MatTableDataSource(this.responseData);
		this.dataSource.paginator = this.paginator;
		this.dataSource.sort = this.sort;
		this.datamodel = {}
    	this.getAllCategory(this.reqData.limit, this.reqData.offset)
  }

  getAllCategory(limit, offset){
	this.service.getBookCategory(limit, offset).subscribe(data => {
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

  deleteCategory(id){
	Swal.fire({
	  title: 'Are you sure want to remove?',
	  text: 'You will not be able to recover this Book Category!',
	  icon: 'warning',
	  showCancelButton: true,
	  confirmButtonText: 'Yes, delete it!',
	  cancelButtonText: 'No, keep it'
	}).then((result) => {
	  if (result.value) {
		this.service.deleteBookCategory(id).subscribe(data => {
			console.log(data);
			Swal.fire(
				'Deleted!',
				'This Book Category has been deleted.',
				'success'
			)
			this.ngOnInit();
  });
	  } else if (result.dismiss === Swal.DismissReason.cancel) {
		Swal.fire(
		  'Cancelled',
		  'This Book Category is safe :)',
		  'error'
		)
	  }
	})
  }

  openDialog(){
		const dialogRef = this.dialog.open(AddCategoryDialog,{
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
    	    //this.getAllCategory(this.reqData.limit, this.reqData.offset)
			
		});
  }

  openEditDialog(id){
		const dialogRefEdit = this.dialog.open(EditCategoryDialog,{
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
			this.getAllCategory(this.reqData.limit, this.reqData.offset)
		});
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

//Add Category Dialog Box
@Component({
	selector: 'add-category-dialog',
	templateUrl: 'add-category.html',
  })
  export class AddCategoryDialog {
  
    addCategory: any = {
		  category : "",
		  description : ""
	  }
	constructor(private fb: FormBuilder,
	  public dialogRef: MatDialogRef<AddCategoryDialog>, private service: AdminService, private route: ActivatedRoute,
	  ) {}

	  bookCategoryForm = new FormGroup({
		bookCategory : new FormControl('', [Validators.required]),
		categoryDescription: new FormControl('', [Validators.required])
	  })

	onNoClick(): void {
	  this.dialogRef.close();
	}
	
	ngOnInit(): void {
	}

	createCategory(){
		//alert(this.dialogRef.id);
		console.log("Category : ", this.addCategory.category, " " , this.addCategory.description);
		var formData = new FormData();
		
		formData.append('category', this.addCategory.category);
		formData.append('description', this.addCategory.description);
		
		this.service.addBookCategory(formData).subscribe(data => {
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

//Edit Category Dialog
@Component({
	selector: 'edit-category-dialog',
	templateUrl: 'edit-category.html',
  })
  export class EditCategoryDialog {
  
    addCategory: any = {
		  category : "",
		  description : ""
	  }
	constructor(
	  public dialogRef: MatDialogRef<EditCategoryDialog>, private service: AdminService, private route: ActivatedRoute,
	  ) {}

	onNoClick(): void {
	  this.dialogRef.close();
	}
	
	ngOnInit(): void {
		this.service.getBookcategoryById(this.dialogRef.id).subscribe(res =>{
			console.log("Data : ",res);
			this.addCategory.category = res.data.category
			this.addCategory.description = res.data.description
		 })
	}

	editCategory(){
		var formData = new FormData();
		
		formData.append('category', this.addCategory.category);
		formData.append('description', this.addCategory.description);
		formData.append('id', this.dialogRef.id);
		
		this.service.editBookCategory(formData).subscribe(data => {
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