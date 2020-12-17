import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { AdminService } from 'shared/admin.service';
import Swal from 'sweetalert2';
import { Pipe, PipeTransform } from "@angular/core";
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { FormBuilder, FormControl, FormControlName, FormGroup, Validators } from '@angular/forms';
@Pipe({
  name: 'sanitizeHtml'
})
@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.css']
})
export class BookListComponent implements OnInit {

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
  displayedColumns : string[] = ['position', 'book_category_id', 'book_link', 'Action']
  dataSource:any
  element_id
	allReplacement = 54321
	data = []
	selectedUsers = []
	selection
	filter_by
  
  bookCategoryList:any = []

  bookCategory: any ={
    category:""
  }

  selected:any;

	@ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  addCategory: any = {
    category : "",
    description : ""
 } 

  constructor(private fb: FormBuilder,private _sanitizer:DomSanitizer, private dialog: MatDialog, private route: ActivatedRoute, private service: AdminService) { }

  

  ngOnInit(): void {
    this.service.getAllBookCategory().subscribe(data => {
      console.log(data);
      this.bookCategoryList = data.data
      console.log("Data Array : ", this.bookCategoryList);
    })
    this.reqData = {}
		this.reqData.offset = 0
		this.reqData.limit = 10
		this.dataSource = new MatTableDataSource(this.responseData);
		this.dataSource.paginator = this.paginator;
		this.dataSource.sort = this.sort;
		this.datamodel = {}
		
    	//this.getAllBook(this.reqData.limit, this.reqData.offset)
  }
  transform(v:string):SafeHtml {
    return this._sanitizer.bypassSecurityTrustHtml(v);
  }

  onOptionsSelected(event) {
    console.log(event)

    this.service.getBookByCategoryId(event).subscribe(data => {
      console.log(data);
      if(data){
        	this.length = data.data.count;
        	this.dataSource = data.data;
          console.log(this.dataSource);
          //this.dataSource = new MatTableDataSource(this.responseData);
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

  // getAllBook(limit, offset){
	// this.service.getBookByCategoryId().subscribe(data => {
	// 	console.log(data);
	// 	if(data){
	// 		this.length = data.data.count;
	// 		this.dataSource = data.data;
	// 		console.log(this.dataSource);
	// 	}
	// },err => {
	// 	console.log(err);
	// 	if(err.status >= 400){
	// 		  console.log('Invalid Credential!!!');
	// 	}else{
	// 		  console.log('Internet Connection Error');
	// 	}
	// })
  // }

  deleteBook(id){
	Swal.fire({
	  title: 'Are you sure want to remove?',
	  text: 'You will not be able to recover this Book!',
	  icon: 'warning',
	  showCancelButton: true,
	  confirmButtonText: 'Yes, delete it!',
	  cancelButtonText: 'No, keep it'
	}).then((result) => {
	  if (result.value) {
		this.service.delBook(id).subscribe(data => {
			console.log(data);
			Swal.fire(
				'Deleted!',
				'This Book has been deleted.',
				'success'
			)
			this.ngOnInit();
  });
	  } else if (result.dismiss === Swal.DismissReason.cancel) {
		Swal.fire(
		  'Cancelled',
		  'This Book is safe :)',
		  'error'
		)
	  }
	})
  }

  openDialog(){
		const dialogRef = this.dialog.open(AddBookDialog,{
			height: '500px',
			width: '800px',
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
			
			this.service.getBookByCategoryId(this.addCategory.category).subscribe(data => {
				console.log(data);
				if(data){
					  this.length = data.data.count;
					  this.dataSource = data.data;
					console.log(this.dataSource);
					//this.dataSource = new MatTableDataSource(this.responseData);
				  }
			  },err => {
					console.log(err);
					if(err.status >= 400){
						  console.log('Invalid Credential!!!');
					}else{
						  console.log('Internet Connection Error');
					}
				});

        //this.getAllCategory(this.reqData.limit, this.reqData.offset)
		});
  }

  openEditDialog(id){
		const dialogRefEdit = this.dialog.open(EditBookDialog,{
			height: '500px',
			width: '800px',
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
			//this.getAllCategory(this.reqData.limit, this.reqData.offset)
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
	selector: 'add-book-dialog',
	templateUrl: 'add-book.html',
  })
  export class AddBookDialog {
  
    addBook: any = {
		  bookCategory : "",
		  frame : ""
    }
  bookCategoryList:any = [];
	constructor(private fb: FormBuilder,
	  public dialogRef: MatDialogRef<AddBookDialog>, private service: AdminService, private route: ActivatedRoute,
	  ) {}

	bookForm = new FormGroup({
		category: new FormControl('', [Validators.required]),
		description: new FormControl('', [Validators.required])
	})

	onNoClick(): void {
	  this.dialogRef.close();
	}
	
	ngOnInit(): void {
    this.service.getAllBookCategory().subscribe(data => {
      console.log(data);
      this.bookCategoryList = data.data
      console.log("Data Array : ", this.bookCategoryList);
    })
	}

	createBook(){
		//alert(this.dialogRef.id);
		console.log("Book : ", this.addBook.bookCategory, " " , this.addBook.frame);
		var formData = new FormData();
		
		formData.append('book_category_id', this.addBook.bookCategory);
		formData.append('book_link', this.addBook.frame);
		
		this.service.addBook(formData).subscribe(data => {
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
	selector: 'edit-book-dialog',
	templateUrl: 'edit-book.html',
  })
  export class EditBookDialog {
  
  addBook: any = {
		bookCategory : "",
		frame : ""
  }
  bookCategoryList:any = [];
	constructor(
	  public dialogRef: MatDialogRef<EditBookDialog>, private service: AdminService, private route: ActivatedRoute,
	  ) {}

	onNoClick(): void {
	  this.dialogRef.close();
	}
	
	ngOnInit(): void {
    //console.log("dbchjbfchjebhj");
    
    this.service.getAllBookCategory().subscribe(data => {
      console.log(data);
      this.bookCategoryList = data.data
      console.log("Data Array : ", this.bookCategoryList);
    })
    console.log(this.dialogRef.id);
		this.service.getBookById(this.dialogRef.id).subscribe(res =>{
			console.log("Data : ",res);
			this.addBook.bookCategory = res.data.book_category_id._id
			this.addBook.frame = res.data.book_link
		 })
	}

	editBook(){
		var formData = new FormData();
		
		formData.append('book_category_id', this.addBook.bookCategory);
		formData.append('book_link', this.addBook.frame);
		formData.append('id', this.dialogRef.id);
		
		this.service.updateBook(formData).subscribe(data => {
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
