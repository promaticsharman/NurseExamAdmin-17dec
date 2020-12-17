import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { AdminService } from 'shared/admin.service';
import Swal from 'sweetalert2';
import { HeaderServiceService } from '../shared/header-service.service';
@Component({
  selector: 'app-chapter-list',
  templateUrl: './chapter-list.component.html',
  styleUrls: ['./chapter-list.component.css']
})
export class ChapterListComponent implements OnInit {

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
  	displayedColumns : string[] = ['position', 'chapter', 'Action']
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
	
   
	constructor(private dialog: MatDialog, private route: ActivatedRoute, private service: AdminService, private headerServiceService: HeaderServiceService) { }
  
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
		this.headerServiceService.getProductFromCart('Chapter');
    	this.allChapterList(this.reqData.limit, this.reqData.offset)
  	}

  	addNewChapter(){
      //alert("this.route.snapshot.params.exam_id "+this.route.snapshot.params.exam_id)
		const dialogRef = this.dialog.open(AddChapter,{
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
    	  this.allChapterList(this.reqData.limit, this.reqData.offset)
			
		});
	}

    openEditChapter(id){
		const editdialogRef = this.dialog.open(EditChapter,{
			height: '400px',
			width: '600px',
			id: id
		});
		editdialogRef.afterClosed().subscribe(result => {
			console.log('The dialog was closed');	
			this.reqData = {}
		    this.reqData.offset = 0
		    this.reqData.limit = 10
		    this.dataSource = new MatTableDataSource(this.responseData);
		    this.dataSource.paginator = this.paginator;
		    this.dataSource.sort = this.sort;
		    this.datamodel = {}
    	  this.allChapterList(this.reqData.limit, this.reqData.offset)
		});
	}

	ngAfterViewInit() {
		this.dataSource.paginator = this.paginator
	}
	
	allChapterList(limit, offset){
		this.service.getChapterByExamId(limit, offset,this.exam_id).subscribe(data => {
			console.log(data);
			if(data){
				this.length = data.count;
				this.dataSource = new MatTableDataSource(data.data);
				this.dataSource.paginator = this.paginator;
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

  deleteChapter(id){
		Swal.fire({
		  title: 'Are you sure want to remove?',
		  text: 'You will not be able to recover this Chapter!',
		  icon: 'warning',
		  showCancelButton: true,
		  confirmButtonText: 'Yes, delete it!',
		  cancelButtonText: 'No, keep it'
		}).then((result) => {
		  if (result.value) {
			this.service.deleteChapter(id).subscribe(data => {
				console.log(data);
				Swal.fire(
					'Deleted!',
					'This Chapter has been deleted.',
					'success'
				)
				this.ngOnInit();
      });
		  } else if (result.dismiss === Swal.DismissReason.cancel) {
			Swal.fire(
			  'Cancelled',
			  'This Chapter is safe :)',
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
				this.responseData = data.data
				this.length = data.count
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

//Open Add Chapter Dialog
@Component({
	selector: 'add-chapter',
	templateUrl: 'add-chapter.html',
  })
  export class AddChapter {
  
    addChapter: any = {
      chapter : ""

	  }
	constructor(
    public dialogRef: MatDialogRef<AddChapter>, private service: AdminService, 
	private route: ActivatedRoute) {}
	
	chapterForm =  new FormGroup({
		chapterName : new FormControl('', [Validators.required])
	})

	onNoClick(): void {
	  this.dialogRef.close();
	}
	
	ngOnInit(): void {
	}

	createChapter(){
		//alert(this.dialogRef.id);
		var formData = new FormData();
		
		formData.append('chapter', this.addChapter.chapter);
		formData.append('exam_id', this.dialogRef.id);
		
		this.service.addChapter(formData).subscribe(data => {
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

//Open Edit Chapter Dialog
@Component({
	selector: 'edit-chapter',
	templateUrl: 'edit-chapter.html',
  })
  export class EditChapter {
  
  addChapter: any = {
    chapter : ""
	}
	constructor(
    public editdialogRef: MatDialogRef<EditChapter>, private service: AdminService,
    private route: ActivatedRoute, private fb: FormBuilder) {}

	onNoClick(): void {
	  this.editdialogRef.close();
	}
	
	ngOnInit(): void {
	  this.service.getChapterById(this.editdialogRef.id).subscribe(res =>{
		console.log("Data : ",res);
		this.addChapter.chapter = res.data.chapter
	 })
	}

	editChapter(){
		var formData = new FormData();
		
		formData.append('chapter', this.addChapter.chapter);
		formData.append('id', this.editdialogRef.id);
		
		this.service.updateChapter(formData).subscribe(data => {
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
