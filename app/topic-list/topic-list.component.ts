import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormControlName, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { AdminService } from 'shared/admin.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-topic-list',
  templateUrl: './topic-list.component.html',
  styleUrls: ['./topic-list.component.css']
})
export class TopicListComponent implements OnInit {

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
  	displayedColumns : string[] = ['position', 'topicName', 'Action']
  	dataSource:any
  	element_id
	allReplacement = 54321
	data = []
	selectedUsers = []
	selection
	filter_by
	chap_id
	examName
	chapterName
	@ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
	
   
	constructor(private dialog: MatDialog, private route: ActivatedRoute, private service: AdminService) { }
  
  	ngOnInit(): void {
		this.chap_id = this.route.snapshot.params.chapter_id
		this.chapterName = this.route.snapshot.params.chapter_name
		this.examName = this.route.snapshot.params.exam_name
		this.reqData = {}
		this.reqData.offset = 0
		this.reqData.limit = 10
		this.dataSource = new MatTableDataSource(this.responseData);
		this.dataSource.paginator = this.paginator;
		this.dataSource.sort = this.sort;
		this.datamodel = {}
    	this.allTopicList(this.reqData.limit, this.reqData.offset)
  }

  	addNewTopic(){
      //alert("this.route.snapshot.params.exam_id "+this.route.snapshot.params.exam_id)
		const dialogRef = <any> this.dialog.open(AddTopic,{
			height: '400px',
      width: '600px',
      id:<any> {
        chapter_id: this.route.snapshot.params.chapter_id,
        exam_id: this.route.snapshot.params.exam_id
      }
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
    	  this.allTopicList(this.reqData.limit, this.reqData.offset)
			
		});
	}

    openEditTopic(id){
		const editdialogRef = this.dialog.open(EditTopic,{
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
    	  	this.allTopicList(this.reqData.limit, this.reqData.offset)
		});
	}

	ngAfterViewInit() {
		this.dataSource.paginator = this.paginator
	}
	
	allTopicList(limit, offset){
		this.service.getTopicsByChapterID(limit, offset, this.chap_id).subscribe(data => {
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

  deleteTopic(id){
		Swal.fire({
		  title: 'Are you sure want to remove?',
		  text: 'You will not be able to recover this Topic!',
		  icon: 'warning',
		  showCancelButton: true,
		  confirmButtonText: 'Yes, delete it!',
		  cancelButtonText: 'No, keep it'
		}).then((result) => {
		  if (result.value) {
			this.service.deleteTopic(id).subscribe(data => {
				console.log(data);
				Swal.fire(
					'Deleted!',
					'This Topic has been deleted.',
					'success'
				)
				this.ngOnInit();
      });
		  } else if (result.dismiss === Swal.DismissReason.cancel) {
			Swal.fire(
			  'Cancelled',
			  'This Topic is safe :)',
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

//Open Add Topics Dialog
@Component({
	selector: 'add-topic',
	templateUrl: 'add-topic.html',
  })
  export class AddTopic {
  
    addTopic: any = {
      topic : ""
	  }
	constructor(private fb: FormBuilder,
    public dialogRef: MatDialogRef<AddTopic>, private service: AdminService, 
	private route: ActivatedRoute) {}
	
	topicForm = new FormGroup({
		topicName : new FormControl('', [Validators.required])
	})

	onNoClick(): void {
	  this.dialogRef.close();
	}
	
	ngOnInit(): void {
	}

	createTopics(){
  //alert(this.dialogRef.id);
  // console.log(this.dialogRef.id.chapter_id)
  var ids = this.dialogRef.id;
  //alert(this.dialogRef['data'])
  console.log(ids['exam_id'] + "     " + ids['chapter_id']);
	var formData = new FormData();
		
		formData.append('topicName', this.addTopic.topic);
    formData.append('chapter_id', ids['chapter_id']);
    formData.append('exam_id', ids['exam_id']);
		
		this.service.addTopics(formData).subscribe(data => {
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

//Open Edit Topics Dialog
@Component({
	selector: 'edit-topic',
	templateUrl: 'edit-topic.html',
  })
  export class EditTopic {
  
    addTopic: any = {
      topic : ""
	  }
	constructor(
    public editdialogRef: MatDialogRef<EditTopic>, private service: AdminService,
    private route: ActivatedRoute) {}

	onNoClick(): void {
	  this.editdialogRef.close();
	}
	
	ngOnInit(): void {
	  this.service.getTopicById(this.editdialogRef.id).subscribe(res =>{
		console.log("Data : ",res);
		this.addTopic.topic = res.data.topicName
	 })
	}

	editTopic(){
    //alert(this.editdialogRef.id)
		var formData = new FormData();
		
		formData.append('topicName', this.addTopic.topic);
		formData.append('id', this.editdialogRef.id);
		
		this.service.updateTopic(formData).subscribe(data => {
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
